# Spotify Clone

A mobile application that simulates core functionalities of Spotify, allowing users to browse, search, and play music. This project uses React Native for the mobile client and ASP.NET Core 9 for the backend API.

---

## 🚀 Project Overview

**Features:**

- **User Authentication:** Register, log in, and manage user profiles.
- **Music Library:** Browse songs, albums, artists, and playlists.
- **Search:** Full-text search for tracks, albums, artists, and playlists.
- **Playback Controls:** Play, pause, skip forward/backward.
- **Media Details:** View detailed information for tracks, albums, and artists.

---

## 🛠️ Technology Stack

| Component        | Technology                      |
| ---------------- | ------------------------------- |
| **Mobile App**   | React Native                    |
| Navigation       | React Navigation                |
| State Management | Redux or Context API            |
| UI Library       | React Native Paper / NativeBase |
| **API**          | ASP.NET Core 9                  |
| ORM              | Entity Framework Core 9         |
| Authentication   | JWT Bearer                      |
| Database         | SQL Server or PostgreSQL        |
| Documentation    | Swagger (Swashbuckle)           |

---

## 📋 Prerequisites

- **Node.js** >= 18.x (with npm or Yarn)
- **.NET 9.0 SDK**
- **SQL Server** or **PostgreSQL**
- **React Native CLI** (or **Expo CLI** for Expo projects)

---

## ⚙️ Setup and Installation

### 1. Backend (ASP.NET Core 9)

1. **Clone the repository**

   ```bash
   git clone https://github.com/nghiemledo/reactnative-spotify-clone.git
   cd reactnative-spotify-clone/SPO.Server
   ```

2. **Install dependencies**

   ```bash
   dotnet restore
   ```

3. **Configure environment variables**
   Create a `.env` file in the `backend` folder with the following content:

   ```dotenv
   # Database connection string
   ConnectionStrings__DefaultConnection="Server=localhost;Database=SpotifyClone;User Id=sa;Password=YourPassword;"

   # JWT settings
   JWT__Secret="YourSuperSecretKey"
   JWT__ExpiresInMinutes=60
   ```

4. **Apply database migrations**

   ```bash
   dotnet ef database update
   ```

5. **Run the API**
   ```bash
   dotnet run
   ```
   By default, the API will be available at `https://localhost:5001` and `http://localhost:5000`.

### 2. Mobile App (React Native)

1. **Navigate to the mobile app folder**

   ```bash
   cd ../SPO.Client
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure API URL**
   Create a file `src/config.js` with the following:

   ```js
   export const API_URL = "https://localhost:5001/api";
   ```

4. **Start the app**
   - **Expo:**
     ```bash
     expo start
     ```
   - **React Native CLI (Android):**
     ```bash
     npx react-native run-android
     ```
   - **React Native CLI (iOS):**
     ```bash
     npx react-native run-ios
     ```

---

## 📖 API Endpoints

| Method | Endpoint                | Description                          |
| ------ | ----------------------- | ------------------------------------ |
| POST   | `/api/auth/register`    | Register a new user                  |
| POST   | `/api/auth/login`       | Authenticate and return JWT          |
| GET    | `/api/tracks`           | Retrieve all tracks                  |
| GET    | `/api/tracks/{id}`      | Retrieve details of a specific track |
| GET    | `/api/albums`           | Retrieve all albums                  |
| GET    | `/api/playlists`        | Retrieve all playlists               |
| GET    | `/api/search?q={query}` | Search across tracks, albums, etc.   |

> **Note:** View full API documentation and test endpoints at `/swagger`.

---

## 🧪 Testing

- **Backend:**

  ```bash
  cd SPO.Server
  dotnet test
  ```

- **Mobile App:**
  ```bash
  cd SPO.Client
  npm test
  ```

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m "Add YourFeature"`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a Pull Request

Please follow the existing code style and add tests for new features.

---

## 📄 License

This project is licensed under the MIT License. See the [MIT License](LICENSE) file for details.

---

## ✉️ Contact

If you have any questions or feedback, feel free to open an issue or contact me at `<nghiemledo@gmail.com>`.
