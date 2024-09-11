import pandas as pd
import openai
import os

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import random

from dotenv import load_dotenv
from flask import Flask, jsonify,request
from flask_cors import CORS

# Load the .env file
load_dotenv()



app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

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

def display_exhibitions(location, date):
    try:
        df = pd.read_csv('Museums.csv')

        if location.lower() == 'na' and date.lower() == 'na':
            filtered_df = df
        elif date.lower() == 'na':
             filtered_df = df[(df['Location'].str.lower() == location.lower())]
        elif location.lower() == 'na':
            filtered_df = df[(df['Date'] == date)]
        else:
            filtered_df = df[(df['Location'].str.lower() == location.lower()) & (df['Date'] == date)]

        # Check if any exhibitions match the filters
        if filtered_df.empty:
            return f"No exhibitions in {location} on {date}."
        else:
            # Display the filtered DataFrame without 'Details' and 'Booking URL' columns
            return filtered_df.drop(['Details', 'Booking URL'], axis=1).sample(n=5)

    except FileNotFoundError:
        return "The file 'Museums.csv' was not found."
    except Exception as e:
        return f"An error occurred: {e}"
    

def show_details(exhibit_id):
  df = pd.read_csv('Museums.csv')
  return df.Details[df["Exhibition ID"] == exhibit_id].values[0]

def book_ticket(exhibit_id):
  return "Ticket Booked!"

def ask_chatbot(user_prompt):

  # Deduction Start
  response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": f"""
            You are a helpful Museum chatbot assistant named MuseumGPT.
            Otherwise,
            Deduce what the user has asked for based on the user prompt:
            - If the user has asked for a list of all exhibits, exhibitions, shows, etc., at a given location, date, type or is just looking for them, respond with a single word: LIST <location-name> <date>. Date should be in YYY-MM-DD format. If either location or date is not mentioned, just say Na in its place. Omit the < and > in the response.
            - If the user has asked for the details of a particular exhibit, show, etc., respond with a single word: DETAILS <exhibit-id>. Omit the < and > in the response.
            - If the user has asked to book a particular exhibit, show, etc., respond with a single word: BOOK <exhibit-id>. Omit the < and > in the response.
            - If the user has asked for any general museum related question, just make something up as an answer and say it: GENERAL <answer>. Omit the < and > in the response.
            """},
            {"role": "user", "content": f"{user_prompt}"}
        ]
    )
  ans = response.choices[0].message['content'].strip()
  words = ans.split()
  type_of_request = words[0]
  # Deduction End
  print(ans)
  # Response Start
  if type_of_request == "LIST":
    final_output = display_exhibitions(words[1],words[2])
  elif type_of_request == "DETAILS":
    final_output = show_details(words[1])
  elif type_of_request == "BOOK":
    final_output = book_ticket(words[1])
  elif type_of_request == "GENERAL":
    final_output = " ".join(words[1:])
  else:
    final_output = "Sorry, I didn't understand your question"

  # Response End
  print(final_output)
  return final_output


@app.route('/', methods=['POST'])
def index():
    data = request.get_json()
    user_prompt = data.get('user_prompt')
    response = ask_chatbot(user_prompt)
    if(isinstance(response, str)):
      
      return jsonify({'response':{'text':response} })
    response=response.to_json() 
    return jsonify({'response': response})

# New route for email confirmation
@app.route('/sendEmailConfirmation', methods=['POST'])
def send_email():
    data = request.json
    email = data.get('email')  # Extract the email from the request data
    
    if not email:
        return jsonify({"error": "Email is required"}), 400

    send_confirmation_email(email)
    return jsonify({"message": "Booking done"}), 200


if __name__ == '__main__':
    app.run(debug=True)