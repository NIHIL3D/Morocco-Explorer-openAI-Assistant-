# Moroccan Explorer AI Assistant

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Firebase Setup](#firebase-setup)
- [Usage](#usage)
- [Result](#result)


## Overview
Moroccan Explorer is a web-based AI assistant designed to provide comprehensive information about Morocco, including its history, geography, culture, and local attractions. The assistant can answer queries using text prompts or image searches.

## Features
- Text-based search using OpenAI's GPT-3.5-turbo model.
- Image-based search using Google Lens API.
- User authentication and data storage using Firebase.
- Interactive user interface built with React.

## Project Structure
- `server.py`: Flask server that handles API requests for text and image searches.
- `imgSearch.py`: Script for handling image search using Google Lens API.
- `gptSearch.py`: Script for handling text search using OpenAI's GPT model.
- `App.js`: Main React component for routing.
- `Mexplorer.js`: React component for the main interface of the Moroccan Explorer.
- `Login.js`: React component for user authentication.
- `FirebaseConfig.js`: Configuration file for Firebase.
- `requirements.txt`: List of Python dependencies.

## Installation

### Backend Setup
1. Clone the repository:
    ```sh
    https://github.com/NIHIL3D/Morocco-Explorer-openAI-Assistant-.git
    cd Morocco-Explorer-openAI-Assistant-
    ```

2. Create a virtual environment:
    ```sh
    python -m venv venv
    source venv/bin/activate
    ```

3. Install Python dependencies:
    ```sh
    pip install -r requirements.txt
    ```

4. Set up environment variables for OpenAI and Google Lens API keys. Create a `.env` file in the root directory and add your keys:
    ```
    OPENAI_API_KEY=your_openai_api_key
    SERPAPI_API_KEY=your_google_lens_api_key
    ```

5. Run the Flask server:
    ```sh
    python server.py
    ```

### Frontend Setup
1. Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```

2. Install npm dependencies:
    ```sh
    npm install
    ```

3. Start the React development server:
    ```sh
    npm start
    ```

### Firebase Setup
1. Create a Firebase project and enable Authentication and Realtime Database.
2. Configure the `FirebaseConfig.js` file with your Firebase project settings:
    ```js
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getDatabase } from "firebase/database";

    const firebaseConfig = {
      apiKey: "your_api_key",
      authDomain: "your_auth_domain",
      databaseURL: "your_database_url",
      projectId: "your_project_id",
      storageBucket: "your_storage_bucket",
      messagingSenderId: "your_messaging_sender_id",
      appId: "your_app_id"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const database = getDatabase(app);

    export { auth, database, app };
    ```

## Usage
1. Log in using Google authentication.
2. Enter a text prompt or upload an image to search for relevant information.
3. View the results displayed by the Moroccan Explorer AI assistant.

## Result

![Screenshot_812](https://github.com/NIHIL3D/Morocco-Explorer-openAI-Assistant-/assets/117014237/8216d18b-5029-45b1-bd14-5ca2d63e3e37)


![Screenshot_816](https://github.com/NIHIL3D/Morocco-Explorer-openAI-Assistant-/assets/117014237/71379eb6-dfb4-4004-a619-12ba95be7883)
