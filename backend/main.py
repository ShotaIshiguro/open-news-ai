from fastapi import FastAPI
import sqlite3
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware
from email.utils import parsedate_to_datetime

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

def format_published(published_raw: str) -> str:
    try:
        dt = parsedate_to_datetime(published_raw)
        return dt.strftime("%Y/%m/%d %H:%M")
    except Exception:
        # パースできないデータは元の文字列を返す
        return published_raw

@app.get("/")
def read_root():
    return {"message": "Open News AI API"}

@app.get("/news")
def get_news():
    # データベースへの接続を確立する
    db_path = Path(__file__).resolve().parents[1] / "db" / "news.db"
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # newsより最新20件のレコードを取得する
    cursor.execute("""
    SELECT 
        id
        , title
        , link
        , published
        , is_bookmarked
    FROM news
    ORDER BY id desc
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
            "published": format_published(row[3]),
            "isBookmarked": row[4]
        }
        news_list.append(news)

    return news_list

@app.get("/news/getBookmarkedNews")
def get_news():
    # データベースへの接続を確立する
    db_path = Path(__file__).resolve().parents[1] / "db" / "news.db"
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # newsより最新20件のレコードを取得する
    cursor.execute("""
    SELECT 
        id
        , title
        , link
        , published
        , is_bookmarked
    FROM news
    WHERE is_bookmarked = 1
    ORDER BY id desc
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
            "published": format_published(row[3]),
            "isBookmarked": row[4]
        }
        news_list.append(news)

    return news_list


@app.post("/news/bookmark")
def bookmark_news(newsId):
    db_path = Path(__file__).resolve().parents[1] / "db" / "news.db"
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    try:
        cursor.execute("""
        UPDATE
            news
        SET
            is_bookmarked = CASE is_bookmarked
                WHEN 1 THEN 0
                ELSE 1
            END
        WHERE
            id = ?
        """, (newsId,))
        conn.commit()
        return {"message": "News bookmarked"}
    except sqlite3.Error as e:
        conn.rollback()
        return {"error": str(e)}
    finally:
        if conn:
            conn.close()

