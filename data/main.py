from fastapi import FastAPI
from pydantic import BaseModel
from routes.playerRoutes import router
from fastapi.middleware.cors import CORSMiddleware




app =FastAPI(debug=True);
app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust to match your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

