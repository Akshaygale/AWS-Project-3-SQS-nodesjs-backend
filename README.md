**AWS SQS Node.js Backend Project**

Overview

This project demonstrates how to integrate AWS Simple Queue Service (SQS) with a Node.js backend. The application allows messages to be sent from a web interface to an SQS queue and retrieved for display. It utilizes AWS EC2, SQS, IAM roles, security groups, and basic web technologies (JavaScript, HTML, and EJS).

**Architecture & Components**

AWS SQS: Queue service for message storage and retrieval.

AWS EC2: Compute instance hosting the Node.js application.

IAM Role: Grants EC2 permission to interact with SQS.

Security Group: Allows traffic on port 3000.

Node.js & Express: Backend server handling API requests.

HTML & EJS: Frontend for user interaction.

***Setup Guide***

***Step A: Create an SQS Queue***

Log in to AWS Console.

Navigate to Amazon SQS.

Create a new queue (either Standard or FIFO based on your needs).

Note the Queue URL for later use.

***Step B: Configure EC2 & IAM Role***

Create a Security Group:

Allow inbound traffic on port 3000.
 
Launch an EC2 Instance:

Use Amazon Linux as the OS.

Attach the previously created security group.

Attach an IAM role with permissions to access SQS.

Install Node.js on EC2:

**curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash -**

**sudo yum install -y nodejs**

**node -v**

**npm -v  # Verify installation**

Initialize Node.js Project:

npm init -y
npm install express aws-sdk body-parser ejs

**Step 1:** Create app.js

Create a new file app.js and add the app.js content:

**Step 2:** Create Frontend Files index.html and add index.html content

also create send.html and add send.html content

also create messages.ejs and add messages.ejs content



***Step C: Run the Application***

Ensure your EC2 instance has the appropriate IAM role for SQS access.

Start the server:

node app.js

Access the web interface via:http://<EC2_PUBLIC_IP>:3000

Use the Send Message page to add messages to the queue.

Use the View Messages page to fetch messages from the queue.

See below secrrenshots

![1](https://github.com/user-attachments/assets/5e082216-e3a1-43e1-8407-4ed1117daa8d)
![2](https://github.com/user-attachments/assets/5ab589d3-df11-42c2-bc5f-44d24463f07b)
![3](https://github.com/user-attachments/assets/af5eb23f-94b8-452c-b859-7bc4d9f6dad4)



