# Deploy ke Vercel

Struktur: frontend React (CRA+CRACO) di `frontend/`, backend FastAPI (generate CV PDF)
sebagai serverless function di `api/index.py`. Routing & build diatur `vercel.json`.

## Langkah
1. Push repo ini ke GitHub (JANGAN commit `node_modules` / `frontend/build`).
2. Vercel > Add New > Project > import repo.
3. Root Directory: biarkan default (root repo). Jangan diarahkan ke `frontend/`.
4. Deploy. `vercel.json` sudah mengatur:
   - build: `cd frontend && npm install --legacy-peer-deps && npm run build`
   - output: `frontend/build`
   - rewrite: `/api/*` -> serverless function `api/index.py`
5. Env di Vercel: tidak wajib. `CORS_ORIGINS` opsional (default `*`).

Frontend memanggil API same-origin (`/api/cv`) karena `REACT_APP_BACKEND_URL` dikosongkan.

## Jalan lokal
Backend:  `pip install -r requirements.txt && uvicorn api.index:app --reload --port 8000`
Frontend: `cd frontend && npm install --legacy-peer-deps && npm start`
(untuk tes tombol Download CV secara lokal, set `REACT_APP_BACKEND_URL=http://localhost:8000` di `frontend/.env`)

## Catatan
- MongoDB dihapus: tidak pernah dipakai dan bikin crash di serverless.
- `requirements.txt` diramping ke `fastapi` + `reportlab` (hindari limit 250MB Vercel).
- `overrides` ajv di `frontend/package.json` wajib ada — memperbaiki build CRA 5 di Node 18+/22.
