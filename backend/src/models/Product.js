const db = require('../config/database');

class Product {
    static validate(product) {
        return !!(
            product.name &&
            product.description &&
            parseFloat(product.price) >= 0 &&
            parseInt(product.stock) >= 0 &&
            product.categoryId
        );
    }

    isInStock() {
        return this.stock > 0 && this.isActive;
    }

    static async getById(id) {
        try {
            const result = db.query('SELECT * FROM get_product_details($1)', [id]);
            return result.rows; //the return from query is result= {rows:{data}}
        } catch (error) {
            throw error;
        }
    }

    static async get({
        search = null,
        categoryId = null,
        minPrice = null,
        maxPrice = null,
        includeInactive = false,
        page = 1,
        pageSize = 10,
        sortBy = 'id',
        sortOrder = 'asc',
    } = {}) {
        try {
            const result = await db.query('SELECT * FROM get_products($1, $2, $3, $4, $5, $6, $7, $8, $9)', [
                search,
                categoryId,
                minPrice,
                maxPrice,
                includeInactive,
                page,
                pageSize,
                sortBy,
                sortOrder,
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
            console.error('Fetch products error:', err);
            throw err;
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

    static async updateProduct(data) {
        try {
            const id = data.id;
            const { name, description, price, stock, categoryId } = data.body;

            if (!id) {
                throw new Error('Product ID is required');
            }

            const result = await db.query('select * from update_product($1, $2, $3, $4, $5, $6)', [
                id,
                name || null,
                description || null,
                price || null,
                stock || null,
                categoryId || null,
            ]);

            if (!result || !result[0]) {
                throw new Error('Failed to update product');
            }

            return {
                id: result[0].product_id,
                name: result[0].product_name,
                price: result[0].product_price,
            };
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports = Product;
