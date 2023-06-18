from fastapi import HTTPException, Request
from app.exception import AppException
from starlette.responses import JSONResponse

class ExceptionHandlingMiddleware:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        try:
            await self.app(scope, receive, send)
        except AppException as ae:
            response = JSONResponse(
                status_code=ae.status_code, 
                content={
                    "detail": str(ae),
                    "err1": ae.message,
                    "err2": ae.details
            })
            await response(scope, receive, send)
        except HTTPException as httpe:
            response = JSONResponse(
                status_code=httpe.status_code,
                content={
                    "detail": httpe.detail,
                }
            )
        except Exception as e:
            response = JSONResponse(
                status_code=500, 
                content={
                    "detail": str(e)
            })
            await response(scope, receive, send)
