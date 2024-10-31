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
