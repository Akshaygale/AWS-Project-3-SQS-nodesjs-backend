# AWS-Project-3-SQS-nodesjs-backend  (# sqs-project)
To get the massage in queue from the backend 

" IT'S A PROJECT IN WHICH WE ARE GETTING THE MESSAGE FROM THE BACKEND IN OUR QUEUE USEING THE AWS (SQS) SERVICE."
WHERE WE USE EC2, SQS, IAM ROLE, SECURITY GROUP ACCESS 3000 PORT, JS AND HTML FILES

-------------------------------------------------------------------START---------------------------------------------------------------------------

  **STEP-A**:

Create SQS queue

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  **STEP-B**:

Create a security group which can access port 3000. 
Then create the EC2 server (Amazon linux).
Create one IAM role for EC2 with the admin access to service. (Give 1 AWS service access of another AWS service {EC2 to SQS}). And attached it to created EC2 machine.
Launch instance and instal node js and write js and html file.

**STEP-1**:

1: ADD REQUIRED REPO FROM OFFICIAL NODEJS WEBSITE ==>  curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash -

2: INSTALL NODEJS  ==>  sudo yum install -y nodejs

3: VERIFY INSTALLED VERSION  ==> node -v ; npm -v

4: Initialise Node project ==>  npm init -y

5: Install required dependencies  ==>  npm install express aws-sdk body-parser ejs

---------------------------------------------------------------------------------------------------------------------------

**STEP-2**: Create a file with the bold name and there extension and provided the below content.

 **STEP-2.1**         ***app.js***
 
const express = require('express');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path'); // Add path module

const app = express();
const port = 3000;

// Configure AWS SDK to use IAM role credentials automatically
AWS.config.update({ region: 'ap-south-1' }); // Replace with your desired AWS region  

// Create SQS service object
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the view engine and set the views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve send.html
app.get('/send', (req, res) => {
  res.sendFile(path.join(__dirname, 'send.html'));
});

// Send message to SQS
app.post('/send', (req, res) => {
  const { message } = req.body;

  const params = {
    MessageBody: message,
    QueueUrl: 'https://sqs.ap-south-1.amazonaws.com/123123123/yourqueue', // Replace with your SQS queue URL    **CHECK**
  };


  sqs.sendMessage(params, (err, data) => {
    if (err) {
      console.error('Error sending message to SQS:', err);
      res.status(500).send('Error sending message to SQS');
    } else {
      console.log('Message sent to SQS:', data.MessageId);
      res.redirect('/');
    }
  });
});

// Serve messages.ejs
app.get('/messages', (req, res) => {
  // Retrieve messages from SQS queue
  const params = {
    QueueUrl: 'https://sqs.ap-south-1.amazonaws.com/123123/yourqueue', // Replace with your SQS queue URL  **CHECK**
    AttributeNames: ['All'],
    MaxNumberOfMessages: 10, // Adjust as needed
    WaitTimeSeconds: 0,
  };

  sqs.receiveMessage(params, (err, data) => {
    if (err) {
      console.error('Error receiving messages from SQS:', err);
      res.status(500).send('Error receiving messages from SQS');
    } else {
      const messages = data.Messages || [];
      res.render('messages', { messages });
    }
  });
});


// Listen on port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


{this script creates a basic web server that listens on default port 3000, reads the content of an `index.html` file, and sends it as the response when a request is made to the server. The server logs a message indicating that it is running on `http://localhost:3000`.}

-----------------------------------------------------------
**STEP-3**
***create supported files aswell***

  **index.html***

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SQS Example</title>
</head>
<body>
  <h1>Home Page</h1>
  <p>Welcome to the home page!</p>
  <a href="/send">Go to Send Page</a>
  <br>
  <a href="/messages">View Messages</a>
</body>
</html>

-------------------------------------------------------------------
**STEP-3.1**
  **send.html***

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SQS Example</title>
</head>
<body>
  <h1>Send Message</h1>
  <form action="/send" method="post">
    <label for="message">Message:</label>
    <input type="text" id="message" name="message" required>
    <button type="submit">Send</button>
  </form>
  <br>
  <a href="/">Go to Home Page</a>
</body>
</html>

------------------------------------------------------------------------------
**STEP-3.2**
**messages.ejs***  { for this file create new folder then create file there}

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SQS Example</title>
</head>
<body>
  <h1>Messages from SQS Queue</h1>
  <ul>
    <% messages.forEach(message => { %>
      <li><%= message.Body %></li>
    <% }); %>
  </ul>
  <br>
  <a href="/">Go to Home Page</a>
</body>
</html>

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**STEP-C**:

***Once all files created, Run "node app.js". Make sure your ec2 instance have role that contains valid access on SQS service***

Once you access webpage on port 3000, Click on "Go to Send Page" to send a message. and "View Messages" to view messages we have in Queue.

pubic ip addess:3000 ==> for send and see msg in port

![1](https://github.com/user-attachments/assets/6158c63b-6245-4d2a-bcda-9d65206a056e)
![2](https://github.com/user-attachments/assets/fbeb2e5c-aa4b-4e69-9eb5-a3bbef1aba75)
![3](https://github.com/user-attachments/assets/b47afb02-18bd-46e4-817a-fa13a3f7a8f5)

----------------------------------------END-------------------------------------

