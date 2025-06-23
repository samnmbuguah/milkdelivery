from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, schemas, crud, database

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    print("[DB] Creating new database session")
    db = database.SessionLocal()
    try:
        yield db
    finally:
        print("[DB] Closing database session")
        db.close()

@app.get("\")
def read_root():
    print("[API] Root endpoint called")
    return {"message": "Milk Delivery API is running"}

@app.post("/orders", response_model=schemas.Order)
def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db)):
    print(f"[API] Creating order: {order}")
    return crud.create_order(db, order)

@app.get("/admin/orders", response_model=list[schemas.Order])
def list_orders(db: Session = Depends(get_db)):
    print("[API] Listing all orders")
    return crud.get_orders(db)

@app.put("/admin/orders/{order_id}/status")
def update_order_status(order_id: int, status: str, db: Session = Depends(get_db)):
    print(f"[API] Updating order {order_id} status to {status}")
    if status not in ["pending", "delivered"]:
        raise HTTPException(status_code=400, detail="Status must be 'pending' or 'delivered'")
    
    order = crud.update_order_status(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    return {"message": f"Order {order_id} status updated to {status}"}

# Placeholder for order and admin endpoints 