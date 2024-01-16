from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/auth1", response_class=HTMLResponse)
def auth1():
    return HTMLResponse(content=open("static/auth_step1/index.html", "r", encoding="utf-8").read())


@app.get("/auth2", response_class=HTMLResponse)
def auth2():
    return HTMLResponse(content=open("static/auth_step2/index.html", "r", encoding="utf-8").read())


@app.get("/invoice_calculating", response_class=HTMLResponse)
def auth2():
    return HTMLResponse(content=open("static/invoie_calculation/index.html", "r", encoding="utf-8").read())
