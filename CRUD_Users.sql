-- Cài extension tạo id đúng định dạng
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tạo thêm enum public.account_type
CREATE TYPE public.account_type AS ENUM ('LOCAL', 'GOOGLE', 'GITHUB');

-- Thêm vài cột vào bảng USERS
ALTER TABLE public.users
    ADD COLUMN is_active BOOLEAN DEFAULT FALSE,
    ADD COLUMN account_type public.account_type DEFAULT 'LOCAL',
    ADD COLUMN code_id VARCHAR(255),
    ADD COLUMN code_expired DATE,
    ADD COLUMN phone VARCHAR(20),
    ADD COLUMN address VARCHAR(255),
    ADD COLUMN image VARCHAR(255);

-- Đặt các hàng đã có thành TRUE
UPDATE public.users
SET is_active = TRUE;

-- Hàm đăng nhập
CREATE OR REPLACE FUNCTION signIn(
    input_username varchar,
    input_password varchar
) RETURNS BOOLEAN AS $$
DECLARE
    stored_password varchar;
    encrypted_input_password varchar;
BEGIN
    -- Tìm mật khẩu đã lưu cho username tương ứng
    SELECT password INTO stored_password
    FROM public.users
    WHERE username = input_username;

    -- Kiểm tra nếu không tìm thấy username
    IF stored_password IS NULL THEN
        RAISE NOTICE 'Email bạn nhập không kết nối với tài khoản nào.';
        RETURN FALSE;
    END IF;

    -- Mã hóa mật khẩu nhập vào bằng MD5
    encrypted_input_password := md5(input_password);

    -- Kiểm tra nếu mật khẩu không khớp
    IF stored_password != encrypted_input_password THEN
        RAISE NOTICE 'Sai mật khẩu';
        RETURN FALSE;
    END IF;

    -- Nếu cả username và password đều đúng
	RAISE NOTICE 'Đăng nhập thành công';
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

--Test hàm đăng nhập
SELECT signIn('nghia03', '123456');

-- Hàm xem profile một người theo username
CREATE OR REPLACE FUNCTION view_profile(
    user_username varchar
) RETURNS TABLE (
    id varchar,
    username varchar,
    password varchar,
    email varchar,
    first_name varchar,
    last_name varchar,
    role public.user_role,
    created_at timestamp,
    is_active boolean,
    account_type public.account_type,
    code_id varchar,
    code_expired date,
    phone varchar,
    address varchar,
    image varchar
) AS $$
BEGIN
    -- Trả về thông tin của người dùng cụ thể dựa trên username
    RETURN QUERY
    SELECT 
        public.users.id, 
        public.users.username, 
        public.users.password, 
        public.users.email, 
        public.users.first_name, 
        public.users.last_name, 
        public.users.role, 
        public.users.created_at,
        public.users.is_active,
        public.users.account_type,
        public.users.code_id,
        public.users.code_expired,
        public.users.phone,
        public.users.address,
        public.users.image
    FROM public.users
    WHERE public.users.username = user_username;
END;
$$ LANGUAGE plpgsql;


-- Hàm tìm một người theo email

CREATE OR REPLACE FUNCTION find_by_email(
    user_email varchar
) RETURNS TABLE (
    id varchar,
    username varchar,
    password varchar,
    email varchar,
    first_name varchar,
    last_name varchar,
    role public.user_role,
    created_at timestamp,
    is_active boolean,
    account_type public.account_type,
    code_id varchar,
    code_expired date,
    phone varchar,
    address varchar,
    image varchar
) AS $$
BEGIN
    -- Trả về thông tin của người dùng cụ thể dựa trên email
    RETURN QUERY
    SELECT 
        public.users.id, 
        public.users.username, 
        public.users.password, 
        public.users.email, 
        public.users.first_name, 
        public.users.last_name, 
        public.users.role, 
        public.users.created_at,
        public.users.is_active,
        public.users.account_type,
        public.users.code_id,
        public.users.code_expired,
        public.users.phone,
        public.users.address,
        public.users.image
    FROM public.users
    WHERE public.users.email = user_email;
END;
$$ LANGUAGE plpgsql;

-- Hàm xem nhiều người ( chỉ cho ADMIN )
CREATE OR REPLACE FUNCTION view_all_profiles(
    user_role public.user_role
) RETURNS TABLE (
    id varchar,
    username varchar,
    password varchar,
    email varchar,
    first_name varchar,
    last_name varchar,
    role public.user_role,
    created_at timestamp,
    is_active boolean,
    account_type public.account_type,
    code_id varchar,
    code_expired date,
    phone varchar,
    address varchar,
    image varchar
) AS $$
BEGIN
    -- Chỉ cho phép ADMIN truy cập
    IF user_role = 'ADMIN' THEN
        RETURN QUERY
        SELECT 
            public.users.id, 
            public.users.username, 
            public.users.password, 
            public.users.email, 
            public.users.first_name, 
            public.users.last_name, 
            public.users.role, 
            public.users.created_at,
            public.users.is_active,
            public.users.account_type,
            public.users.code_id,
            public.users.code_expired,
            public.users.phone,
            public.users.address,
            public.users.image
        FROM public.users;
    ELSE
        RAISE EXCEPTION 'Only ADMIN can view all profiles';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Xem thông tin của người dùng 'caroline85'
