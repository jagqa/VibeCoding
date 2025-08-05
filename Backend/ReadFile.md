"""
# Gherkin Generator - Full-Stack Application

This project contains a React frontend and a FastAPI backend to analyze Azure DevOps user stories with the Gemini API and generate Gherkin syntax.

## Project Structure

/
|-- backend/
|   |-- app/
|   |   |-- __init__.py
|   |   |-- main.py             # FastAPI app initialization
|   |   |-- api/
|   |   |   |-- __init__.py
|   |   |   |-- endpoints.py    # API routes/endpoints
|   |   |-- core/
|   |   |   |-- __init__.py
|   |   |   |-- config.py       # Configuration and environment variables
|   |   |-- schemas/
|   |   |   |-- __init__.py
|   |   |   |-- gherkin.py      # Pydantic schemas for requests/responses
|   |   |-- services/
|   |       |-- __init__.py
|   |       |-- ado_service.py    # Logic for Azure DevOps interaction
|   |       |-- gemini_service.py # Logic for Gemini API interaction
|   |-- .env                    # Environment variables (API keys, etc.)
|   |-- requirements.txt        # Python dependencies
|
|-- frontend/
    |-- public/
    |-- src/
    |   |-- components/         # Reusable React components
    |   |   |-- Step1_Connect.js
    |   |   |-- Step2_SelectItems.js
    |   |   |-- Step3_Generate.js
    |   |   |-- Step4_ViewResult.js
    |   |   |-- Loader.js
    |   |-- services/           # API call functions
    |   |   |-- api.js
    |   |-- App.js              # Main application component
    |   |-- index.css           # Global styles
    |   |-- index.js
    |-- package.json

## Setup & Running

### Backend (FastAPI)

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2.  Create a virtual environment and activate it:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4.  Create a `.env` file and add your credentials:
    ```
    ADO_ORGANIZATION_URL="[https://dev.azure.com/YourOrg](https://dev.azure.com/YourOrg)"
    ADO_PAT="your_personal_access_token"
    GEMINI_API_KEY="your_gemini_api_key"
    ```

5.  Start the server:
    ```bash
    uvicorn app.main:app --reload
    ```
    The backend will be running at `http://127.0.0.1:8000`.

### Frontend (React)

1.  Navigate to the `frontend` directory in a new terminal:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm start
    ```
    The frontend will open at `http://localhost:3000`.

"""