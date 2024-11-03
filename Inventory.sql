-- Thêm 1 thay đổi trong kho
INSERT INTO inventory (product_id, quantity, change_type, change_date)
VALUES (1, 20, 'nhập', CURRENT_TIMESTAMP); -- Thay các giá trị phù hợp

-- Cập nhật số lượng trong kho
UPDATE inventory
SET quantity = 30
WHERE id = 1; -- Thay 1 bằng ID của thay đổi trong kho cần cập nhật

-- Xóa 1 bản ghi thay đổi trong kho
DELETE FROM inventory
WHERE id = 1; -- Thay 1 bằng ID của bản ghi cần xoá

-- Lấy lịch sử thay đổi kho cho sản phẩm
SELECT * 
FROM inventory
WHERE product_id = 1; -- Thay 1 bằng ID của sản phẩm

-- Tổng số sản phẩm trong kho theo danh mục
SELECT c.name AS category_name, SUM(i.quantity) AS total_quantity
FROM products p
JOIN inventory i ON p.id = i.product_id
JOIN categories c ON p.category_id = c.id
GROUP BY c.name
ORDER BY total_quantity DESC;

-- Danh sách sản phẩm sắp hết hàng (dưới 10 sản phẩm)
SELECT p.id AS product_id, p.name AS product_name, p.stock, c.name AS category_name
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.stock < 10
ORDER BY p.stock ASC;

-- Lịch sử thay đổi kho cho sản phẩm trong khoảng thời gian nhất định
SELECT p.name AS product_name, i.quantity, i.change_type, i.change_date
FROM inventory i
JOIN products p ON i.product_id = p.id
WHERE i.change_date BETWEEN '2024-01-01' AND '2024-12-31'
ORDER BY p.name, i.change_date;

-- Tính tổng số lượng thay đổi của từng sản phẩm trong kho
SELECT p.id AS product_id, p.name AS product_name, 
       COALESCE(SUM(i.quantity), 0) AS total_quantity_changes
FROM products p
LEFT JOIN inventory i ON p.id = i.product_id
GROUP BY p.id, p.name
ORDER BY total_quantity_changes DESC;

-- Tìm sản phẩm có lượng tồn kho thực tế (sau thay đổi) thấp nhất
SELECT p.id AS product_id, p.name AS product_name, 
       p.stock AS initial_stock,
       COALESCE(SUM(i.quantity), 0) AS total_inventory_changes,
       (p.stock + COALESCE(SUM(i.quantity), 0)) AS final_stock
FROM products p
LEFT JOIN inventory i ON p.id = i.product_id
GROUP BY p.id, p.name, p.stock
HAVING final_stock < 10
ORDER BY final_stock ASC;
