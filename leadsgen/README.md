# LeadsGen.AI 

**LeadsGen.AI** is a platform where you can enter leads and generate follow-up messages through AI according to their queries.

**Live Backend URL:** [https://leadsgen-backend.onrender.com](https://leadsgen-backend.onrender.com)
**Live Frontend URL:** [https://leadsgenie.netlify.app/](https://leadsgenie.netlify.app/)
**Public GitHub Repo:** [https://github.com/KaranSapra124/LeadsGen](https://github.com/KaranSapra124/LeadsGen)

---

## Features

* Add and manage leads efficiently
* Generate AI-based follow-up messages using Google Gemini
* Secure authentication with email and password (bcrypt hashed)
* Responsive and interactive UI
* Backend powered by Node.js, Express, and MongoDB

---

## Incremental Commits

Here’s a summarized list of notable commits:

| Commit    | Description                                         |
| --------- | --------------------------------------------------- |
| `c23fb84` | Added final touch up to modals                      |
| `6665b1a` | Added final touch up to AI modal                    |
| `d2f49d8` | Added AI for follow-up messages                     |
| `0879a0e` | Integrated Google Gemini for AI follow-ups          |
| `637e853` | Removed password length validation                  |
| `a87ac18` | Added auth guard                                    |
| `2af8924` | Improved add leads logic                            |
| `56ac914` | Made sidebar responsive                             |
| `2a87a10` | Updated register and login pages                    |
| `00e01a2` | Added protection to dashboard                       |
| `d82de20` | Added login module                                  |
| `52f0c3d` | Added register authentication                       |
| `7bd645e` | Created register and login pages                    |
| `bf7eacd` | Implemented leads update functionality              |
| `c395142` | Added 404 Not Found validation                      |
| `0688581` | Implemented delete leads functionality              |
| `8fdc839` | Added add leads and get leads functionality         |
| `dde9c95` | Changed type module                                 |
| `3c6712c` | Added database, routes, and controllers for backend |
| `0fede9a` | Initial backend setup                               |
| `b4a6f06` | Added redirection in root path                      |
| `2dc99fe` | Styling improvements in leads view                  |

---

## Free Services Used

* Google Gemini 2.5
* MongoDB Atlas (Free Tier)

---

## Local Setup

### Step 1: Clone Repository

```bash
git clone https://github.com/KaranSapra124/LeadsGen.git
cd LeadsGen
```

### Step 2: Frontend Setup

```bash
cd frontend  # if frontend is in a separate folder
npm install
npm run dev
```

### Step 3: Backend Setup

```bash
cd backend  # if backend is in a separate folder
npm install
node server
```

---

## Environment Variables

### Frontend

Create `.env.local` in the frontend root directory:

```
NEXT_PUBLIC_BACKEND_URL={Backend URL}
```

### Backend

Create `.env` in the backend root directory:

```
DB_URL={MongoDB URL}
JWT_SECRET=supersecretkey
GEMINI_API_KEY={Google Gemini API Key}
```

---

## Authentication

* Email and password (bcrypt hashed)
* **Demo credentials:**

  * Email: `test@test.com`
  * Password: `123456`

---

## Time Taken to Build

32 hours


