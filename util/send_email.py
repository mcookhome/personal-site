""" Module to send emails """

import smtplib

def send(from_addr, to_addr, subject, message, password):
    """ Sends an email with the given data """

    smtp_server = smtplib.SMTP('smtp.gmail.com', 587)
    smtp_server.ehlo()
    smtp_server.starttls()
    smtp_server.login(from_addr, password)
    smtp_server.sendmail(from_addr, to_addr, 'Subject:[mcook.me] ' + subject + "\n" + message)
    smtp_server.quit()
