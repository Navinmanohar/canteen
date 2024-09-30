const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const superAdmin = require('./controller/superAdmin');
const midd = require('./middleware/Cors');

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// CORS Configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'https://your-frontend-domain.com'],  // Your frontend domains
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Use CORS
app.use(cors(corsOptions));
// app.use(midd);

// Middleware: Body-parser to parse incoming JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    superAdmin();
  })
  .catch(err => console.log(`Error connecting to MongoDB: ${err}`));

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const canteenRoutes = require('./routes/canteen');
const feedbackRoutes = require('./routes/feedback');
const analyticsRoutes = require('./routes/analytics');
const paymentRoutes = require('./routes/paymentRoutes');

// Apply routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/canteen', canteenRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/canteen', analyticsRoutes); // Ensure there’s no route conflict
app.use('/api', paymentRoutes);

// Serve static files and root route
app.get('/', (req, res) => {
  res.send('Hello');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
 