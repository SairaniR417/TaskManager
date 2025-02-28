import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from './model/user.js';
import Recipe from './model/recipe.js';
// import multer from 'multer';
// import { GridFsStorage } from 'multer-gridfs-storage';
// import { Grid } from 'gridfs-stream';

dotenv.config()

const app = express();
app.use(express.json());

// CORS setup
app.use(cors({
    origin: 'http://localhost:4200',  // Angular frontend URL
    methods: 'GET,POST',
    credentials: true
}));



//connecting to mongoose
const uri = 'mongodb+srv://sairanireddy11:Bangaru123@cluster0.3lqeg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("MongoDB Connected…")
    })
    .catch(err => console.log(err))

// let gfs;
// conn.once('open', () => {
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection('uploads');
// });

// Multer GridFS Storage Configuration
// const storage = new GridFsStorage({
//     url: mongoURI,
//     file: (req, file) => {
//         return {
//             filename: `${Date.now()}-${file.originalname}`,
//             bucketName: 'uploads'
//         };
//     }
// });

// const upload = multer({ storage });

//signup
app.post('/signup', async (req, res) => {
    try {
        let { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }
        username = username.trim();

        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: "Username already exists!" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Username already taken!" });
        }
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        const token = jwt.sign({ id: user._id, email: user.email }, "abcd", { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Logout route
app.get('/logout', (req, res) => {
    res.json({ message: 'Logged out successfully' });
});

app.post('/recipes', async (req, res) => {
    try {
        const newRecipe = new Recipe({
            name: req.body.name,
            category: req.body.category,
            ingredients: {
                main: req.body.main,
                additional: req.body.additional || ''
            },
            instructions: req.body.instructions,
            // image: req.file.filename
        });
        await newRecipe.save();
        res.status(201).json({ message: 'Recipe added successfully', recipe });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));

// // Protect route (Example)
// app.get('/api/profile', (req, res) => {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(403).json({ message: 'Token required' });

//     jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
//         if (err) return res.status(403).json({ message: 'Invalid token' });
//         res.json({ message: 'Profile data', userId: decoded.userId });
//     });
// });

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// })



