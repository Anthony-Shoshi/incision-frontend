# Incision Frontend

This is the frontend application for **Incision**, a medical procedure material optimization platform. It allows authenticated users to upload medical datasets and view cost optimization results using predictive models powered by the backend service.

## 🔗 Project Links

- **Frontend Repo (This Project)**: [https://github.com/Anthony-Shoshi/incision-frontend](https://github.com/Anthony-Shoshi/incision-frontend)

- **Backend Repo (Must be set up first)**: [https://github.com/Dawoodikram482/incision_price_predictor](https://github.com/Dawoodikram482/incision_price_predictor)

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Anthony-Shoshi/incision-frontend.git
```
```bash
cd incision-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a file named .env.local in the root of the project and add the following line:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5050/api
```

### 4. Run the app in development mode

```bash
npm run dev
```

The app will be available at: [http://localhost:3000](http://localhost:3000)

---

## 🚀 Production

### Build for production

```bash
npm run build
```

---

## 🔐 Login Credentials

To access the app after backend setup:

- **Username:** `admin`
- **Password:** `admin123`

---

## ⚠️ Important Notes

1. **Backend must be running first** for authentication and data upload to function correctly.  
   > Backend Repo: [https://github.com/Dawoodikram482/incision_price_predictor](https://github.com/Dawoodikram482/incision_price_predictor)

2. The frontend app communicates with the backend on:  
   `http://localhost:5050` — Make sure this matches your backend server URL.

3. Uploaded files must be in `.csv` format and follow the required template.  
   A sample file is available to download inside the app.

---

## 📦 Tech Stack

- **Next.js** (React Framework)
- **Tailwind CSS** (Styling)
- **react-hot-toast** (Notifications)
- **Lucide Icons** (UI Icons)

---

## 🧩 Features

- Secure login with JWT stored in `localStorage`
- Drag & drop file upload interface
- Sidebar navigation (visible after login)
- File validation and result navigation
- Toast notifications for instant feedback

---

For any issues or questions, feel free to open an [Issue](https://github.com/Anthony-Shoshi/incision-frontend/issues).