import os
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api import endpoints

# Configure logging
logging.basicConfig(level=logging.INFO)

app = FastAPI()

# CORS Middleware
# This is important for allowing the frontend (on a different port in development)
# to communicate with the backend.
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- FIX for /api/connect 404 ---
# This line registers all the API routes from your endpoints.py file.
app.include_router(endpoints.router)

# --- FIX for static file 404s (favicon.ico, etc.) ---
# This serves your React frontend's build folder.
# It assumes your Frontend and Backend folders are siblings.
static_files_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "Frontend", "build"))

if os.path.exists(static_files_path):
    app.mount("/", StaticFiles(directory=static_files_path, html=True), name="static")