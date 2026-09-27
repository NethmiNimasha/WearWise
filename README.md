# WearWise 👗👔

WearWise is an AI-powered outfit planner and wardrobe management application. It helps users digitize their wardrobe and provides intelligent outfit recommendations based on their clothing items.

## 🌟 Features

*   **User Authentication**: Secure signup and login functionality.
*   **Wardrobe Management**: Add, view, and manage your clothing items, categorized by type (Tops, Bottoms, Shoes, Accessories, etc.).
*   **AI Outfit Planner**: Get smart outfit suggestions generated from your available wardrobe items.
*   **Modern Dashboard**: A sleek, glassmorphism-inspired user interface for managing your digital closet.

## 🛠️ Technology Stack

### Frontend
*   **Framework**: React 18 with Vite
*   **Language**: TypeScript
*   **Routing**: React Router DOM
*   **Styling**: Custom CSS with modern glassmorphism design (Vanilla CSS)
*   **Icons**: React Icons
*   **HTTP Client**: Axios

### Backend
*   **Framework**: Spring Boot
*   **Language**: Java 17
*   **Security**: Spring Security
*   **Data Access**: Spring Data JPA
*   **Database**: H2 Database (In-memory, for development)
*   **Utilities**: Lombok

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   Java Development Kit (JDK 17+)
*   Gradle

### Running the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Run the Spring Boot application using Gradle:
   ```bash
   # On macOS/Linux
   ./gradlew bootRun
   
   # On Windows
   .\gradlew.bat bootRun
   ```
   The backend will start on `http://localhost:8080`.

### Running the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5177`.

## 📂 Project Structure

*   `/frontend`: Contains the React application (UI components, pages, context, and styles)
*   `/backend`: Contains the Spring Boot application (Controllers, Services, Models, Repositories, Security configurations)

## 🎨 Design System

The application uses a modern, dark-themed UI featuring:
*   Glassmorphism effects (blurred backgrounds, semi-transparent overlays)
*   Vibrant gradients (violet to fuchsia)
*   Smooth micro-animations and hover states for enhanced interactivity
*   Custom `Outfit` font family for modern typography
