const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
// const { createRequire } = require('module');
// const path = require('path')


dotenv.config();

const app = express();
app.use(cors({
  origin: '*',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



// Use createRequire to dynamically require modules with ES6 import syntax
// const createRequireFn = createRequire(import.meta.url);
// const QuizPlayPagePath = createRequireFn.resolve('../Client/quizzie/src/Pages/Quiz/QuizPlay.jsx');
// const QuizPlayPage = require(QuizPlayPagePath);
const userRoutes = require('./src/routes/user.route.js');
const quizRoute = require('./src/routes/quiz.route.js');
const healthRoute = require('./src/routes/health.route.js');

// Handle the /take/:quizId route to render the QuizPlayPage component
// app.get('/take/:quizId', async (req, res) => {
//   try {
//       const quizId = req.params.quizId;
//       // Fetch quiz data based on quizId (Replace this with your actual fetching logic)
//       const quiz = {
//         title: 'Sample Quiz',
//         questions: [],
//         totalQuestions: 0
//       };
//       // Render the QuizPlayPage component with the fetched quiz data and send the HTML to the client
//       res.render('QuizPlayPage', { quiz });
//   } catch (error) {
//       console.error('Error fetching quiz:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


app.get("/", async (req, res) => {
  res.status(200).json({
    status: "active",
    service: process.env.SERVER,
    time: new Date(),
  });
});

app.use('/api/quiz', quizRoute);
app.use('/api/user', userRoutes);
app.use('/api/health', healthRoute);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(new Date());
});
