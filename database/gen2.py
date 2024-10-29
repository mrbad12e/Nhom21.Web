# Get all categories from the category.csv file
# Then search for the products in each category and save them in a csv file

import requests
import csv
import time
import random
import os
from pexelsapi.pexels import Pexels
from dotenv import load_dotenv
import math

load_dotenv()

PEXEL_API = os.getenv('PEXEL_API')
pexel = Pexels(PEXEL_API)

# Get all categories from the category.csv file

def get_categories():
    with open('data/category.csv', 'r') as f:
        reader = csv.reader(f)
        categories = list(reader)
        return categories[1:]

# Search 10 products in each category and save them in a csv file
# Search for 3 images for each product
# Save the product name, price, description, category_id and images in the csv file
def generate_csv_file():
    categories = get_categories()
    
    with open('data/products.csv', 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['Name', 'Price', 'Description', 'Category_Id', 'Image1', 'Image2', 'Image3'])

        for category in categories:
            print(f'Searching for {category[1]} products...')
            url = f'https://api.pexels.com/v1/search?query={category[1]}&per_page=15'
            headers = {
                'Authorization': PEXEL_API
            }
            response = requests.get(url, headers=headers)
            data = response.json()
            product_photos = data['photos']
            
            description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec odio nec nisl tincidunt tincidunt. Nullam nec purus nec nisl'
            # Generate 5 products, each with 3 images
            for i in range(0, math.floor(len(product_photos) / 3) * 3, 3):
                product = [
                    # (category[0] -1 ) * 5 + i + 1,
                    f'{category[1]} Product {i+1}',
                    random.randint(10, 100),
                    description,
                    category[0],
                    product_photos[i]['src']['original'],
                    product_photos[i+1]['src']['original'],
                    product_photos[i+2]['src']['original']
                ]
                writer.writerow(product)
            print(f'{category[1]} products saved')
            time.sleep(1)
generate_csv_file()