import feedparser
import sqlite3
from pathlib import Path

rss_url = "https://www3.nhk.or.jp/rss/news/cat0.xml"

feed = feedparser.parse(rss_url)

db_path = Path(__file__).resolve().parents[1] / "db" / "news.db"
db_path.parent.mkdir(parents=True, exist_ok=True)
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

for entry in feed.entries:
    title = entry.title
    link = entry.link
    published = entry.published
    cursor.execute("""
    INSERT INTO news(title, link, published) VALUES(?,?,?)
    """, (title, link, published))

    print(f"Saved: {title}")

conn.commit()
conn.close()