const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()

const app = express();
app.use(cors({
  origin: '*',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  credentials: true,
}));
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true}));



mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
});
app.options('*', cors());

app.post('/your-endpoint', (req, res) => {
    console.log('Request Headers:', req.headers);
    console.log('Raw Body:', req.rawBody); // Log the raw body
    console.log('Parsed Body:', req.body);
  
});

 const userRoutes = require('./src/routes/user.route.js');
 const quizRoute = require('./src/routes/quiz.route.js')
const healthRoute = require('./src/routes/health.route.js');

app.get("/", async(req, res) =>{
    res.status(200).json({
        status: "active",
        service: process.env.SERVER,
        time: new Date(),
    })
});
app.use('/api/quiz', quizRoute);
 app.use('/api/user', userRoutes);
app.use('/api/health', healthRoute);


app.use(express.static("public")); 

const port =process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`server run at http://localhost:${port}`);
    console.log(new Date());
})
