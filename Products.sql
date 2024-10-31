--thêm 1 sản phẩm mới
INSERT INTO products (name, description, price, stock, category_id, store_id, created_at)
VALUES ('Tên sản phẩm', 'Mô tả sản phẩm', 100000, 50, 1, 1, CURRENT_TIMESTAMP);

--cập nhật thông tin sản phẩm
UPDATE products
SET name = 'Tên sản phẩm mới', price = 120000
WHERE id = 1; -- Thay 1 bằng ID của sản phẩm cần cập nhật

--xóa một sản phẩm
DELETE FROM products
WHERE id = 1; -- Thay 1 bằng ID của sản phẩm cần xoá

--lấy danh sách sản phẩm theo danh mục
SELECT p.id AS product_id, p.name AS product_name, p.price, 
       c1.name AS category_name, c2.name AS parent_category_name
FROM products p
JOIN categories c1 ON p.category_id = c1.id
LEFT JOIN categories c2 ON c1.parent_category_id = c2.id;

-- danh sách sản phẩm cùng số lượng tồn kho cập nhật và tổng tồn kho
SELECT p.id AS product_id, p.name AS product_name, p.stock AS current_stock,
       COALESCE(SUM(i.quantity), 0) AS total_inventory_changes
FROM products p
LEFT JOIN inventory i ON p.id = i.product_id
GROUP BY p.id, p.name, p.stock
ORDER BY p.name;

-- danh sách sản phẩm có doanh thu cao nhất
SELECT c.name AS category_name, p.name AS product_name, 
       SUM(oi.quantity * p.price) AS total_revenue
FROM order_items oi
JOIN products p ON oi.product_id = p.id
JOIN categories c ON p.category_id = c.id
GROUP BY c.name, p.name
HAVING SUM(oi.quantity * p.price) = (
    SELECT MAX(SUM(oi2.quantity * p2.price))
    FROM order_items oi2
    JOIN products p2 ON oi2.product_id = p2.id
    WHERE p2.category_id = c.id
    GROUP BY p2.id
)
ORDER BY category_name;


