drop schema if exists public cascade;
create schema public;

create type public.user_role as enum('ADMIN', 'CUSTOMER');
create type public.order_status as enum('PENDING', 'SHIPPED', 'DELIVERED', 'CANCELED');
create type public.payment_status as enum('PENDING', 'COMPLETED', 'FAILED');
create type public.payment_method as enum('CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL');
create type public.inventory_change_type as enum('RESTOCK', 'SALE');


create table public.users (
    id varchar(255) not null,
    username varchar(255) not null unique,
    password varchar(255) not null,
    email varchar(255) not null unique,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    role public.user_role not null,
    created_at timestamp not null default now(),
    constraint pk_users primary key (id)
);

create table public.categories (
    id integer not null,
    name varchar(255) not null unique,
    parent_category_id integer,
    constraint pk_categories primary key (id),
    constraint fk_parent_category_id foreign key (parent_category_id) references categories(id)
);

create table public.products (
    id serial not null,
    name varchar(255) not null,
    description text not null,
    price decimal(10, 2) not null,
    stock integer not null default 0,
    image_urls text[],
    category_id int,
    created_at timestamp not null default now(),
    constraint pk_products primary key (id),
    constraint fk_category_id foreign key (category_id) references categories(id),
    check (price >= 0)
);

create table public.orders (
    id char(16) not null,
    customer_id varchar(255) not null,
    total_price decimal(10, 2) not null,
    shipping_address text not null,
    order_status public.order_status not null,
    payment_status public.payment_status not null,
    created_at timestamp not null default now(),
    constraint pk_orders primary key (id),
    constraint fk_customer_id foreign key (customer_id) references users(id),
    check (total_price >= 0)
);

create table public.order_items (
    id char(24) not null,
    order_id char(16) not null unique,
    product_id integer not null,
    quantity integer not null default 1,
    price decimal(10, 2) not null,
    created_at timestamp not null default now(),
    constraint pk_order_items primary key (id, order_id),
    constraint fk_order_id foreign key (order_id) references orders(id),
    constraint fk_product_id foreign key (product_id) references products(id),
    check (quantity >= 0),
    check (price >= 0)
);

create table public.order_status_history (
    id serial primary key,
    order_id char(16) not null,
    old_status public.order_status,
    new_status public.order_status,
    changed_at timestamp default current_timestamp,
    changed_by public.user_role,
    constraint fk_order_id foreign key (order_id) references public.orders(id)
);


create table public.carts (
    id char(16) not null,
    customer_id varchar(255) not null,
    created_at timestamp not null default now(),
    constraint pk_carts primary key (id),
    constraint fk_customer_id foreign key (customer_id) references users(id)
);

create table public.cart_items (
    id char(24) not null,
    cart_id char(16) not null,
    product_id integer not null,
    quantity integer not null default 1,
    created_at timestamp not null default now(),
    constraint fk_cart_id foreign key (cart_id) references carts(id),
    constraint fk_product_id foreign key (product_id) references products(id),
    check (quantity > 0)
);

create table public.inventory (
    id char(8) not null,
    product_id integer not null,
    quantity integer not null,
    change_type public.inventory_change_type not null,
    change_date timestamp not null default now(),
    constraint pk_inventory primary key (id),
    constraint fk_product_id foreign key (product_id) references products(id),
    check (quantity >= 0)
);

create table public.payments (
    id char(28) not null,
    order_id char(16) not null,
    amount decimal(10, 2) not null,
    payment_status public.payment_status not null,
    payment_method public.payment_method not null,
    created_at timestamp not null default now(),
    constraint pk_payments primary key (id),
    constraint fk_order_id foreign key (order_id) references orders(id),
    check (amount >= 0)
);

alter table public.cart_items add unique (cart_id, product_id);