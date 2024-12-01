-- Thêm danh mục mới
INSERT INTO categories (id, name, parent_category_id)
VALUES (1, 'Tên danh mục mới', NULL);

-- Cập nhật tên danh mục
UPDATE categories
SET name = 'Tên danh mục cập nhật'
WHERE id = 1;

-- Xóa danh mục (cần kiểm tra ràng buộc khóa ngoại)
DELETE FROM categories
WHERE id = 1 AND NOT EXISTS (
    SELECT 1 FROM products WHERE category_id = 1
) AND NOT EXISTS (
    SELECT 1 FROM categories WHERE parent_category_id = 1
);

-- Lấy danh sách các danh mục
SELECT c1.id, c1.name, c2.name AS parent_name
FROM categories c1
LEFT JOIN categories c2 ON c1.parent_category_id = c2.id;

-- Tổng doanh thu theo danh mục
SELECT c.name AS category_name, 
       SUM(oi.quantity * oi.price) AS total_revenue
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
    -- Base case: danh mục gốc (không có parent)
    SELECT id, name, parent_category_id, 1 AS level,
           name::text AS path
    FROM categories
    WHERE parent_category_id IS NULL
    
    UNION ALL
    
    -- Recursive case: tìm các danh mục con
    SELECT c.id, c.name, c.parent_category_id, ct.level + 1,
           ct.path || ' > ' || c.name::text
    FROM categories c
    JOIN category_tree ct ON c.parent_category_id = ct.id
)
SELECT id, name, level, path
FROM category_tree
ORDER BY path;

-- Danh sách danh mục kèm tổng số lượng thay đổi kho
SELECT c.name AS category_name, 
       COALESCE(SUM(i.quantity), 0) AS total_inventory_changes
FROM categories c
LEFT JOIN products p ON c.id = p.category_id
LEFT JOIN inventory i ON p.id = i.product_id
GROUP BY c.name
ORDER BY total_inventory_changes DESC;

-- Function tạo slug cho tên danh mục
CREATE OR REPLACE FUNCTION create_category_slug(category_name VARCHAR)
RETURNS VARCHAR AS $$
BEGIN
    RETURN LOWER(REGEXP_REPLACE(category_name, '[^a-zA-Z0-9]+', '-', 'g'));
END;
$$ LANGUAGE plpgsql;

-- Function lấy đường dẫn đầy đủ của danh mục
CREATE OR REPLACE FUNCTION get_full_category_path(category_id INTEGER)
RETURNS TEXT AS $$
WITH RECURSIVE category_path AS (
    SELECT id, name, parent_category_id, name::text AS path
    FROM categories
    WHERE id = category_id
    
    UNION ALL
    
    SELECT c.id, c.name, c.parent_category_id,
           c.name || ' > ' || cp.path
    FROM categories c
    JOIN category_path cp ON c.id = cp.parent_category_id
)
SELECT path
FROM category_path
WHERE parent_category_id IS NULL
LIMIT 1;
$$ LANGUAGE sql;

-- Function đếm số lượng danh mục con
CREATE OR REPLACE FUNCTION count_subcategories(parent_category_id INTEGER)
RETURNS INTEGER AS $$
    SELECT COUNT(*)::INTEGER
    FROM categories
    WHERE parent_category_id = $1;
$$ LANGUAGE sql;

-- Function kiểm tra xem một danh mục có thể xóa được không
CREATE OR REPLACE FUNCTION can_delete_category(category_id INTEGER)
RETURNS BOOLEAN AS $$
BEGIN
    -- Kiểm tra có sản phẩm không
    IF EXISTS (SELECT 1 FROM products WHERE category_id = $1) THEN
        RETURN FALSE;
    END IF;
    
    -- Kiểm tra có danh mục con không
    IF EXISTS (SELECT 1 FROM categories WHERE parent_category_id = $1) THEN
        RETURN FALSE;
    END IF;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;