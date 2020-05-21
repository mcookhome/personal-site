# Import smtplib for the actual sending function
import smtplib
import sys

print(sys.version)
# Import the email modules we'll need
from email.message import EmailMessage

# Open the plain text file whose name is in textfile for reading.
def send_message(me, you, subject, message):
    msg = EmailMessage()
    msg.set_content(message)

    msg['Subject'] = "[mcook.me] " + subject
    msg['From'] = me
    msg['To'] = you

    s = smtplib.SMTP('localhost')
    s.send_message(msg)
    s.quit()
