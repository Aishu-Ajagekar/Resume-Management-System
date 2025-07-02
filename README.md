# 📄 Resume Management System – MERN Stack

A full-featured Resume Management Web Application built with the **MERN stack**, designed to simplify the recruitment process for both candidates and admins.

## 🚀 Live Demo

🔗 [Live App on Render](https://your-app-link-here.com)  
📂 [GitHub Repository](https://github.com/your-username/resume-management)

---

## 🧰 Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Token)
- **Email Service**: Nodemailer
- **Data Visualization**: Chart.js or Recharts
- **Deployment**: Render

---

## ✨ Key Features

### 👨‍💼 User (Candidate) Side:
- 🔐 Secure registration and login
- 📝 Apply for job listings with resume upload
- 📥 Track application status (shortlisted/rejected)
- 📧 Get real-time email notifications upon status change

### 🛠 Admin Side:
- 🗂️ Create, update, and delete job posts
- 📄 View and manage applicant resumes
- 🎯 Shortlist or reject applicants
- 🔄 **Real-time updates** to applicant UI using Socket.IO
- 📊 View dynamic **pie charts** showing resume status distribution

---

## 📊 Pie Chart Integration

The admin dashboard features a **live pie chart** that displays the percentage of resumes in each status (Applied, Shortlisted, Rejected), providing real-time visual feedback for effective decision-making.

---

## 🔒 Security & Access

- ✅ JWT-based user authentication
- ✅ Role-based route protection (User/Admin)
- ✅ Secure form handling and error validation

---

## 📦 Installation Instructions

1. **Clone the repository:**
  
   git clone [https://github.com/your-username/resume-management.git](https://github.com/Aishu-Ajagekar/Resume-Management-System.git

   cd Resume-Management-System

2. Install dependencies for both client and server:

   cd client
   npm install
   cd ../server
   npm install

3. Set up environment variables:

   Create a .env file in the /server folder:

   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   VITE_APP_URL=http://localhost:3000

4. Run the project:

   # Start server
    cd server
    nodemon server.js

  # Start client
  cd client
  npm run dev

5. 



