from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Dict, Any, Optional
import uuid
from datetime import datetime


ROOT_DIR: Path = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# --- MongoDB ---
mongo_url: str = os.environ['MONGO_URL']
client: AsyncIOMotorClient = AsyncIOMotorClient(mongo_url)
db: AsyncIOMotorDatabase = client[os.environ['DB_NAME']]

app: FastAPI = FastAPI(title="Rupesh Portfolio API")
api_router: APIRouter = APIRouter(prefix="/api")


# --- Models ---
class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=80)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=2000)


class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)


class ContactReceipt(BaseModel):
    id: str
    status: str
    created_at: datetime


class StatsResponse(BaseModel):
    total_messages: int
    impact: List[Dict[str, Any]]


# --- Constants ---
IMPACT_STATS: List[Dict[str, Any]] = [
    {"label": "Model Accuracy Lift", "value": 28, "suffix": "%"},
    {"label": "Data Cleaning Reduced", "value": 30, "suffix": "%"},
    {"label": "On-chain Cost Saved", "value": 90, "suffix": "%"},
    {"label": "Production Projects", "value": 6, "suffix": "+"},
]


# --- Routes ---
@api_router.get("/")
async def root() -> Dict[str, str]:
    return {"message": "Rupesh Portfolio API", "version": "1.0"}


@api_router.get("/health")
async def health() -> Dict[str, str]:
    try:
        await db.command("ping")
        return {"status": "ok"}
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"db unavailable: {e}")


@api_router.post("/contact", response_model=ContactReceipt)
async def create_contact(payload: ContactMessageCreate) -> ContactReceipt:
    try:
        msg: ContactMessage = ContactMessage(
            name=payload.name.strip(),
            email=str(payload.email).strip().lower(),
            message=payload.message.strip(),
        )
        await db.contact_messages.insert_one(msg.model_dump())
        logger.info(f"contact message saved id={msg.id} email={msg.email}")
        return ContactReceipt(id=msg.id, status="received", created_at=msg.created_at)
    except Exception:
        logger.exception("failed to save contact message")
        raise HTTPException(status_code=500, detail="Could not save message")


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contact(limit: int = 50) -> List[ContactMessage]:
    limit = max(1, min(limit, 200))
    cursor = db.contact_messages.find().sort("created_at", -1).limit(limit)
    items: List[Dict[str, Any]] = await cursor.to_list(length=limit)
    return [
        ContactMessage(**{k: v for k, v in item.items() if k != "_id"})
        for item in items
    ]


@api_router.get("/stats", response_model=StatsResponse)
async def stats() -> StatsResponse:
    total: int = await db.contact_messages.count_documents({})
    return StatsResponse(total_messages=total, impact=IMPACT_STATS)


# --- App assembly ---
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger: logging.Logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client() -> None:
    client.close()
