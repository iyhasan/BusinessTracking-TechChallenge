from .base_exception import AppException

class InvalidPayloadException(AppException):
    default_message = "Invalid payload"
    status_code = 400

class ResourceNotFoundException(AppException):
    default_message = "Resource not found"
    status_code = 404

class NotAuthorizedException(AppException):
    default_message = "Not authorized"
    status_code = 403

class DeactivatedAdminAccount(NotAuthorizedException):
    details="Admin account is not active"

class InvalidCredentialsException(AppException):
    default_message = "Invalid Credentials"
    status_code = 401

class ExpiredAuthTokenException(AppException):
    default_message = "Session token expired"
    status_code = 401