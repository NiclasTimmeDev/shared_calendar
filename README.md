# Documentation

## A Full-Stack Javascript Web-App based on React, Node, Express and MongoDB

## What's it about?

The shared calendar app is for people who want to collaboratively schedule their lifes.

## Functionality

- User authentication system
- Users can create a calendar and calendar events (e.g., meetings)
- Users can invite other users per mail to join their calendar. Invited users will receive a mail with an invitation code
- The members of one calendar can see all events of the other member and allocate events to each other

## Tech Stack

- Backend: NodeJS & Express
- Database: MongoDB
- Frontend: ReactJS

## Getting started

### Prerequisits

- Installation of node and npm
- An active sendGrid API KEY (https://sendgrid.com/)
- A MongoDB database, either locally or in the cloud
- You also should have react installed

### Starting the App

First, Download the code (in whatever way you like).

Then, in a new terminal window, type:

<pre><code>sudo npm install
</code></pre>

Then, move into the <code>/client</code> directory. There, again run:

<pre><code>sudo npm install
</code></pre>

Next up, it is neccessary that you create a config.js file in the <strong>server/config</strong> directory.

In the <strong>server/config</strong> directory, create a <strong>config.js</strong> file with the following code:

<pre><code>
module.exports = {
  mongoURI: PATH_TO_YOUR_MONGO_DB,
  tokenSecret: YOUR_PERSONAL_TOKEN_KEY,
  sendGrid_api_key: YOUR_SENDGRID_API_KEY,
};
</code></pre>

The above key-value pairs are the following:

- The mongoURI is the URI to your MongoDB database. For more detail, see: https://mongoosejs.com/docs/connections.html , or: https://docs.mongodb.com/manual/installation/
- The tokenSecret is neccessary for encrypting tokens, which will primarily be used for authentication. You can choose anything you like here. The only condition is that it has to be a string.
- The sendGrid API is used for sending mails via the sendGrid API. The huge advantage of using sendGrid is, that you neither need your own SMTP server or registered domain for it to work. This allows for great development experience. SendGrid has a free plan, which I use for this project as well.

Now that everything is set up, in the terminal, run:

<pre><code>npm run dev
</code></pre>

The frontent will run on localhost://3000 and the backend will run on localhost://5000
