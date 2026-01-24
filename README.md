# DiStreaming – Frontend Documentation 🎬
**React (Vite) + Tailwind CSS** • *Last Updated: January 2026*

---

## 📌 Table of Contents
- [Project Overview](#-project-overview)
- [Core Features](#-core-features)
- [Authentication & Access Control](#-authentication--access-control)
- [Routing Structure](#-routing-structure)
- [Tech Stack](#-tech-stack)
- [API Integration](#-api-integration)
- [Component Architecture](#-component-architecture)
- [Responsive Design](#-responsive-design)
- [Deployment Notes](#-deployment-notes)
- [Development Workflow](#-development-workflow)
- [Author](#-author)

---

## 📖 Project Overview
**DiStreaming** adalah frontend platform streaming fullstack yang dibangun menggunakan **React (Vite)** dan **Tailwind CSS**. Aplikasi ini dirancang untuk terintegrasi dengan backend **Laravel REST API**.

**Kemampuan Utama:**
* **RBAC**: Kontrol akses berbasis peran (User & Admin).
* **Discovery**: Penjelajahan dan pencarian film secara real-time.
* **Management**: CRUD film dan kategori khusus Admin.
* **Security**: Otentikasi aman menggunakan Bearer Token.
* **Responsive**: UI yang adaptif dari mobile hingga desktop.

---

## 🚀 Core Features

### 🌍 Public Access (Guest)
* **Landing Page**: Halaman utama yang informatif.
* **Movie List**: Menampilkan katalog film (read-only).
* **Movie Detail**: Informasi mendalam tentang sinopsis dan detail film.
* **Auth**: Fitur pendaftaran akun dan masuk.

### 👤 User Features
* **Authentication**: Manajemen session (Login/Logout).
* **Profile**: Identitas pengguna di Navbar.
* **Browsing**: Fitur pencarian film.

### ⚡ Admin Features
* **Admin Dashboard**: Ringkasan statistik platform.
* **Movie CRUD**: Manajemen penuh konten film (Create, Read, Update, Delete).
* **Category Management**: Pengelolaan kategori dinamis via API.
* **User Management**: Kontrol daftar user dan pembaruan role.

---

## 🔒 Authentication & Access Control

### Authentication Flow
1.  User login via `/login`.
2.  Backend mengirimkan `token`, `role`, dan `name`.
3.  Frontend menyimpan data di `localStorage`.
4.  **Axios Interceptor** menyisipkan token secara otomatis ke setiap request header.

### Role-Based Access Table
| Role | Izin Akses Halaman |
| :--- | :--- |
| **Guest** | Home, Movies, Login, Register |
| **User** | Profile, Movie Detail, Browsing |
| **Admin** | Dashboard, CRUD Movies, User Management |

> **Note:** Proteksi rute menggunakan komponen `<ProtectedRoute role="admin">`.

---

## 📂 Routing Structure

```text
src/
├── pages/
│   ├── Homepages.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Movies.jsx
│   ├── MovieDetail.jsx
│   ├── Users.jsx
│   ├── UserDetail.jsx
│   └── admin/
│       ├── AdminDashboard.jsx
│       ├── AdminEditMovie.jsx
│       └── MovieForm.jsx
├── components/
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   └── Card.jsx
├── services/
│   └── api.js
├── App.jsx
└── main.jsx
## 🛠 Tech Stack

* **Framework**: React (Vite)
* **Language**: JavaScript
* **Styling**: Tailwind CSS
* **Routing**: React Router DOM
* **HTTP Client**: Axios
* **Icons**: Lucide React
* **Auth System**: Laravel Sanctum (Bearer Token)
* **Deployment**: Vercel

---

## 🔌 API Integration

**Base URL:**
`VITE_API_URL=https://my-fullstack-backend.up.railway.app/api`

### Key Endpoints

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/login` | Public | Masuk ke akun |
| `GET` | `/movies` | Public | Ambil semua film |
| `POST` | `/movies` | Admin | Tambah film baru |
| `DELETE` | `/movies/{id}` | Admin | Hapus film |
| `GET` | `/users` | Admin | Ambil daftar user |

### Axios Configuration
* **Interceptor**: Secara otomatis menyuntikkan header `Authorization: Bearer <token>`.
* **Error Handling**: Jika menerima respon `401`, aplikasi otomatis melakukan redirect ke `/login`.

---

## 📐 Component Architecture

### Reusable Components
* **Navbar**: Menu navigasi dan auth menu.
* **ProtectedRoute**: Guard rute berdasarkan status login dan role.
* **Card**: Komponen kartu film yang konsisten.

### Page Components
* **Smart Components**: Menangani logika bisnis dan pengambilan data (Movies, Dashboard).
* **UI Components**: Fokus murni pada presentasi data dan styling.

---

## 📱 Responsive Design

* **Mobile**: Menu hamburger, pencarian dropdown, dan tombol ramah sentuhan (touch-friendly).
* **Tablet**: Navbar kompak dan penyesuaian grid layout.
* **Desktop**: Navbar penuh dengan search bar yang diperluas secara horizontal.

---

## 📦 Deployment Notes

* **Frontend**: Di-host di **Vercel** dengan fitur *auto-deploy* setiap kali ada perubahan pada repo GitHub.
* **Backend**: Menggunakan **Laravel + MySQL** yang berjalan di platform **Railway**.
* **Environment Variables**: Pastikan variabel `VITE_API_URL` sudah dikonfigurasi di dashboard Vercel pada bagian *Environment Variables*.

---

## 🔄 Development Workflow

1.  Update styling atau fitur baru secara lokal.
2.  Lakukan **Commit** dan **Push** perubahan ke GitHub.
3.  Vercel akan mendeteksi perubahan dan melakukan **redeploy** secara otomatis.
4.  Lakukan pengujian akhir pada URL produksi yang diberikan Vercel.

---

## 👨‍💻 Author

**Akbar Pangestu** *Fullstack Developer* > "Building scalable and real-world fullstack applications."
