from pydantic import BaseModel
from .users import User

class Admin(BaseModel):
    is_active: bool

class AdminUser(User):
    admin: Admin

def user_to_admin_user(user: User) -> AdminUser:
    admin_user_dict = user.__dict__
    admin_user_dict["admin"] = admin_user_dict["admin"].__dict__
    return AdminUser(**admin_user_dict)
