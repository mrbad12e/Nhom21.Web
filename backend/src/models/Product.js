const db = require('../config/database');

class Product {
    static async get(req) {
        try {
            if (req.query.id) {
                const result = await db.query('select * from get_product_details($1)', [req.query.id]);
                return result;
            }            

            const result = await db.query('select * from get_products($1, $2, $3, $4, $5, $6, $7, $8, $9)', [
                req.query.search || null,
                req.query.categoryId || null,
                req.query.minPrice || null,
                req.query.maxPrice || null,
                req.query.includeInactive || false,
                req.query.page || 1,
                req.query.pageSize || 10,
                req.query.sortBy || 'id',
                req.query.sortOrder || 'asc',
            ]);
            return {
                products: result,
                pagination: {
                    page: parseInt(req.query.page) || 1,
                    pageSize: parseInt(req.query.pageSize) || 10,
                    total: result[0]?.total_count || 0,
                    totalPages: Math.ceil((result[0]?.total_count || 0) / (req.query.pageSize || 10)),
                },
            };
        } catch (err) {
            throw new Error(err.message);
        }
    }

    static async addNewProduct(req) {
        try {
            const { name, description, price, stock, categoryId, imageUrls = null } = req.body;

            if (!name || !description || price == null || stock == null || !categoryId) {
                throw new Error('Missing required fields');
            }

            const result = await db.query('select * from create_product($1, $2, $3, $4, $5, $6)', [
                name,
                description,
                price,
                stock,
                categoryId,
                imageUrls,
            ]);

            if (!result || !result[0]) {
                throw new Error('Failed to create product');
            }

            return {
                id: result[0].id,
                name: result[0].name,
                price: result[0].price,
            };
        } catch (err) {
            throw new Error(err.message);
        }
    }

}

module.exports = Product;