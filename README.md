# 🍉 MelonChat – Real-Time Community Chat Platform

MelonChat is a **real-time community discussion platform** where users can join topic-based chat rooms and communicate instantly.  
The application enables developers and learners to discuss various technology topics in a structured and interactive environment.

The platform uses modern full-stack technologies to deliver **secure authentication, real-time messaging, and scalable chat infrastructure**.

---

## 🚀 Live Demo

🔗 **Live Website**  
https://melonchat-8hiimchl3-adityakumar747s-projects.vercel.app/

🔗 **GitHub Repository**  
https://github.com/Adityakumar747/Melonchat

---

## ✨ Features

- Real-time messaging using Stream Chat API  
- Topic-based community discussion channels  
- Secure user authentication using Clerk  
- Multiple users can join and chat in the same discussion room  
- Responsive UI built with Tailwind CSS  
- Scalable architecture using Next.js API routes  
- Modern developer-friendly project structure  

---

## 🛠 Tech Stack

### Frontend
- Next.js  
- React  
- Tailwind CSS  

### Backend
- Next.js API Routes  

### Authentication
- Clerk  

### Real-Time Chat
- Stream Chat API  

### Deployment
- Vercel  

---

## 📂 Project Structure

```
Melonchat
│
├── app
│   ├── forum
│   ├── api
│   └── page.js
│
├── components
│   └── Navbar.js
│
├── lib
│   └── stream.js
│
├── public
│
├── README.md
├── package.json
├── next.config.js
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Adityakumar747/Melonchat.git
cd Melonchat
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Create Environment Variables

Create a file:

```
.env.local
```

Add the following variables:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret

NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
STREAM_SECRET_KEY=your_stream_secret
```

---

### 4️⃣ Run the Development Server

```bash
npm run dev
```

Open in browser:

```
http://localhost:3000
```

---

## 🧠 How It Works

1. Users authenticate securely through **Clerk authentication**.
2. After login, users can access **topic-based discussion forums**.
3. Each topic corresponds to a **Stream chat channel**.
4. Users joining the same topic enter the **same real-time chat room**.
5. Messages are delivered instantly using **Stream's WebSocket infrastructure**.

---

## 📌 Future Improvements

- Typing indicators for active users  
- Message reactions and emoji support  
- Online user status indicators  
- Private direct messaging  
- Notifications for new messages  

---

## 👨‍💻 Author

**Aditya Kumar**

GitHub  
https://github.com/Adityakumar747  

LinkedIn  
https://www.linkedin.com/in/aditya-kumar-08780b325

---

## 📜 License

This project is open-source and available under the MIT License.
