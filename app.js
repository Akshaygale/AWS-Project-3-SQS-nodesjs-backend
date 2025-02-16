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
    QueueUrl: 'https://sqs.ap-south-1.amazonaws.com/123123123/yourqueue', // Replace with your SQS queue URL
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
    QueueUrl: 'https://sqs.ap-south-1.amazonaws.com/123123/yourqueue', // Replace with your SQS queue URL
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
