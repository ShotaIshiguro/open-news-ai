from fastapi import FastAPI
import sqlite3

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Open News AI API"}

@app.get("/news")
def get_news():
    # データベースへの接続を確立する
    conn = sqlite3.connect("../crawler/news.db")
    cursor = conn.cursor()

    # newsより最新20件のレコードを取得する
    cursor.execute("""
    SELECT 
        id
        , title
        , link
        , published
    FROM news
    ORDER BY id DESC
    LIMIT 20
    """)
    results = cursor.fetchall()
    conn.close()

    news_list = []
    for row in results:
        news = {
            "id": row[0],
            "title": row[1],
            "link": row[2],
            "published": row[3]
        }
        news_list.append(news)

    return news_list
