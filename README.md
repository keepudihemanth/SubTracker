#  SubTracker — Smart Subscription Management App

SubTracker is a modern full-stack web application designed to help you manage, track, and analyze all your online subscriptions in one place. It provides reminders, insights, and expense management features to make subscription tracking effortless.

---

##  Features

-  **User Authentication** – Secure login and signup using JWT.
-  **Add / Edit / Delete Subscriptions** – Manage your services easily.
-  **Expense Insights** – Track monthly and yearly spending.
-  **Reminders** – View upcoming renewals and due dates.
-  **Encrypted Credentials** – Optional secure storage for credentials.
-  **Responsive UI** – Modern, clean, and works on all devices.

---

##  Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React.js |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT (JSON Web Token) |
| Styling | CSS |
| HTTP Client | Axios |

---

##  Project Setup

Follow the steps below to run SubTracker locally.

### 1️⃣ Clone the Repository

```

git clone https://github.com/keepudihemanth/SubTracker.git
cd SubTracker

```

---

### 2️⃣ Install Dependencies

For backend:
```

cd backend
npm install

```

For frontend:
```

cd frontend
npm install

```

---

### 3️⃣ Environment Variables

Create a `.env` file inside the **backend** folder and add:

```

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/subtracker
JWT_SECRET=yourSuperSecretKey

```

> REMEMBER: :**Do not commit `.env`** — keep it private.  
> You can create `.env.example` for contributors:

```

PORT=
MONGO_URI=
JWT_SECRET=

```

---

### 4️⃣ Run the App

Start the backend:
```

cd backend
node server.jss

```
The backend will run on `http://localhost:5000`

Start the frontend:
```

cd ../frontend
npm start

```
The frontend will run on `http://localhost:5173`

---

##  Folder Structure

```bash

SubTracker/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── subscription.js
│   ├── models/
│   │   ├── User.js
│   │   └── Subscription.js
│   ├── middleware/
│   └── .env
│
└── frontend/
├── src/
│   ├── App.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Dashboard.jsx
│   │   ├── SubscriptionForm.jsx
│   │   ├── SubscriptionList.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Footer.jsx
│   ├── assets/
│   │   └── hero-image.png
│   └── index.css
└── package.json

```

---

##  Security Notes

- Passwords are **hashed using bcrypt**.
- Auth handled by **JWT tokens** stored in `localStorage`.
- Sensitive keys (`MONGO_URI`, `JWT_SECRET`) stay in `.env`.
- Never upload your `.env` or encryption keys to GitHub.

---




---

##  How It Works

1. Register or log in with your credentials.  
2. Add subscription details — name, cost, renewal date, etc.  
3. Dashboard shows all subscriptions, total expenses, and due reminders.  
4. Data is stored securely in MongoDB.  
5. You can edit or delete subscriptions anytime.


---

##  Troubleshooting

| Issue | Fix |
|--------|-----|
| MongoDB connection error | Check `MONGO_URI` and whitelist your IP |
| JWT error | Ensure correct `JWT_SECRET` in `.env` |
| CORS issue | Enable `app.use(cors())` in backend |
| Unauthorized requests | Add `Bearer <token>` in request headers |


---

##  Author

**Hemanth**  
Full Stack Developer & Creator of SubTracker  
 

---

##  Support

If you find this project helpful, please give it a ⭐ on GitHub to support development!
