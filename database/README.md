# Database Generation Project Documentation

## Initial Folder Structure

```
.
├── sql/
│   └── store-create.sql    # Database schema creation script
├── data/
│   └── categories.csv      # Predefined categories data
├── gen2.py                 # User table data generator
├── gen3.py                 # Categories table data generator
├── helpers.py              # Shared helper functions for data generation
└── store.sql               # Database backup file after data generation
```

## File Descriptions

### Database Creation
- `./sql/store-create.sql`
  - Contains all SQL statements to create the database schema
  - Defines tables, relationships, and constraints
  - Should be run first before any data generation

### Source Data
- `./data/categories.csv`
  - Contains predefined categories for the database
  - Manually curated data file
  - Used as input for the category data generation process

### Data Generation Scripts
- `gen2.py`
  - Generates data for the product table
  - Creates file `./data/products.csv` 

- `gen3.py`
  - Handles random user data generation
  - Handles admin data generation
  - Imports data from `./data/products.csv` and `./data/categories.csv`

- `helpers.py`
  - Contains shared utility functions
  - Used by both gen2.py and gen3.py
  - Provides common data generation and validation logic

### Backup
- `store.sql`
  - Complete database backup file
  - Created after successful data generation
  - Can be used to restore the database to a known good state

## Setup and Usage

### Virtual Environment Setup (Recommended)
It's strongly recommended to use a virtual environment for this project. Here's how to set it up:

```bash
# Change current directory to this folder using cd command

# Create a virtual environment
python -m venv myenv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On Unix or MacOS:
source venv/bin/activate

# Install required packages
pip install -r requirements.txt
```

### Running the Generation Scripts (Optional)
1. First, create an empty PostgresSQL database
    ```cmd
    $ psql -U [username]
    # Enter your user's password
    [username]=# create database [db_name];

    # Quit
    [username]=# \q
    ```
2. Create the database using the schema:
   ```bash
   psql -f sql/store-create.sql
   ```

3. Generate product data:
   ```bash
   python gen2.py
   ```

4. Generate user data and import data:
   ```bash
   python gen3.py
   ```

5. Backup the database (optional):
   ```bash
   pg_dump dbname > store.sql
   ```

### Running backup file
    ```bash
    psql -U [username] -d [dbname] -f store_utf8.sql
    ```

## Important Notes
- Always activate the virtual environment before running any scripts
- Ensure all dependencies are installed within the virtual environment
- The generation scripts should be run in the specified order
- Make sure to backup your data before running any generation scripts