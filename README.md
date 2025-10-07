# SubTracker
This is a Cloud Computing project. 
SubTracker is a web application for tracking subscriptions. It consists of a **frontend** and **backend**.

---

## Directory Structure

```bash
SubTracker/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── config/
│   ├── app.js        # Entry point for backend
│   ├── package.json
│   └── (other backend files)
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx or App.js
│   │   ├── index.jsx or index.js
│   ├── package.json
│   └── (other frontend files)
├── .gitignore
├── README.md
└── (any other root-level files)
```

---

## Installation

### Prerequisites

* Node.js (v14 or newer recommended)
* npm or yarn
* (Optional) MongoDB or other database supported by backend

### Setup Steps

1. **Clone the repository**

   ```sh
   git clone https://github.com/keepudihemanth/SubTracker.git
   cd SubTracker
   ```

2. **Backend setup**

   ```sh
   cd backend
   npm install
   ```

   Create a `.env` file inside `backend/` and configure environment variables:

   ```env
   PORT=5000
   DATABASE_URL=your_database_connection_string
   JWT_SECRET=your_jwt_secret
   ```

3. **Frontend setup**

   ```sh
   cd frontend
   npm install
   ```

   If needed, configure environment variables in `.env`:

   ```env
   REACT_APP_API_BASE_URL=http://localhost:5000
   ```

---

## Running the Application

* **Backend**

  ```sh
  cd backend
  npm start
  ```

  Or with nodemon (if configured):

  ```sh
  npm run dev
  ```

* **Frontend**

  ```sh
  cd frontend
  npm start
  ```

* Frontend runs on: [http://localhost:3000](http://localhost:3000)  
* Backend runs on: [http://localhost:5000](http://localhost:5000)

---

## Usage

1. Start both backend and frontend as shown above.
2. Open [http://localhost:3000](http://localhost:3000) in your browser.
3. Register or log in if authentication is enabled.
4. Add, view, and manage subscriptions via the UI.

---

## Project Scripts

* **npm start** — start application
* **npm run dev** — development mode with hot reload
* **npm test** — run tests (if available)
* **npm run build** — build frontend for production

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit changes with clear commit messages
4. Push to your fork and submit a pull request

---

