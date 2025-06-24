🚀 Scalable Job Importer with Queue Processing & History Tracking
This project is a scalable job importer system that integrates multiple external XML APIs, converts the data to JSON, processes them through a Redis-based background queue using Bull, and stores them in MongoDB. The system also tracks detailed import logs and provides a frontend admin interface built with Next.js for visualizing import history.

📁 Project Structure

/client       // Frontend (Next.js - Admin UI)
/server       // Backend (Node.js + Express + Mongoose + Bull)

🧠 Key Features
🔁 Scheduled Job Fetching every hour via cron jobs

🌐 Multi-source XML API Integration and conversion to JSON

🧵 Queue-based Background Processing with Redis + Bull

💾 Import History Logging with status tracking

📊 Admin Dashboard (Next.js) to monitor import logs

🛠️ Built with scalability and modular design in mind

🔧 Tech Stack
Layer	Technology
Frontend	Next.js
Backend	Node.js + Express
Database	MongoDB + Mongoose
Queue	Redis + Bull (Queue processor)
DevOps	Docker (Optional), Vercel/Render

🛎️ How It Works
🗂️ APIs Consumed:
https://jobicy.com/?feed=job_feed

🔄 Job Fetching & Conversion:
A service fetches XML from multiple APIs.

Converts XML → JSON using xml2js.

Jobs are deduplicated and pushed into a Redis queue.

🚚 Queue + Worker:
Bull-based worker processes jobs.

Imports data into MongoDB:

New jobs: inserted

Existing jobs: updated

Errors: captured as failed

Configurable concurrency and batch size

🧾 Import History:
For every import run, the following is logged in import_logs:

timestamp

totalFetched

newJobs

updatedJobs

failedJobs (with reasons)

🖥️ Admin UI (Next.js)
A minimal dashboard that shows:

Feed (API URL)

Total Jobs Processed

New, Updated, and Failed jobs count

Timestamp

📦 Setup Instructions
Prerequisites
Node.js

Redis

MongoDB (Atlas or Local)

(Optional) Docker

🔧 Backend Setup (/server)
bash
Copy
Edit
cd server
npm install
cp .env.example .env  # Add your MongoDB URI and Redis config

# Start the server
npm start
🌐 Frontend Setup (/client)
bash
Copy
Edit
cd client
npm install
npm run dev
🔁 Cron Job
bash
Copy
Edit
# To run the job fetching manually
node scripts/fetch-jobs.js

# Or use node-cron for auto every 1 hour (already setup)
🌍 Deployment
Frontend can be deployed to Vercel

Backend can be deployed to Render, Heroku, or Docker

MongoDB Atlas + Redis Cloud recommended for production

📈 Bonus Implementations (✅ if done)
✅ Real-time updates (optional: Socket.io/SSE)

✅ Retry logic with exponential backoff

✅ Configurable concurrency & batch size

🚀 Docker / Render / Vercel setup (optional)

📝 Assumptions
Jobs are considered "existing" based on unique ID/title.

External APIs are stable and provide valid XML responses.

Failures are logged without halting the whole process.

📄 Documentation
Check /docs/architecture.md for:

Architecture overview

Visual diagrams

Tech decisions

Tradeoffs and scalability ideas

🧪 Tests
(Optional: Mention if unit/integration tests are present or planned)

👨‍💻 Author
Developed by Prakash Sharma
GitHub: [github.com/PrakashXTech]
