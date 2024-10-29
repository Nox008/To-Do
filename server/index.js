const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize the Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (replace with your MongoDB connection string if needed)
mongoose.connect('mongodb://localhost:27017/hobbiesDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Define a schema for the hobby data
const hobbieSchema = new mongoose.Schema({
  hobbie: { type: String, required: true },
  desc: { type: String, required: true },
  date: { type: Date, required: true } ,
},{timestamps:true});

// Create a Mongoose model based on the schema
const Hobbie = mongoose.model('Hobbie', hobbieSchema);

app.get('/', (req, res) => {
    res.send('API is running...');
  });

// Define a POST route to handle the data from the frontend
app.post('/api/hobbies', async (req, res) => {
  const { hobbie, desc, date } = req.body;

  try {
    // Create a new hobbie document and save it to the database
    const newHobbie = new Hobbie({ hobbie, desc, date: new Date(date), });
    await newHobbie.save();
    
    res.status(201).json({ message: 'Hobbie saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving hobbie', error });
  }
});

app.get('/api/gettodolist', async (req,res) => {
  const todolist = await Hobbie.find()
  todolist.length>0?res.json(todolist):res.json([])
})

app.delete('/api/delTodolist/:id', async(req,res)=>{
  const idno = req.params.id;
  console.log(idno)
  await Hobbie.deleteOne({_id:idno})
  res.json("Data has been deleted")
})

// Set the server to listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
