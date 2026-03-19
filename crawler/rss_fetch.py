import feedparser
import sqlite3

rss_url = "https://www3.nhk.or.jp/rss/news/cat0.xml"

feed = feedparser.parse(rss_url)

conn = sqlite3.connect("news.db")
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