import models
import schemas
from sqlalchemy.orm import Session

DELIVERY_FEE = 50
MILK_PRICE_PER_LITER = 70

def create_order(db: Session, order: schemas.OrderCreate):
    """Create a new order in the database."""
    total = order.liters * MILK_PRICE_PER_LITER + DELIVERY_FEE
    print(f"[CRUD] Calculated total: {total} for {order.liters} liters")
    db_order = models.Order(
        name=order.name,
        phone=order.phone,
        address=order.address,
        liters=order.liters,
        total=total,
        latitude=order.latitude,
        longitude=order.longitude,
        status="pending",  # Default status for new orders
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    print(f"[CRUD] Order created with ID: {db_order.id}")
    return db_order

def get_orders(db: Session):
    """Retrieve all orders from the database."""
    print("[CRUD] Fetching all orders from the database")
    return db.query(models.Order).order_by(models.Order.created_at.desc()).all()

def update_order_status(db: Session, order_id: int, status: str):
    """Update the status of an order."""
    print(f"[CRUD] Updating order {order_id} status to {status}")
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if order:
        order.status = status
        db.commit()
        db.refresh(order)
        print(f"[CRUD] Order {order_id} status updated to {status}")
        return order
    return None 