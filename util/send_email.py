""" Module to send emails """

import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.header import Header

def send(from_addr, to_addr, subject, message, password):
    """ Sends an email with the given data """

    smtp_server = smtplib.SMTP('smtp.gmail.com', 587)
    smtp_server.ehlo()
    smtp_server.starttls()
    smtp_server.login(from_addr, password)
    msg = MIMEMultipart()
    msg["From"] = from_addr
    msg["To"] = to_addr
    msg["Subject"] = "[mcook.me]" + subject
    msg.attach(MIMEText(message.encode('utf-8'), 'html', 'UTF-8'))

    smtp_server.sendmail(from_addr, to_addr, msg.as_string())
    smtp_server.quit()
