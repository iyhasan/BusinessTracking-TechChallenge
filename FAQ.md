# FAQ

this document will cover questions that you will probably come across when working on this project.


### How do I generate a secret key for JWT
`$ openssl rand -hex 32`

### Generate new alembic script
`$ docker-compose run fastapi_be alembic revision --autogenerate -m "stand up sets, exercise, and workout tables"`
