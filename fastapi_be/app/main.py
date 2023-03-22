from fastapi import FastAPI
from app.routers import  users, admins
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/users")
app.include_router(admins.router, prefix="/admins")

@app.get('/')
async def root():
    return {
        'message': 'Hello World'
    }