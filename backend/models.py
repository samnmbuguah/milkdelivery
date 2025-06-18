from sqlalchemy import Column, Integer, String, Float, DateTime, func
from sqlalchemy.ext.declarative import declarative_base

# SQLAlchemy Base class for models
Base = declarative_base()

class Order(Base):
    """
    Order model representing a milk delivery order.
    """
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    address = Column(String(255), nullable=False)
    liters = Column(Integer, nullable=False)
    total = Column(Float, nullable=False)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    status = Column(String(20), nullable=False, default="pending")  # pending, delivered
    created_at = Column(DateTime(timezone=True), server_default=func.now()) 