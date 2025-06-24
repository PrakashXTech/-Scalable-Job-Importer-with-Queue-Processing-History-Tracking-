const cors = require('cors');

const express = require('express');
const app = express();
const jobRoutes = require('./routes/jobRoutes');
const importLogRoutes = require('./routes/importLogRoutes');
const errorHandler = require('./middlewares/errorHandler');

app.use(cors());

app.use(express.json());
app.get("/",(res,req)=>{
    res.json({msg:"welcome to jobqueue"})
})
app.use('/api/jobs', jobRoutes);
app.use('/api/import-logs', importLogRoutes);
app.use(errorHandler);

module.exports = app;
