📝 MERN Blog Application

A full-stack MERN blog platform with JWT authentication, rich text editor, and Redux state management.
Users can register, log in, and create, edit, or delete their own blog posts. Public visitors can view all blog posts without logging in.

🚀 Tech Stack
| Layer                     | Technology                                                   |
| ------------------------- | ------------------------------------------------------------ |
| **Frontend**              | React, Redux Toolkit, React Router, React-Quill, TailwindCSS |
| **Backend**               | Node.js, Express.js, MongoDB, Mongoose                       |
| **Authentication**        | JWT (JSON Web Token), bcrypt.js                              |
| **State Management**      | Redux Toolkit                                                |
| **Styling**               | Tailwind CSS                                                 |

⚙️ Setup Instructions

npm install

npm run dev

🔐 Authentication Flow

User registers with name, email, password (hashed using bcrypt).

User logs in and receives a JWT token.

Token is stored in local storage and attached to authenticated requests.

Middleware verifies token for protected routes.


🧭 Features

Register/Login/Logout flow

Create, edit, delete blog posts

Rich text for content

Public blog listing and detail pages

Protected routes for logged-in users only
