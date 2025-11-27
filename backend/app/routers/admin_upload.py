# path: backend/app/routers/admin_upload.py
from __future__ import annotations

import os
from pathlib import Path

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, Request, status
from fastapi.responses import JSONResponse

from ..deps import get_current_admin_user

MEDIA_DIR = Path(__file__).resolve().parent.parent.parent / "media"
MEDIA_DIR.mkdir(exist_ok=True)

router = APIRouter(prefix="/admin", tags=["admin-upload"])


@router.post("/upload-image")
async def upload_image(
    file: UploadFile = File(...),
    request: Request = None,
    _: str = Depends(get_current_admin_user),
):
    filename = os.path.basename(file.filename)
    if not filename:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid filename")

    destination = MEDIA_DIR / filename
    try:
        contents = await file.read()
        with open(destination, "wb") as f:
            f.write(contents)
    except Exception:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to save file")

    if request:
        base_url = f"{request.url.scheme}://{request.url.netloc}"
    else:
        base_url = ""
    return JSONResponse({"filename": filename, "url": f"{base_url}/media/{filename}"})
