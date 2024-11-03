-- Thêm 1 danh mục mới
INSERT INTO categories (name, parent_category_id)
VALUES ('Tên danh mục mới', NULL); -- Đặt `parent_category_id` thành NULL nếu không có danh mục cha

-- Cập nhật tên danh mục
UPDATE categories
SET name = 'Tên danh mục cập nhật'
WHERE id = 1; -- Thay 1 bằng ID của danh mục cần cập nhật

-- Xóa danh mục
DELETE FROM categories
WHERE id = 1; -- Thay 1 bằng ID của danh mục cần xoá

-- Lấy danh sách các danh mục
SELECT c1.id, c1.name, c2.name AS parent_name
FROM categories c1
LEFT JOIN categories c2 ON c1.parent_category_id = c2.id;

-- Tổng doanh thu theo danh mục
SELECT c.name AS category_name, SUM(oi.quantity * p.price) AS total_revenue
FROM order_items oi
JOIN products p ON oi.product_id = p.id
JOIN categories c ON p.category_id = c.id
GROUP BY c.name
ORDER BY total_revenue DESC;

-- Đếm số sản phẩm trong từng danh mục
SELECT c.name AS category_name, COUNT(p.id) AS product_count
FROM categories c
LEFT JOIN products p ON c.id = p.category_id
GROUP BY c.name
ORDER BY product_count DESC;

-- Tìm danh mục không có sản phẩm
SELECT c.id, c.name
FROM categories c
LEFT JOIN products p ON c.id = p.category_id
WHERE p.id IS NULL;

-- Lấy cây phân cấp danh mục
WITH RECURSIVE category_tree AS (
    SELECT id, name, parent_category_id, 1 AS level
    FROM categories
    WHERE parent_category_id IS NULL
    UNION ALL
    SELECT c.id, c.name, c.parent_category_id, ct.level + 1
    FROM categories c
    JOIN category_tree ct ON c.parent_category_id = ct.id
)
SELECT * 
FROM category_tree
ORDER BY level, name;

-- Danh sách danh mục kèm tổng số lượng thay đổi kho cho các sản phẩm trong danh mục
SELECT c.name AS category_name, SUM(i.quantity) AS total_inventory_changes
FROM categories c
JOIN products p ON c.id = p.category_id
JOIN inventory i ON p.id = i.product_id
GROUP BY c.name
ORDER BY total_inventory_changes DESC;
