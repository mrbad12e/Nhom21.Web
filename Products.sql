-- Thêm 1 sản phẩm mới
INSERT INTO products (name, description, price, stock, category_id, store_id, created_at)
VALUES ('Tên sản phẩm', 'Mô tả sản phẩm', 100000, 50, 1, 1, CURRENT_TIMESTAMP);

-- Cập nhật thông tin sản phẩm
UPDATE products
SET name = 'Tên sản phẩm mới', price = 120000
WHERE id = 1; -- Thay 1 bằng ID của sản phẩm cần cập nhật

-- Xóa một sản phẩm
DELETE FROM products
WHERE id = 1; -- Thay 1 bằng ID của sản phẩm cần xoá

-- Lấy danh sách sản phẩm theo danh mục
SELECT p.id AS product_id, p.name AS product_name, p.price, 
       c1.name AS category_name, c2.name AS parent_category_name
FROM products p
JOIN categories c1 ON p.category_id = c1.id
LEFT JOIN categories c2 ON c1.parent_category_id = c2.id;

-- Danh sách sản phẩm cùng số lượng tồn kho cập nhật và tổng tồn kho
SELECT p.id AS product_id, p.name AS product_name, p.stock AS current_stock,
       COALESCE(SUM(i.quantity), 0) AS total_inventory_changes
FROM products p
LEFT JOIN inventory i ON p.id = i.product_id
GROUP BY p.id, p.name, p.stock
ORDER BY p.name;

-- Danh sách sản phẩm có doanh thu cao nhất
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

-- Danh sách sản phẩm chưa bao giờ được bán
SELECT p.id AS product_id, p.name AS product_name
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
WHERE oi.product_id IS NULL;

-- Top 3 sản phẩm có sự biến động tồn kho lớn nhất
SELECT p.id AS product_id, p.name AS product_name, 
       SUM(ABS(i.quantity)) AS total_inventory_changes
FROM products p
JOIN inventory i ON p.id = i.product_id
GROUP BY p.id, p.name
ORDER BY total_inventory_changes DESC
LIMIT 3;

-- Tính số lượng tồn kho thực tế sau khi áp dụng các thay đổi từ bảng inventory
SELECT p.id AS product_id, p.name AS product_name, 
       p.stock AS initial_stock,
       COALESCE(SUM(i.quantity), 0) AS total_inventory_changes,
       (p.stock + COALESCE(SUM(i.quantity), 0)) AS final_stock
FROM products p
LEFT JOIN inventory i ON p.id = i.product_id
GROUP BY p.id, p.name, p.stock
ORDER BY final_stock DESC;

-- Danh sách các sản phẩm đã được thêm vào giỏ hàng nhưng chưa được mua
SELECT DISTINCT p.id AS product_id, p.name AS product_name
FROM products p
JOIN cart_items ci ON p.id = ci.product_id
LEFT JOIN order_items oi ON p.id = oi.product_id
WHERE oi.product_id IS NULL;

-- Tính tổng doanh thu theo từng cửa hàng cho từng sản phẩm
SELECT p.id AS product_id, p.name AS product_name, 
       p.store_id, s.name AS store_name,
       SUM(oi.quantity * p.price) AS total_revenue
FROM products p
JOIN order_items oi ON p.id = oi.product_id
JOIN stores s ON p.store_id = s.id
GROUP BY p.id, p.store_id, s.name
ORDER BY total_revenue DESC;
