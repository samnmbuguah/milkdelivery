from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# Pydantic schema for creating an order (input)
class OrderCreate(BaseModel):
    name: str
    phone: str
    address: str
    liters: int
    latitude: Optional[float] = None
    longitude: Optional[float] = None

# Pydantic schema for returning an order (output)
class Order(BaseModel):
    id: int
    name: str
    phone: str
    address: str
    liters: int
    total: float
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    created_at: datetime

    class Config:
        orm_mode = True 