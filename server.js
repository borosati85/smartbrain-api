const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = knex({
  client: 'pg',
  version: '11.5',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Passw0rd',
    database : 'smart-brain'
  }
});

app.get('/',(req,res)=>{
	res.json(database.users);
});

app.post('/signin', (req, res) => {signin.handleSignin(req, res, bcrypt, database)});

app.post('/register', (req, res) => {register.handleRegister(req, res, bcrypt, database)});

app.get('/profile/:id',(req, res) => {profile.handleProfile (req, res, database)});

app.put('/image', (req, res) => {image.handleImage (req, res, database)});

app.post('/imageURL', (req, res) => {image.handleApiCall (req, res)})

app.listen(3001,()=>{
	console.log('server is running on port 3001')
});