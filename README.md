<div align="center">

<br>

# 🧑‍💻 Launch Point — Frontend

#### The React + TypeScript client for a subscription-based Learning Management System

<br>

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
&nbsp;
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
&nbsp;
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
&nbsp;
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
&nbsp;
[![React Router](https://img.shields.io/badge/Router-7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com/)

<br>

**A modern, feature-sliced single-page app —**
**typed end to end, route-guarded by role, and wired to the Launch Point API with seamless token refresh.**

<sub>Marketing site · Auth flows · Student dashboard · Admin dashboard · Google sign-in</sub>

<br>

</div>

<div align="center">

**[Overview](#-overview)** &nbsp;·&nbsp; **[Tech Stack](#-tech-stack)** &nbsp;·&nbsp; **[Features](#-features)** &nbsp;·&nbsp; **[Architecture](#-architecture)** &nbsp;·&nbsp; **[Setup](#-getting-started)** &nbsp;·&nbsp; **[Auth](#-authentication-flow)** &nbsp;·&nbsp; **[Roadmap](#-roadmap)**

</div>

<br>

<div align="center">

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

</div>

<br>

## 📖 Overview

**Launch Point** is a subscription-based Learning Management System (LMS). This repository is its **frontend** — a React 19 single-page application built with TypeScript and Vite.

The app is organised **by feature** (marketing, auth, student, admin) rather than by file type, so every screen's components, pages, layout, and API calls live together and are easy to locate. It consumes the [Launch Point backend](https://github.com/Emmanuel-Johnson/launch-point-backend) API.

> [!NOTE]
> **Status:** Active development. Public marketing pages, the full authentication journey, and role-based dashboard shells are in place. Course catalog, player, and payments are on the [roadmap](#-roadmap).

<br>

<div align="center">

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

</div>

<br>

## 🛠 Tech Stack

<div align="center">

<table>
<tr><td><b>Framework</b></td><td>React 19</td></tr>
<tr><td><b>Language</b></td><td>TypeScript (strict)</td></tr>
<tr><td><b>Build Tool</b></td><td>Vite 8</td></tr>
<tr><td><b>Styling</b></td><td>Tailwind CSS 4 (<code>@tailwindcss/vite</code>)</td></tr>
<tr><td><b>Routing</b></td><td>React Router 7 (data-router config)</td></tr>
<tr><td><b>HTTP</b></td><td>Axios — with JWT auto-refresh interceptor</td></tr>
<tr><td><b>Forms & Validation</b></td><td>React Hook Form + Zod</td></tr>
<tr><td><b>Animation</b></td><td>Framer Motion</td></tr>
<tr><td><b>Notifications</b></td><td>React Toastify</td></tr>
<tr><td><b>Social Auth</b></td><td>Google Identity (<code>@react-oauth/google</code>)</td></tr>
<tr><td><b>Icons</b></td><td>Lucide React</td></tr>
<tr><td><b>State</b></td><td>Redux Toolkit + React Redux</td></tr>
</table>

</div>

<br>

<div align="center">

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

</div>

<br>

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

### 🏠 Marketing

- Landing, About & Contact pages
- Shared public navbar & footer
- Scroll-reveal animations
- Privacy Policy & Terms pages

</td>
<td width="50%" valign="top">

### 🔐 Authentication

- Signup & login
- Email OTP verification
- Forgot / verify code / reset password
- Google sign-in

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🎓 Student

- Protected dashboard layout
- Sidebar + header shell
- Logout confirmation modal

</td>
<td width="50%" valign="top">

### 🛡 Admin

- Separate admin login & dashboard
- Dedicated admin route guards
- Independent axios instance

</td>
</tr>
</table>

<br>

<div align="center">

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

</div>

<br>

## 🏗 Architecture

The app uses a **feature-sliced** structure. Each feature owns its `api`, `components`, `layout`, and `pages`; anything reused across features lives in `shared`; routing is centralised in `app`.

```
app/        →  Routing: central route config, <AppRoutes>, ScrollToTop
features/   →  Self-contained domains (marketing · auth · student · admin)
shared/     →  Cross-cutting: axios clients, route guards, UI primitives
```

**Route guards** keep access rules declarative and out of the pages:

<div align="center">

| Guard                     | Purpose                                        |
| ------------------------- | ---------------------------------------------- |
| **`PublicRoute`**         | Redirects signed-in users away from auth pages |
| **`ProtectedRoute`**      | Gates student routes behind a valid session    |
| **`AdminPublicRoute`**    | Guest-only wrapper for the admin login         |
| **`AdminProtectedRoute`** | Gates the admin area                           |

</div>

<br>

<div align="center">

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

</div>

<br>

## ⚡ Getting Started

### Prerequisites

- Node.js 18+
- The [Launch Point backend](https://github.com/Emmanuel-Johnson/launch-point-backend) running locally
- A Google OAuth Client ID

<br>

### Installation

```bash
# 1️⃣  Clone the repository
git clone https://github.com/Emmanuel-Johnson/launch-point-frontend.git
cd launch-point-frontend

# 2️⃣  Install dependencies
npm install

# 3️⃣  Create a .env file (see below)

# 4️⃣  Start the dev server
npm run dev
```

The app runs at **`http://localhost:5173`** by default ⚡

<br>

### Available Scripts

<div align="center">

| Command           | Description                                    |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Start the Vite dev server                      |
| `npm run build`   | Type-check (`tsc -b`) and build for production |
| `npm run preview` | Preview the production build locally           |
| `npm run lint`    | Run ESLint across the project                  |

</div>

<br>

<details>
<summary><b>📋 &nbsp;Environment Variables (.env)</b></summary>

<br>

```ini
# Google OAuth client ID used by the sign-in button
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

> The API base URL is currently set to `http://localhost:8000/api` in `src/shared/api/axios.ts`.
> Consider moving it to an env variable (e.g. `VITE_API_BASE_URL`) before deploying.

</details>

<br>

<div align="center">

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

</div>

<br>

## 🔐 Authentication Flow

The Axios client in `src/shared/api/axios.ts` handles sessions transparently:

- **Request interceptor** — attaches the access token as a `Bearer` header on every call.
- **Response interceptor** — on a `401`, it silently calls `/auth/token/refresh/`, stores the rotated tokens, and retries the original request.
- **Concurrency-safe** — parallel requests that hit a `401` are queued behind a single refresh, then replayed once the new token arrives.
- **Graceful logout** — if refresh fails (or no refresh token exists), tokens are cleared and the user is redirected to `/login`.

> [!IMPORTANT]
> Auth pages (`login`, `signup`, `google`, `forgot-password`) and the refresh endpoint are explicitly **excluded** from the refresh retry logic to avoid loops.

<br>

<div align="center">

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

</div>

<br>

## 🗺 Roadmap

- [ ] 📚 Course catalog & detail pages
- [ ] 🎬 Course player & lesson progress
- [ ] 💳 Subscription checkout (Razorpay)
- [ ] 📊 Richer student & admin dashboards
- [ ] 🧪 Component & integration tests
- [ ] ☁️ Production deployment

<br>

<div align="center">

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<br>
<br>

<sub>Built with React, TypeScript & Vite · Pairs with the <b>Launch Point</b> backend API</sub>

<br>
<br>

⭐ **Star this repo if you find it useful!**

</div>
