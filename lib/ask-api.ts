// Base URL for the ask backend (personal-ask-backend).
//
// Empty by default: in production nginx serves the API on the same origin
// (`/health`, `/v1/chat`) behind arifinoid.web.id, so relative paths are all
// we need and the browser never talks to another host.
//
// Local development points at the FastAPI dev server via `.env.local`:
//   NEXT_PUBLIC_ASK_API_URL=http://127.0.0.1:8080
export const ASK_API_URL = process.env.NEXT_PUBLIC_ASK_API_URL ?? "";
