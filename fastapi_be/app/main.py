from fastapi import FastAPI, Depends
from app.routers import  users, admins, auth
from fastapi.middleware.cors import CORSMiddleware
from app.utils.authentication import get_current_user

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth")

app.include_router(users.router, prefix="/users", dependencies=[Depends(get_current_user)])

# TODO: Add dependency that user is admin
app.include_router(admins.router, prefix="/admins", dependencies=[Depends(get_current_user)])

@app.get('/')
async def root():
    return {
        'message': 'Hello World'
    }