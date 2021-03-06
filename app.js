const express = require('express');
const app = express(); //產生express application物件

const port = process.env.PORT;

const { generateUploadURL } = require('./model/s3');
const { insertComment } = require('./model/queryDB');

app.use(express.static('public')); //make css & js file accessible
app.use(express.urlencoded({ extended: true })); //for getting the data sent from client
app.use(express.json());

app.set('view engine', 'ejs'); //view engine = template engine, ejs(embedded js)
app.set('views', 'views');

app.get('/', (req, res) => {
	res.render('index');
}); //homepage

app.get('/s3Url', async (req, res) => {
	const url = await generateUploadURL();
	res.send({ url });
}); //get secure url from s3 & return to frontend

app.post('/comment', async (req, res) => {
	const inputComment = req.body.comment;
	await insertComment(inputComment);
	res.send('successfully inserted the comment data into DB!!');
}); //insert comment into RDS

app.listen(port, '0.0.0.0', function () {
	console.log('website is located in http://localhost:' + port + '/');
});
