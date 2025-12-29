# Spotify Clone

A responsive and dynamic web-based music player inspired by Spotify. This project is a full-stack application featuring a polished frontend and a robust backend for managing songs and playlists.

## Features

*   **Dynamic Music Player**: Play, pause, skip, and seek tracks with a fully functional player interface.
*   **Media Library**: Browse songs, albums, and artists.
*   **Search Functionality**: Filter songs by name (frontend implementation).
*   **Responsive Design**: Modern UI with Tailwind CSS, optimized for desktop.
*   **Backend Integration**: Node.js/Express server to serve media files and metadata.

## Tech Stack

**Frontend**
*   HTML5 & CSS3
*   Javascript (ES6+)
*   [Tailwind CSS](https://tailwindcss.com/) (Styling)
*   [Vite](https://vitejs.dev/) (Build tool)

**Backend**
*   [Node.js](https://nodejs.org/)
*   [Express.js](https://expressjs.com/)
*   [MongoDB](https://www.mongodb.com/) (Database)
*   Mongoose (ODM)

## Prerequisites

Before running the project, ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v14 or higher)
*   [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas)

## Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/abhishekgupta1025/Music-Player-Spotify-Clone-.git
    cd Music-Player-Spotify-Clone-
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory (if required by backend logic, e.g., DB URI).
    ```env
    # Example
    PORT=4000
    MONGO_URI=mongodb://localhost:27017/spotify_clone
    ```

## Usage

### Development Server
Run the frontend with hot-reloading:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Backend Server
Start the backend server to serve API endpoints:
```bash
npm run server
```

### Build for Production
To build the Tailwind CSS processing:
```bash
npm run build
```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
