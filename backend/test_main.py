from fastapi.testclient import TestClient

from .main import app, get_data

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()[0] != None
    assert response.json()[0]["Profit"] != None

def test_file_io():
    file_contents = get_data()
    assert file_contents != None