SELECT * FROM view_profile('caroline85');

-- Tìm theo email người dùng có email 'nghiaaa2003@gmail.com'
SELECT * FROM find_by_email('nghiaaa2003@gmail.com');

-- Xem thông tin của tất cả
SELECT * FROM view_all_profiles('ADMIN')

-- Hàm update_profile
CREATE OR REPLACE FUNCTION update_profile(
    input_username varchar,
    input_user_role public.user_role,
    v_email varchar DEFAULT NULL,
    v_first_name varchar DEFAULT NULL,
    v_last_name varchar DEFAULT NULL,
    v_phone varchar DEFAULT NULL,
    v_address varchar DEFAULT NULL,
    v_image varchar DEFAULT NULL
) RETURNS void AS $$
BEGIN
    -- Nếu vai trò là CUSTOMER, chỉ được cập nhật thông tin của chính họ
    IF input_user_role = 'CUSTOMER' THEN
        UPDATE public.users
        SET 
            email = COALESCE(v_email, email),
            first_name = COALESCE(v_first_name, first_name),
            last_name = COALESCE(v_last_name, last_name),
            phone = COALESCE(v_phone, phone),
            address = COALESCE(v_address, address),
            image = COALESCE(v_image, image)
        WHERE username = input_username;
    ELSEIF input_user_role = 'ADMIN' THEN
        -- Nếu vai trò là ADMIN, có thể cập nhật thông tin bất kỳ người dùng nào
        UPDATE public.users
        SET 
            email = COALESCE(v_email, email),
            first_name = COALESCE(v_first_name, first_name),
            last_name = COALESCE(v_last_name, last_name),
            phone = COALESCE(v_phone, phone),
            address = COALESCE(v_address, address),
            image = COALESCE(v_image, image)
        WHERE username = input_username;
    ELSE
        RAISE EXCEPTION 'Invalid role for updating profile';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Test update_profile
SELECT update_profile('caroline85', 'ADMIN', 'caroline85@gmail.com', 'Caroline','Linkin','0974230803','ABC street', 'image');

-- Tạo hàm mã hóa password
CREATE OR REPLACE FUNCTION generate_password(input_text varchar) RETURNS varchar AS $$
BEGIN
    RETURN md5(input_text);  -- Hàm md5 đã có sẵn trong PostgreSQL
END;
$$ LANGUAGE plpgsql;

-- Tạo hàm create_account với các trường bổ sung
CREATE OR REPLACE FUNCTION create_account(
    v_username varchar,
    v_password varchar,
    v_email varchar,
    v_first_name varchar,
    v_last_name varchar,
    v_role public.user_role DEFAULT 'CUSTOMER',
    v_account_type public.account_type DEFAULT 'LOCAL', -- Giá trị mặc định cho account_type
    v_code_id varchar DEFAULT NULL,
    v_code_expired date DEFAULT NULL,
    v_phone varchar DEFAULT NULL,
    v_address varchar DEFAULT NULL,
    v_image varchar DEFAULT NULL
) RETURNS void AS $$
DECLARE
    hashed_password varchar;
    new_id varchar;
BEGIN
    -- Kiểm tra xem tên người dùng đã tồn tại chưa
    IF EXISTS (SELECT 1 FROM public.users WHERE username = v_username) THEN
        RAISE EXCEPTION 'Username % already exists', v_username;
    END IF;

    -- Kiểm tra xem email đã tồn tại chưa
    IF EXISTS (SELECT 1 FROM public.users WHERE email = v_email) THEN
        RAISE EXCEPTION 'Email % already exists', v_email;
    END IF;

    -- Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    hashed_password := generate_password(v_password); -- Gọi hàm mã hóa mật khẩu

    -- Tạo ID theo định dạng uuid.uuid4().hex
    new_id := lower(encode(gen_random_bytes(16), 'hex'));

    -- Thêm người dùng mới vào bảng users với các trường bổ sung và is_active luôn là FALSE
    INSERT INTO public.users (id, username, password, email, first_name, last_name, role, 
                              is_active, account_type, code_id, code_expired, 
                              phone, address, image)
    VALUES (new_id, v_username, hashed_password, v_email, v_first_name, v_last_name, 
            v_role, FALSE, v_account_type, v_code_id, v_code_expired, 
            v_phone, v_address, v_image);
END;
$$ LANGUAGE plpgsql;

-- Test hàm create_account
SELECT create_account('nghia2003', 'admin', 'nghia2003@gmail.com', 'Nghia', 'Tran','CUSTOMER');
SELECT * FROM public.users where username ='nghia2003';

-- Tạo hàm đổi password
CREATE OR REPLACE FUNCTION update_password(
    input_username varchar,
    new_password varchar
) RETURNS void AS $$
DECLARE
    hashed_password varchar;
BEGIN
    -- Mã hóa mật khẩu mới trước khi lưu
    hashed_password := generate_password(new_password);
        UPDATE public.users
        SET password = hashed_password
        WHERE username = input_username;
END;
$$ LANGUAGE plpgsql;

-- Test hàm đổi password
SELECT update_password('nghia03', '123456');

-- Hàm remove user
