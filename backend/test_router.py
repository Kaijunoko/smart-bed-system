from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class DummyInput(BaseModel):
    value: int

@router.post("/test_dummy")
def test_dummy(data: DummyInput):
    return {"echo": data.value}