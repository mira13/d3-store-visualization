import pyarrow.ipc
import pandas as pd
from fastapi import FastAPI
import json
from fastapi.middleware.cors import CORSMiddleware
from fastapi.testclient import TestClient

dataio_error = "Data file is missing or corrupted"

def get_data():
    try:
        reader = pyarrow.ipc.open_file('./superstore.arrow')
        arrow_table = reader.read_all()
        df_read = arrow_table.to_pandas()
        parsed = json.loads(df_read.to_json(orient="records"))
        return parsed
    except: 
        print (dataio_error)
    

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

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"msg": "Hello World"}