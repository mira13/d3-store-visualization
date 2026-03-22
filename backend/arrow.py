import pyarrow.ipc
import pandas as pd
from fastapi import FastAPI
from fastapi.responses import JSONResponse
import json
from fastapi.middleware.cors import CORSMiddleware

def get_data():
    reader = pyarrow.ipc.open_file('./superstore.arrow')
    arrow_table = reader.read_all()
    df_read = arrow_table.to_pandas()
    parsed = json.loads(df_read.to_json(orient="records"))
    return parsed

app = FastAPI()
origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["get"],
    allow_headers=["*"],
)

@app.get("/")
async def index():
   return get_data()