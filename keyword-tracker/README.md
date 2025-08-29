
# Keyword Tracker (MVP)

블랙키위 스타일의 **키워드 추이 조회** 최소 기능을 가진 풀스택 보일러플레이트입니다.

## 구성
- **frontend**: Next.js 14 (App Router)
- **backend**: FastAPI (Python 3.11)
- **DB**: (옵션) Postgres — 현 MVP에선 사용하지 않지만 docker-compose에 주석 예시 포함
- **실행**: Docker Compose

## 준비물
1) 네이버 DataLab API 자격증명 (Client ID/Secret)
2) Docker, Docker Compose

## 환경변수
`.env` 또는 시스템 환경으로 설정:
```
NAVER_CLIENT_ID=your_client_id
NAVER_CLIENT_SECRET=your_client_secret
BACKEND_PORT=8000
FRONTEND_PORT=3000
```

## 실행
```bash
# 1) .env 파일 복사
cp .env.example .env
# 2) 값 채우기 (NAVER_CLIENT_ID / SECRET)
# 3) 도커 실행
docker compose up --build
```

서비스 접속:
- Frontend: http://localhost:${FRONTEND_PORT:-3000}
- Backend: http://localhost:${BACKEND_PORT:-8000}/docs

## 기능
- 키워드 입력 → 기간 선택 → **네이버 DataLab** 검색 트렌드 조회
- 결과를 표로 표시 (추후 Chart 라이브러리로 시각화 확장 가능)

## 다음 단계
- [ ] Chart.js/ECharts로 시각화
- [ ] 연령/성별/디바이스 필터 추가
- [ ] 연관키워드(네이버 검색광고 API) 연동
- [ ] SERP 스냅샷(합법적 API) 및 포화지수 산식 적용
```

