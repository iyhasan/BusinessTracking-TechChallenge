from .base_exception import AppException

class ErrorCreatingResource(AppException):
    default_message = "Error creating resource"
    status_code = 500

class ErrorUpdatingResource(AppException):
    default_message = "Error updating resource"
    status_code = 500