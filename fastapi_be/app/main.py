from fastapi import FastAPI
from app.routers import  users

app = FastAPI()

app.include_router(users.router, prefix="/users")

@app.get('/')
async def root():
    return {
        'message': 'Hello World'
    }