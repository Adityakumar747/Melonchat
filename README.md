# 🍉 MelonChat

MelonChat is a **real-time community chat platform** where users can join topic-based discussion rooms and communicate instantly.

The application allows developers and learners to discuss various technology topics in an organized way. It uses modern full-stack technologies to deliver **secure authentication, real-time messaging, and scalable chat infrastructure**.

---

# 🚀 Live Demo

Live Website  
https://melonchat-8hiimchl3-adityakumar747s-projects.vercel.app/

GitHub Repository  
https://github.com/Adityakumar747/Melonchat

---

# ✨ Features

- Real-time messaging using Stream Chat API  
- Topic-based community discussion channels  
- Secure authentication using Clerk  
- Multiple users can join and chat in the same discussion room  
- Responsive UI built with Tailwind CSS  
- Modern full-stack architecture using Next.js  

---

# 🛠 Tech Stack

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

# 📂 Project Structure

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

# ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/Adityakumar747/Melonchat.git
cd Melonchat
```

---

### 2️⃣ Install Dependencies

```
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

```
npm run dev
```

Open in your browser:

```
http://localhost:3000
```

---

# 🧠 How It Works

1. Users authenticate securely through **Clerk authentication**.
2. After login, users can access **topic-based discussion forums**.
3. Each topic corresponds to a **Stream chat channel**.
4. Users joining the same topic enter the **same real-time chat room**.
5. Messages are delivered instantly using Stream's real-time infrastructure.

---

# 📌 Future Improvements

- Typing indicators  
- Message reactions  
- Online user status  
- Private direct messaging  
- Notification system  

---

# 🤝 Contributing

Contributions are welcome!

If you would like to improve **MelonChat** or add new features, feel free to contribute to this project.

You can help by:

- Fixing bugs
- Improving UI/UX
- Adding new chat features
- Optimizing performance
- Improving documentation

### Steps to Contribute

1. Fork the repository
2. Create a new branch

```
git checkout -b feature/your-feature-name
```

3. Commit your changes

```
git commit -m "Added new feature"
```

4. Push the branch

```
git push origin feature/your-feature-name
```

5. Open a Pull Request

Your contribution will be reviewed and merged if it improves the project.

---

# 💡 Suggestions

If you have ideas for improvements or new features, feel free to open an **Issue** in the repository.

---

# 👨‍💻 Author

Aditya Kumar

GitHub  
https://github.com/Adityakumar747

LinkedIn  
https://www.linkedin.com/in/aditya-kumar-08780b325

---

# 📜 License

This project is open-source and available under the **MIT License**.
