import os, json
import httpx
from datetime import date

NAVER_CLIENT_ID = os.getenv("NAVER_CLIENT_ID")
NAVER_CLIENT_SECRET = os.getenv("NAVER_CLIENT_SECRET")

async def datalab_search_trend(keywords: list[str], start: str, end: str, time_unit: str = "date"):
    if not NAVER_CLIENT_ID or not NAVER_CLIENT_SECRET:
        raise RuntimeError("NAVER_CLIENT_ID / NAVER_CLIENT_SECRET is not set")
    url = "https://openapi.naver.com/v1/datalab/search"
    body = {
        "startDate": start,
        "endDate": end,
        "timeUnit": time_unit,
        "keywordGroups": [{"groupName": "kw", "keywords": keywords}],
        "device": "",
        "ages": [],
        "gender": ""
    }
    headers = {
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
        "Content-Type": "application/json"
    }
    async with httpx.AsyncClient(timeout=30.0) as c:
        r = await c.post(url, headers=headers, content=json.dumps(body))
        r.raise_for_status()
        return r.json()
