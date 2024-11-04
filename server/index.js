const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const upload = require('./multer/user'); // Adjust the path as needed
const User = require('./models/userModel'); // Import the User model

// Initialize the Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve static files from "uploads" folder

// Connect to MongoDB (replace with your MongoDB connection string if needed)
mongoose.connect('mongodb://localhost:27017/hobbiesDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Define a schema for the hobby data (existing schema)
const hobbieSchema = new mongoose.Schema({
  hobbie: { type: String, required: true },
  desc: { type: String, required: true },
  date: { type: Date, required: true },
  imageUrl: { type: String },
}, { timestamps: true });

const Hobbie = mongoose.model('Hobbie', hobbieSchema);

// Route to retrieve all hobbies
app.get('/', (req, res) => {
  res.send('API is running...');
});

// POST route to handle hobby data with file upload
app.post('/api/hobbies', upload.single('images'), async (req, res) => {
  const { hobbie, desc, date } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const newHobbie = new Hobbie({ hobbie, desc, date: new Date(date), imageUrl });
    await newHobbie.save();
    res.status(201).json({ message: 'Hobbie saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving hobbie', error });
  }
});

// Endpoint to retrieve all hobbies
app.get('/api/gettodolist', async (req, res) => {
  const todolist = await Hobbie.find();
  res.json(todolist.length > 0 ? todolist : []);
});

// Endpoint to delete a hobby by ID
app.delete('/api/delTodolist/:id', async (req, res) => {
  const idno = req.params.id;
  await Hobbie.deleteOne({ _id: idno });
  res.json("Data has been deleted");
});

// User registration route with bcrypt password hashing
app.post('/user/register', upload.single('images'), async (req, res) => {
  const { fullname, email, password } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (!fullname || !email || !password) {
    return res.status(400).json("All fields are required");
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json("Email already exists");
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({ fullname, email, password: hashedPassword, imageUrl });
    await newUser.save();

    res.status(201).json("User registered successfully");
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

// Set the server to listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
