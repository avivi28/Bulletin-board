const express = require('express');
const app = express(); //產生express application物件
const { generateUploadURL } = require('./s3');

app.use(express.static('public')); //make css & js file accessible
app.use(express.urlencoded({ extended: true })); //for getting the data sent from client

app.set('view engine', 'ejs'); //view engine = template engine, ejs(embedded js)
app.set('views', 'views');

app.get('/', (req, res) => {
	res.render('index');
}); //homepage

app.get('/s3Url', async (req, res) => {
	const url = await generateUploadURL();
	res.send({ url });
});

// app.post('/images', async (req, res) => {
// 	const file = req.file;
// 	console.log(file);
// 	const result = await uploadFile(file);
// 	console.log(result);
// 	const description = req.body.description;
// 	res.send('successful post to S3!!');
// });

app.listen(5050, function () {
	//port 5050
	console.log('website is located in http://localhost:5050/');
});
