-- Thêm thay đổi trong kho
INSERT INTO inventory (id, product_id, quantity, change_type, change_date)
VALUES ('12345678', 1, 20, 'RESTOCK', CURRENT_TIMESTAMP);

-- Cập nhật số lượng trong kho
UPDATE inventory
SET quantity = 30
WHERE id = '12345678' 
  AND quantity >= 0; -- Đảm bảo ràng buộc CHECK

-- Xóa bản ghi thay đổi trong kho
DELETE FROM inventory
WHERE id = '12345678';

-- Lấy lịch sử thay đổi kho cho sản phẩm
SELECT i.id, i.quantity, i.change_type, i.change_date,
       p.name AS product_name
FROM inventory i
JOIN products p ON i.product_id = p.id
WHERE i.product_id = 1
ORDER BY i.change_date DESC;

-- Tổng số sản phẩm trong kho theo danh mục
SELECT c.name AS category_name, 
       SUM(p.stock) AS current_stock,
       SUM(COALESCE(i.quantity, 0)) AS total_changes
FROM categories c
JOIN products p ON c.id = p.category_id
LEFT JOIN inventory i ON p.id = i.product_id
GROUP BY c.name
ORDER BY current_stock DESC;

-- Danh sách sản phẩm sắp hết hàng
SELECT p.id AS product_id, p.name AS product_name, 
       p.stock, c.name AS category_name
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.stock < 10
ORDER BY p.stock ASC;

-- Lịch sử thay đổi kho trong khoảng thời gian
SELECT p.name AS product_name, i.quantity, 
       i.change_type::text, i.change_date
FROM inventory i
JOIN products p ON i.product_id = p.id
WHERE i.change_date BETWEEN '2024-01-01' AND '2024-12-31'
ORDER BY p.name, i.change_date;

-- Tổng số lượng thay đổi của từng sản phẩm
SELECT p.id AS product_id, p.name AS product_name, 
       COALESCE(SUM(CASE WHEN i.change_type = 'RESTOCK' THEN i.quantity
                         WHEN i.change_type = 'SALE' THEN -i.quantity
                         ELSE 0 END), 0) AS net_quantity_change
FROM products p
LEFT JOIN inventory i ON p.id = i.product_id
GROUP BY p.id, p.name
ORDER BY net_quantity_change DESC;

-- Sản phẩm có lượng tồn kho thực tế thấp
SELECT p.id AS product_id, p.name AS product_name, 
       p.stock AS current_stock,
       COALESCE(SUM(CASE WHEN i.change_type = 'RESTOCK' THEN i.quantity
                         WHEN i.change_type = 'SALE' THEN -i.quantity
                         ELSE 0 END), 0) AS net_changes,
       p.stock + COALESCE(SUM(CASE WHEN i.change_type = 'RESTOCK' THEN i.quantity
                                   WHEN i.change_type = 'SALE' THEN -i.quantity
                                   ELSE 0 END), 0) AS actual_stock
FROM products p
LEFT JOIN inventory i ON p.id = i.product_id
GROUP BY p.id, p.name, p.stock
HAVING p.stock + COALESCE(SUM(CASE WHEN i.change_type = 'RESTOCK' THEN i.quantity
                                   WHEN i.change_type = 'SALE' THEN -i.quantity
                                   ELSE 0 END), 0) < 10
ORDER BY actual_stock ASC;

-- Function tính tổng tồn kho
CREATE OR REPLACE FUNCTION calculate_total_inventory(product_id INTEGER)
RETURNS INTEGER AS $$
    SELECT COALESCE(SUM(CASE WHEN change_type = 'RESTOCK' THEN quantity
                            WHEN change_type = 'SALE' THEN -quantity
                            ELSE 0 END), 0)::INTEGER
    FROM inventory
    WHERE product_id = $1;
$$ LANGUAGE sql;

-- Trigger function cập nhật stock
CREATE OR REPLACE FUNCTION update_product_stock()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE products
    SET stock = stock + 
        CASE 
            WHEN TG_OP = 'DELETE' THEN 
                (CASE WHEN OLD.change_type = 'RESTOCK' THEN -OLD.quantity
                      WHEN OLD.change_type = 'SALE' THEN OLD.quantity END)
            WHEN TG_OP = 'UPDATE' THEN
                (CASE WHEN NEW.change_type = 'RESTOCK' THEN NEW.quantity
                      WHEN NEW.change_type = 'SALE' THEN -NEW.quantity END) -
                (CASE WHEN OLD.change_type = 'RESTOCK' THEN OLD.quantity
                      WHEN OLD.change_type = 'SALE' THEN -OLD.quantity END)
            ELSE 
                (CASE WHEN NEW.change_type = 'RESTOCK' THEN NEW.quantity
                      WHEN NEW.change_type = 'SALE' THEN -NEW.quantity END)
        END
    WHERE id = CASE 
        WHEN TG_OP = 'DELETE' THEN OLD.product_id
        ELSE NEW.product_id
    END;
    
    RETURN CASE 
        WHEN TG_OP = 'DELETE' THEN OLD
        ELSE NEW
    END;
END;
$$ LANGUAGE plpgsql;

-- Tạo triggers
CREATE TRIGGER after_inventory_change
AFTER INSERT OR UPDATE OR DELETE ON inventory
FOR EACH ROW EXECUTE FUNCTION update_product_stock();

-- Function tính stock cuối cùng
CREATE OR REPLACE FUNCTION calculate_final_stock(product_id INTEGER)
RETURNS INTEGER AS $$
    SELECT p.stock + COALESCE(
        SUM(CASE WHEN i.change_type = 'RESTOCK' THEN i.quantity
                 WHEN i.change_type = 'SALE' THEN -i.quantity
                 ELSE 0 END), 0)::INTEGER
    FROM products p
    LEFT JOIN inventory i ON p.id = i.product_id
    WHERE p.id = $1
    GROUP BY p.stock;
$$ LANGUAGE sql;

-- Function kiểm tra stock dưới ngưỡng
CREATE OR REPLACE FUNCTION is_stock_below_threshold(
    product_id INTEGER, 
    threshold INTEGER
) RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM products 
        WHERE id = product_id 
        AND stock < threshold
    );
END;
$$ LANGUAGE plpgsql;

-- Function tính tổng theo loại thay đổi
CREATE OR REPLACE FUNCTION calculate_total_by_change_type(
    product_id INTEGER, 
    change_type_param public.inventory_change_type
) RETURNS INTEGER AS $$
    SELECT COALESCE(SUM(quantity), 0)::INTEGER
    FROM inventory
    WHERE product_id = $1 
    AND change_type = change_type_param;
$$ LANGUAGE sql;