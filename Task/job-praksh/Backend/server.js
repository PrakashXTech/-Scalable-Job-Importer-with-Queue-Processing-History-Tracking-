// // new code

// require('dotenv').config();
// const app = require('./app');
// const connectDB = require('./config/db');
// const http = require('http');
// const { Server } = require('socket.io');
// const jobWorker = require('./queues/jobWorker');

// connectDB();

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'],
//   }
// });

// // Make io accessible throughout the app
// app.set('io', io);

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// new updated code

require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const http = require('http');
const { Server } = require('socket.io');
const startCron = require('./config/cron');

connectDB();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

app.set('io', io);

startCron(app); // ⏱ Start cron job

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
