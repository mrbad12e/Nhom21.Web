from faker import Faker
import csv
from helpers import *
import psycopg2
from psycopg2.extras import execute_values
import uuid

info = init()
conn = psycopg2.connect(info)
curs = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
fake = Faker()

def generate_password(str):
    import hashlib
    return hashlib.md5(str.encode()).hexdigest()

def generate_unique_users(num_users, role='CUSTOMER'):
    users = []
    usernames = set()
    emails = set()

    def generate_unique_user():
        while True:
            username = fake.user_name()
            email = fake.email()
            if username not in usernames and email not in emails:
                usernames.add(username)
                emails.add(email)
                return {
                    'id': uuid.uuid4().hex,
                    'username': username,
                    'password': generate_password('admin'), # all passwords are 'admin'
                    'email': email,
                    'first_name': fake.first_name(),
                    'last_name': fake.last_name(),
                    'role': role
                }

    for _ in range(num_users):
        users.append(generate_unique_user())

    return users

def insert_table(table, rows):
    columns = rows[0].keys()
    query = f"INSERT INTO {table} ({', '.join(columns)}) VALUES %s"
    values = [[value for value in row.values()] for row in rows]
    execute_values(curs, query, values)
    conn.commit()

def import_categories():
    with open('data/category.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            curs.execute("INSERT INTO categories (id, name, parent_category_id) VALUES (%s, %s, %s)", 
                         (row['Id'], row['Name'], row['Parent Category Id'] or None))
    conn.commit()

def import_products():
    with open('data/products.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            curs.execute("INSERT INTO products (name, description, price, stock, image_urls, category_id) VALUES (%s, %s, %s, %s, %s, %s)", 
                         (row['Name'], row['Description'], float(row['Price']), 0, 
                          [url for url in [row['Image1'], row['Image2'], row['Image3']] if url], 
                          int(row['Category_Id'])))
    conn.commit()

def main():
    try:
        import_categories()
        import_products()
        
        # Generate and insert unique users
        users = generate_unique_users(1000)
        insert_table('users', users)

        # Generate and insert admin user
        admin = generate_unique_users(1, 'ADMIN')[0]
        insert_table('users', [admin])
        
        conn.commit()
        print("Data import completed successfully.")
    except Exception as e:
        conn.rollback()
        print(f"An error occurred: {e}")
    finally:
        conn.close()

if __name__ == '__main__':
    main()