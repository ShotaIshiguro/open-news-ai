import sqlite3
from pathlib import Path

def init_db():
    db_path = Path(__file__).resolve().parents[1] / "db" / "news.db"
    db_path.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        link TEXT NOT NULL,
        published TEXT NOT NULL
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS bookmark_group (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        is_deleted INTEGER DEFAULT 0
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS bookmarked_news (
        bookmark_group_id INTEGER NOT NULL,
        news_id INTEGER NOT NULL
    )
    """)
    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()