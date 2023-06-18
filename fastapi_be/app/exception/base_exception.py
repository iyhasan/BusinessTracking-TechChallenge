from typing import Optional
from fastapi import HTTPException

class AppException(Exception):
    default_message: str = "An error occurred"
    status_code: int = 400

    def __init__(self, details: str = ""):
        self.message = self.default_message
        self.details = details
        super().__init__(self.message)

    def __str__(self):
        if self.details:
            return f'{self.message}: {self.details}'
        return self.message

    def raise_http_exception(self):
        raise HTTPException(status_code=self.status_code, detail=str(self))