CREATE OR REPLACE FUNCTION public.update_cart_item_quantity(cart_id CHAR(16), product_id INT, quantity INT)
RETURNS VOID AS $$
DECLARE
    cart_exists BOOLEAN;
    product_exists BOOLEAN;
    current_quantity INT;
    available_stock INT;
BEGIN
    -- Kiểm tra nếu cart_id tồn tại
    SELECT EXISTS(SELECT 1 FROM public.carts WHERE id = cart_id) INTO cart_exists;
    IF NOT cart_exists THEN
        RAISE EXCEPTION 'Cart with id % does not exist', cart_id;
    END IF;

    -- Kiểm tra nếu product_id hợp lệ và lấy số lượng tồn kho
    SELECT stock INTO available_stock
    FROM public.products
    WHERE id = product_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Product with id % does not exist', product_id;
    END IF;

    -- Lấy số lượng hiện tại của sản phẩm trong giỏ hàng
    SELECT quantity INTO current_quantity
    FROM public.cart_items
    WHERE cart_id = cart_id AND product_id = product_id;

    -- Kiểm tra nếu sản phẩm không tồn tại trong giỏ hàng
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Product with id % is not in cart with id %', product_id, cart_id;
    END IF;

    -- Kiểm tra nếu quantity hợp lệ (phải là số không âm)
    IF quantity < 0 THEN
        RAISE EXCEPTION 'Desired quantity must be non-negative';
    END IF;

    -- Kiểm tra nếu số lượng yêu cầu không vượt quá hàng tồn kho
    IF quantity > available_stock THEN
        RAISE EXCEPTION 'Desired quantity (%s) exceeds available stock (%s) for product_id=%', quantity, available_stock, product_id;
    END IF;

    -- Xóa sản phẩm nếu quantity đặt là 0
    IF quantity = 0 THEN
        DELETE FROM public.cart_items
        WHERE cart_id = cart_id AND product_id = product_id;
    ELSE
        -- Cập nhật số lượng mới
        UPDATE public.cart_items
        SET quantity = quantity
        WHERE cart_id = cart_id AND product_id = product_id;
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to update cart item for cart_id=%, product_id=%: %', cart_id, product_id, SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

