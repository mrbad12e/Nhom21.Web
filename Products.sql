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
SELECT * FROM products
WHERE category_id = 1; -- Thay 1 bằng ID của danh mục

