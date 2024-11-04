-- Tạo giỏ hàng mới
INSERT INTO carts (customer_id, created_at)
VALUES (1, CURRENT_TIMESTAMP); -- Thay 1 bằng ID của customer

-- Cập nhật số lượng sản phẩm trong giỏ
UPDATE cart_items
SET quantity = quantity + 1 -- Tăng số lượng lên 1, điều chỉnh số lượng phù hợp
WHERE cart_id = 1 AND product_id = 2; -- Thay 1 bằng ID của giỏ hàng và 2 bằng ID sản phẩm

-- Tính tổng giá trị của giỏ hàng
SELECT SUM(p.price * ci.quantity) AS total_price
FROM cart_items ci
JOIN products p ON ci.product_id = p.id
WHERE ci.cart_id = 1; -- Thay 1 bằng ID của giỏ hàng

-- Xóa sản phẩm khỏi giỏ khi số lượng là 0
DELETE FROM cart_items
WHERE quantity = 0;

-- Thêm sản phẩm vào giỏ hàng
INSERT INTO cart_items (cart_id, product_id, quantity, created_at)
VALUES (1, 2, 1, CURRENT_TIMESTAMP); -- Thay 1 bằng ID giỏ hàng, 2 bằng ID sản phẩm, 1 bằng số lượng

-- Function kiểm tra số lượng sản phẩm trong giỏ có còn đủ trong kho không
CREATE OR REPLACE FUNCTION check_cart_inventory(cart_id INT)
RETURNS TABLE(product_id INT, product_name TEXT, requested_quantity INT, stock_quantity INT, enough_stock BOOLEAN) AS $$
BEGIN
    RETURN QUERY
    SELECT p.id, p.name, ci.quantity AS requested_quantity, p.stock AS stock_quantity,
           (p.stock >= ci.quantity) AS enough_stock
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.cart_id = cart_id;
END;
$$ LANGUAGE plpgsql;

-- Ví dụ sử dụng function
SELECT * FROM check_cart_inventory(1); -- Thay 1 bằng ID của giỏ hàng cần kiểm tra
