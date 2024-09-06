import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import random

def send_confirmation_email(user_email):
    # Email content
    subject = "Ticket Confirmation"
    ticket_num = random.randint(1,1000)
    ticket_id = f"TCKT{ticket_num}"
    body = f"Dear User,\n\nYour ticket with ID {ticket_id} has been successfully generated\nBest Regards,\nSupport Team"

    # Email settings
    sender_email = "ticketconfirmation63@gmail.com"
    sender_password = "ymui ugca fneq prdy"

    # Creating the email message
    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = user_email
    message['Subject'] = subject
    message.attach(MIMEText(body, 'plain'))

    try:
        # Connecting to the SMTP server
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()

        # Logging in to the SMTP server
        server.login(sender_email, sender_password)

        # Sending the email
        server.send_message(message)

        print(f"Confirmation email sent to {user_email}")
    except Exception as e:
        print(f"Failed to send confirmation email: {str(e)}")
    finally:
        # Closing the server connection
        server.quit()

# user_email = "keshavk6325325@gmail.com"
# send_confirmation_email(user_email)