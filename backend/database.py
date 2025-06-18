from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# SQLite database URL (file-based, for local development)
SQLALCHEMY_DATABASE_URL = "sqlite:///./milkdelivery.db"

# Create the SQLAlchemy engine
print(f"[DB] Connecting to database at {SQLALCHEMY_DATABASE_URL}")
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Create a configured "Session" class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine) 