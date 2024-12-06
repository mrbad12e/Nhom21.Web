import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Optional, Dict
import uuid

class UserManager:
    def __init__(self, db_config: Dict):
        self.conn = psycopg2.connect(**db_config)
    
    def create_user(
        self,
        username: str,
        password: str,
        email: str,
        first_name: str,
        last_name: str,
        role: str = 'CUSTOMER',
        phone: Optional[str] = None,
        address: Optional[str] = None,
        image: Optional[str] = None
    ) -> Dict:
        try:
            with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    """
                    SELECT create_account(
                        %s, %s, %s, %s, %s, %s::public.user_role, %s, %s, %s
                    )
                    """,
                    (username, password, email, first_name, last_name, 
                     role, phone, address, image)
                )
                self.conn.commit()

                # Fetch created user
                cur.execute(
                    "SELECT * FROM view_profile(%s)",
                    (username,)
                )
                return cur.fetchone()
                
        except psycopg2.Error as e:
            self.conn.rollback()
            raise Exception(f"Failed to create user: {str(e)}")

    def get_user(self, username: str) -> Dict:
        with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                "SELECT * FROM view_profile(%s)",
                (username,)
            )
            return cur.fetchone()
    
    def close(self):
        self.conn.close()