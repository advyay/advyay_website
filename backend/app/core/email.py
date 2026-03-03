import smtplib
from email.mime.text import MIMEText
from app.core.config import get_settings

settings = get_settings()

def send_otp_email(to_email: str, otp: str):
    msg = MIMEText(f"Your Admin OTP is: {otp}")
    msg["Subject"] = "Admin Login OTP"
    msg["From"] = settings.SMTP_EMAIL
    msg["To"] = to_email

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(settings.SMTP_EMAIL, settings.SMTP_PASSWORD)
        server.send_message(msg)