--thêm 1 danh mục mới
INSERT INTO categories (name, parent_category_id)
VALUES ('Tên danh mục mới', NULL); -- Đặt `parent_category_id` thành NULL nếu không có danh mục cha

--cập nhật tên danh mục
UPDATE categories
SET name = 'Tên danh mục cập nhật'
WHERE id = 1; -- Thay 1 bằng ID của danh mục cần cập nhật

--xóa danh mục
DELETE FROM categories
WHERE id = 1; -- Thay 1 bằng ID của danh mục cần xoá

--lấy danh sách các danh mục
SELECT c1.id, c1.name, c2.name AS parent_name
FROM categories c1
LEFT JOIN categories c2 ON c1.parent_category_id = c2.id;
