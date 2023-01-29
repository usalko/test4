import strawberry

from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter
from service.schema import schema

graphql_app = GraphQLRouter(schema)

app = FastAPI()
app.include_router(graphql_app, prefix="/graph")
app.include_router(graphql_app, prefix="/graphql")
