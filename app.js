const express = require('express');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const stRoutes = require('./routes/student');
const session = require('express-session');
const bodyParser = require('body-parser');
const mime = require('mime');


const app = express();
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false
}));


// Set the MIME type for CSS files
app.use('*.css', (req, res, next) => {
  res.contentType('text/css');
  next();
});

// Set the MIME type for JavaScript files
app.use('*.js', (req, res, next) => {
  res.contentType('application/javascript');
  next();
});


// app.use(express.static('public'));
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Body parser middleware
app.use(express.json());
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb+srv://root:1234@cluster0.ddjbo47.mongodb.net/user?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas!');
}).catch((error) => {
  console.error('Error connecting to MongoDB Atlas:', error);
});

// Routes
app.use('/', usersRoutes);
app.use('/admin', adminRoutes);
app.use('/student', stRoutes);



app.get('/studentclaim', (req, res) => {
  
  if (req.session.isLoggedIn) {
    res.render('studentclaim')
} else {
    res.redirect('/');
}
  
})

app.get('/studentclaimaff', (req, res) => {
  
  if (req.session.isLoggedIn) {
    res.render('studentclaimaff')
} else {
    res.redirect('/');
}
  
})
// Start the server
app.listen(7000, () => {
  console.log('Server is running on port 7000');
});


