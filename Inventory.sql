--thêm 1 thay đổi trong kho
INSERT INTO inventory (product_id, quantity, change_type, change_date)
VALUES (1, 20, 'nhập', CURRENT_TIMESTAMP); -- Thay các giá trị phù hợp

--cập nhật số lượng
UPDATE inventory
SET quantity = 30
WHERE id = 1; -- Thay 1 bằng ID của thay đổi trong kho cần cập nhật

--xóa 1 bản ghi
DELETE FROM inventory
WHERE id = 1; -- Thay 1 bằng ID của bản ghi cần xoá

--lấy lịch sử thay đổi kho cho sản phẩm
SELECT * FROM inventory
WHERE product_id = 1; -- Thay 1 bằng ID của sản phẩm

--tổng số sản phẩm trong kho theo danh mục
SELECT c.name AS category_name, SUM(i.quantity) AS total_quantity
FROM products p
JOIN inventory i ON p.id = i.product_id
JOIN categories c ON p.category_id = c.id
GROUP BY c.name
ORDER BY total_quantity DESC;

--danh sách sản phẩm sắp hết hàng (dưới 10 sản phẩm)
SELECT p.id AS product_id, p.name AS product_name, p.stock, c.name AS category_name
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.stock < 10
ORDER BY p.stock ASC;

-- lịch sử thay đổi
SELECT p.name AS product_name, i.quantity, i.change_type, i.change_date
FROM inventory i
JOIN products p ON i.product_id = p.id
WHERE i.change_date BETWEEN '2024-01-01' AND '2024-12-31'
ORDER BY p.name, i.change_date;
