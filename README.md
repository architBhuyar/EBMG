# 🎵 Moodtunes - Emotion-Based Playlist Generator

**Moodtunes** is a full-stack web application designed to generate music playlists based on your current mood. Select how you're feeling—Happy, Sad, Energetic, or Calm—and get a curated list of songs to match your vibe. Logged-in users can save their favorite generated playlists to their personal library for future listening.

This project was built to demonstrate a modern, full-stack architecture using a .NET 6 Web API backend and a React.js frontend.

## ✨ Features

*   **Emotion-Based Playlist Generation:** Select a mood and instantly get a relevant, randomized playlist.
*   **User Authentication:** Secure user registration and login system using JWT (JSON Web Tokens).
*   **Save & Manage Playlists:** Logged-in users can save their generated playlists, view their personal library, and delete playlists they no longer want.
*   **Responsive UI:** A clean, modern user interface built with React and Bootstrap that works on both desktop and mobile.
*   **RESTful API:** A well-structured and documented .NET 6 backend API.

## 🛠️ Tech Stack

### Backend
*   **.NET 9:** The core framework for the Web API.
*   **ASP.NET Core:** For building the RESTful API endpoints.
*   **Entity Framework Core:** ORM for interacting with the database.
*   **SQL Server (or your DB):** The database for storing songs, users, and playlists.
*   **ASP.NET Core Identity:** For managing user authentication and security.
*   **JWT Bearer Authentication:** For secure, token-based authorization.

### Frontend
*   **React.js:** A JavaScript library for building the user interface.
*   **Vite:** A modern frontend build tool for a fast development experience.
*   **Axios:** For making HTTP requests to the backend API.
*   **React Context API:** For global state management (user authentication).
*   **Bootstrap 5:** For styling and creating a responsive layout.

---

## 🚀 Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

*   [.NET 6 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)
*   [Node.js (v16 or later)](https://nodejs.org/en/)
*   A code editor like [Visual Studio](https://visualstudio.microsoft.com/) or [VS Code](https://code.visualstudio.com/).
*   SQL Server (or another database supported by EF Core).

### Backend Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/architBhuyar/EBMG.git
    navigate through frontend and backend folder
    ```

2.  **Configure the database connection:**
    *   Open `appsettings.json`.
    *   Modify the `DefaultConnection` string to point to your local database instance.

3.  **Apply database migrations:**
    *   Open the terminal in the backend project directory.
    *   Run the following commands to create and seed the database schema:
    ```sh
    dotnet ef database update
    ```

4.  **Configure JWT settings:**
    *   In `appsettings.json`, update the `Jwt:Key` with your own long, secret string.
    *   Ensure the `Jwt:Issuer` and `Jwt:Audience` URLs match the HTTPS URL your backend runs on (e.g., `https://localhost:7123`).

5.  **Run the backend:**
    *   Press `F5` in Visual Studio or run the command:
    ```sh
    dotnet run
    ```
    The API will now be running, typically on a port like `7123`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```sh
    cd ../emotion-playlist-frontend
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Configure the API endpoint:**
    *   Open `src/api/axiosConfig.js`.
    *   Make sure the `baseURL` matches the URL and port of your running backend API.
    ```javascript
    const axiosInstance = axios.create({
      baseURL: 'https://localhost:7123/api', // Change if your backend port is different
    });
    ```

4.  **Run the frontend:**
    ```sh
    npm run dev
    ```
    The React application will now be running, typically on `http://localhost:5173`. Open this URL in your browser to use the app.

---



## 👤 Author

Archit Bhuyar
