import smtplib

def send(from_addr, to_addr, subject, message, password):
    smtp_server = smtplib.SMTP('smtp.gmail.com', 587)
    smtp_server.ehlo()
    smtp_server.starttls()
    print from_addr
    print password
    smtp_server.login(from_addr, password)
    smtp_server.sendmail(from_addr, to_addr, 'Subject: ' + subject + "\n" + message)
    print "mail"
    smtp_server.quit()
