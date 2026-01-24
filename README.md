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
🛠 Tech StackFramework: React (Vite)Language: JavaScriptStyling: Tailwind CSSRouting: React Router DOMHTTP Client: AxiosIcons: Lucide ReactAuth System: Laravel Sanctum (Bearer Token)Deployment: Vercel🔌 API IntegrationBase URL:VITE_API_URL=https://my-fullstack-backend.up.railway.app/apiKey EndpointsMethodEndpointAccessDescriptionPOST/loginPublicMasuk ke akunGET/moviesPublicAmbil semua filmPOST/moviesAdminTambah film baruDELETE/movies/{id}AdminHapus filmGET/usersAdminAmbil daftar userAxios ConfigurationInterceptor: Menambahkan header Authorization: Bearer <token>.Error Handling: Redirect otomatis ke /login jika menerima respon 401 (Unauthorized).📐 Component ArchitectureReusable ComponentsNavbar: Navigasi dinamis sesuai status login.ProtectedRoute: Guard rute berbasis otentikasi.Card: Komponen UI konsisten untuk display film.Page ComponentsSmart Components: Menangani logic API dan state management.UI Components: Fokus pada layouting dan styling.📱 Responsive DesignMobile: Menu hamburger, dropdown search, dan elemen touch-friendly.Tablet: Transisi grid layout yang adaptif.Desktop: Navbar horizontal penuh dengan fitur pencarian yang diperluas.📦 Deployment NotesFrontend: Hosting di Vercel dengan CI/CD aktif.Backend: Laravel + MySQL di hosting via Railway.Environment Variables: Pastikan VITE_API_URL sudah terdaftar di settings Vercel.🔄 Development WorkflowUpdate kode atau styling di lingkungan lokal.Commit dan Push ke branch utama di GitHub.Vercel akan mendeteksi push dan melakukan redeploy otomatis.Verifikasi perubahan pada URL produksi.👨‍💻 AuthorAkbar Pangestu Fullstack Developer "Building scalable and real-world fullstack applications."
