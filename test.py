from typing import Optional

from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    email: Optional[str] = None

@app.get("/", response_class=HTMLResponse)
def home():
    data = {"username":"sudeep", "age":57, "email":"abc@gmail.com"}
    user = User.model_validate(data)
    return f"<h3>Hello world</h3> ${user}"

def main():
    print("hello world")
    data = {"username":"sudeep", "age":57}
    user = User.model_validate(data)
    print(user)


if __name__ == "__main__":
    main()