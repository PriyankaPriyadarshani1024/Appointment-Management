const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// 👇 This is what fixes the "Cannot GET /" issue
app.get('/', (req, res) => {
  res.send('API is running ✅');
});

app.use('/appointment', require('./routes/appointmentRoutes'));

const PORT = process.env.PORT || 5000; // ✅ Not a URL
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

