from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import date, timedelta
from .naver_datalab import datalab_search_trend

app = FastAPI(title="Keyword Tracker Backend", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TrendRequest(BaseModel):
    keyword: str
    start: str | None = None  # "2025-01-01"
    end: str | None = None    # "2025-08-30"
    time_unit: str = "date"   # date, week, month

@app.get("/health")
def health():
    return {"ok": True}

@app.post("/api/kr/datalab/trend")
async def get_trend(req: TrendRequest):
    try:
        start = req.start or (date.today() - timedelta(days=90)).isoformat()
        end = req.end or date.today().isoformat()
        data = await datalab_search_trend([req.keyword], start, end, req.time_unit)
        return {"keyword": req.keyword, "start": start, "end": end, "timeUnit": req.time_unit, "result": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
