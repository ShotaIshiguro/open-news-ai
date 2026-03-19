import sqlite3

def init_db():
    conn = sqlite3.connect("news.db")
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        link TEXT NOT NULL,
        published TEXT NOT NULL
    )
    """)
    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()