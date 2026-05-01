# API Contracts — Rupesh Portfolio

## Scope
Persist portfolio content on the server and collect contact messages. Static profile content (name, photo, socials) stays in `mock.js` — only the contact form is persisted to MongoDB for MVP.

## Endpoints (prefix `/api`)

### 1. POST /api/contact
Create a new contact message.
- Request JSON:
  ```json
  { "name": "string (2-80)", "email": "valid email", "message": "string (10-2000)" }
  ```
- Response 200:
  ```json
  { "id": "uuid", "status": "received", "created_at": "ISO-8601" }
  ```
- Errors: 422 validation, 500 server.

### 2. GET /api/contact  (optional / admin demo)
Return latest 50 messages sorted by `created_at desc`. Used for smoke/demo only.
- Response: `ContactMessage[]`

### 3. GET /api/stats
Aggregate stats (total messages received + static impact numbers from mock).
- Response:
  ```json
  { "total_messages": 0, "impact": [ { "label": "...", "value": 28, "suffix": "%" } ] }
  ```

### 4. GET /api/health
Returns `{ "status": "ok" }`.

## Mongo Model — `contact_messages`
```
{
  id: str (uuid4),
  name: str,
  email: str,
  message: str,
  created_at: datetime (utc)
}
```

## Frontend Integration
- `/app/frontend/src/components/Contact.jsx` — replace the `localStorage` mock inside `onSubmit` with:
  `POST ${REACT_APP_BACKEND_URL}/api/contact` using axios.
- On success → toast success, clear form. On failure → toast error.
- Keep mock data in `mock.js` for profile/experience/projects/skills/certs (no backend needed for those in MVP).
- No other components need changes.

## Not in Scope (MVP)
- Auth / admin panel.
- Rate limiting (can add later).
- Email notifications.
