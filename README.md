# Admonere: a reminder app!

I always have trouble remembering tasks since I don't check my phone that often. I usually have a tab open for my email though, so I decided to make a personalized web app where I can input important tasks with their due dates and have it notify me via email. I also added a telegram bot in case I check my phone. Here are the details:

- Takes in a reminder and a due date
- Stores reminders in a Mongo database
- Displays reminders on the page with their due dates next to them
- Reminders can be removed by checking them and hitting the clear button
- Sends an email to me at 4 pm on the date that the task is due (this is usually the time where I'm done with classes and just chilling in my room).
- Also sends me a text on Telegram with the reminder.

Technologies used:
- NodeJS + Express for server side
- MongoDB for storing the reminders
- Heroku for deploying it
- Nodemailer to send out the emails
- Node-telegram-bot-api to send me texts on Telegram
- Bootstrap and google fonts for making it pretty!
- Background image credit: “It’s my wall” by Fitriandhita (https://99designs.com/blog/web-digital/free-zoom-backgrounds/)

Note: some of the fields have dummy values in them for this public repository. You can see the working version of this app at: https://admonereapp.herokuapp.com/. If you're interested in something similar for yourself, you could probably just clone the repo and fill in the fields with your information (you'd have to make a Mongo database and your own telegram app, but that shouldn't take too long).
