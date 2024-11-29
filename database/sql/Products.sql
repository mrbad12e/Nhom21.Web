-- Lấy danh sách sản phẩm
CREATE OR REPLACE FUNCTION get_all_products()
RETURNS TABLE (
    product_id INT,
    product_name VARCHAR,
    price DECIMAL(10,2),
    category_name VARCHAR,
    parent_category_name VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.name,
        p.price,
        c1.name,
        c2.name
    FROM products p
    JOIN categories c1 ON p.category_id = c1.id
    LEFT JOIN categories c2 ON c1.parent_category_id = c2.id;
END;
$$ LANGUAGE plpgsql;

-- Thêm sản phẩm mới
INSERT INTO products (name, description, price, stock, category_id, image_urls)
VALUES (
    'Tên sản phẩm',         
    'Mô tả sản phẩm',       
    100000,                  
    50,                       
    1,                       
    ARRAY['url1', 'url2']     
)
RETURNING id, name, price;    

-- Cập nhật thông tin sản phẩm
UPDATE products
SET 
    name = 'Tên sản phẩm mới',
    price = 120000
WHERE id = 1 
RETURNING id, name, price;  

-- Xóa sản phẩm
DO $$ 
BEGIN
    -- Kiểm tra xem sản phẩm có trong order_items không
    IF EXISTS (SELECT 1 FROM order_items WHERE product_id = 1) THEN
        RAISE EXCEPTION 'Không thể xóa sản phẩm đã có trong đơn hàng';
    END IF;
    
    -- Kiểm tra xem sản phẩm có trong cart_items không
    IF EXISTS (SELECT 1 FROM cart_items WHERE product_id = 1) THEN
        RAISE EXCEPTION 'Không thể xóa sản phẩm đang có trong giỏ hàng';
    END IF;
    
    -- Nếu không có ràng buộc, thực hiện xóa
    DELETE FROM products 
    WHERE id = 1 
    RETURNING id, name;    -- trả về thông tin sản phẩm đã xóa
END $$;

-- Thêm nhiều sản phẩm cùng lúc
INSERT INTO products (name, description, price, stock, category_id)
VALUES 
    ('Sản phẩm 1', 'Mô tả 1', 100000, 10, 1),
    ('Sản phẩm 2', 'Mô tả 2', 200000, 20, 1),
    ('Sản phẩm 3', 'Mô tả 3', 300000, 30, 2)
RETURNING id, name, price;

-- Cập nhật giá nhiều sản phẩm
UPDATE products
SET 
    price = price * 1.1,  -- tăng giá 10%
    updated_at = CURRENT_TIMESTAMP
WHERE category_id = 1     -- cập nhật theo danh mục
RETURNING id, name, price;


-- Lấy danh sách sản phẩm theo danh mục
CREATE OR REPLACE FUNCTION GetProductsByCategory(categoryId INTEGER)
RETURNS TABLE (
    product_id INTEGER,
    product_name VARCHAR(255),
    price DECIMAL(10,2),
    category_name VARCHAR(255),
    parent_category_name VARCHAR(255)
) AS $$
BEGIN
    RETURN QUERY
    SELECT p.id AS product_id, p.name AS product_name, p.price, 
           c1.name AS category_name, c2.name AS parent_category_name
    FROM products p
    JOIN categories c1 ON p.category_id = c1.id
    LEFT JOIN categories c2 ON c1.parent_category_id = c2.id
    WHERE c1.id = categoryId;
END;
$$ LANGUAGE plpgsql;

-- Danh sách sản phẩm cùng số lượng tồn kho cập nhật và tổng tồn kho
SELECT p.id AS product_id, p.name AS product_name, p.stock AS current_stock,
       COALESCE(SUM(i.quantity), 0) AS total_inventory_changes
FROM products p
LEFT JOIN inventory i ON p.id = i.product_id
GROUP BY p.id, p.name, p.stock
ORDER BY p.name;

-- Danh sách sản phẩm có doanh thu cao nhất trong mỗi danh mục
SELECT c.name AS category_name, p.name AS product_name, 
       SUM(oi.quantity * oi.price) AS total_revenue
FROM order_items oi
JOIN products p ON oi.product_id = p.id
JOIN categories c ON p.category_id = c.id
GROUP BY c.name, p.name
HAVING SUM(oi.quantity * oi.price) = (
    SELECT SUM(oi2.quantity * oi2.price)
    FROM order_items oi2
    JOIN products p2 ON oi2.product_id = p2.id
    WHERE p2.category_id = c.id
    GROUP BY p2.id
    ORDER BY SUM(oi2.quantity * oi2.price) DESC
    LIMIT 1
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

-- Tính số lượng tồn kho thực tế
SELECT p.id AS product_id, p.name AS product_name, 
       p.stock AS initial_stock,
       COALESCE(SUM(i.quantity), 0) AS total_inventory_changes,
       (p.stock + COALESCE(SUM(i.quantity), 0)) AS final_stock
FROM products p
LEFT JOIN inventory i ON p.id = i.product_id
GROUP BY p.id, p.name, p.stock
ORDER BY final_stock DESC;

-- Sản phẩm trong giỏ hàng chưa được mua
SELECT DISTINCT p.id AS product_id, p.name AS product_name
FROM products p
JOIN cart_items ci ON p.id = ci.product_id
LEFT JOIN order_items oi ON p.id = oi.product_id
WHERE oi.product_id IS NULL;

-- Tính tổng doanh thu theo sản phẩm
CREATE OR REPLACE FUNCTION calculate_product_revenue(product_id INTEGER)
RETURNS DECIMAL(10, 2) AS $$
DECLARE
    total_revenue DECIMAL(10, 2);
BEGIN
    SELECT COALESCE(SUM(oi.quantity * oi.price), 0) INTO total_revenue
    FROM order_items oi
    WHERE oi.product_id = product_id;
    RETURN total_revenue;
END;
$$ LANGUAGE plpgsql;

-- Trigger khi thêm order item mới
CREATE OR REPLACE FUNCTION after_insert_order_item()
RETURNS TRIGGER AS $$
BEGIN
    -- Không cần cập nhật total_revenue vì không có cột này trong schema
    -- Thay vào đó, cập nhật stock
    UPDATE products 
    SET stock = stock - NEW.quantity 
    WHERE id = NEW.product_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_insert_order_item_trigger
AFTER INSERT ON order_items
FOR EACH ROW
EXECUTE FUNCTION after_insert_order_item();

-- Trigger kiểm tra stock trước khi cập nhật
CREATE OR REPLACE FUNCTION before_update_product_stock()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.stock < 0 THEN
        RAISE EXCEPTION 'Số lượng sản phẩm không được nhỏ hơn 0';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_update_product_stock_trigger
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION before_update_product_stock();

-- Function tính giá trị tồn kho
CREATE OR REPLACE FUNCTION calculate_inventory_value(product_id INTEGER)
RETURNS DECIMAL(10, 2) AS $$
DECLARE
    inventory_value DECIMAL(10, 2);
BEGIN
    SELECT stock * price INTO inventory_value
    FROM products
    WHERE id = product_id;
    RETURN COALESCE(inventory_value, 0);
END;
$$ LANGUAGE plpgsql;

-- Function lấy sản phẩm bán chạy nhất trong danh mục
CREATE OR REPLACE FUNCTION get_best_selling_product(category_id INTEGER)
RETURNS INTEGER AS $$
DECLARE
    best_selling_product_id INTEGER;
BEGIN
    SELECT p.id INTO best_selling_product_id
    FROM products p
    JOIN order_items oi ON p.id = oi.product_id
    WHERE p.category_id = category_id
    GROUP BY p.id
    ORDER BY SUM(oi.quantity) DESC
    LIMIT 1;
    RETURN best_selling_product_id;
END;
$$ LANGUAGE plpgsql;

-- Function lấy sản phẩm có doanh thu cao nhất
CREATE OR REPLACE FUNCTION get_top_revenue_product()
RETURNS INTEGER AS $$
DECLARE
    top_revenue_product_id INTEGER;
BEGIN
    SELECT p.id INTO top_revenue_product_id
    FROM products p
    JOIN order_items oi ON p.id = oi.product_id
    GROUP BY p.id
    ORDER BY SUM(oi.quantity * oi.price) DESC
    LIMIT 1;
    RETURN top_revenue_product_id;
END;
$$ LANGUAGE plpgsql;