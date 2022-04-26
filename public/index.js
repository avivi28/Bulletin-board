const imageForm = document.querySelector('#images_form');
const imageInput = document.querySelector('#image');

imageForm.addEventListener('submit', async (event) => {
	event.preventDefault();
	const file = imageInput.files[0];

	//get secure url from my server
	const { url } = await fetch('/s3Url').then((res) => res.json());

	//post the image directly to the s3 bucket
	await fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': 'multipart/form-data',
		},
		body: file,
	});

	const imageUrl = url.split('?')[0];

	const imagePath = imageUrl.split('/')[3];
	const cloudFrontUrl = 'https://d3qxlv297wj1rn.cloudfront.net/' + imagePath;

	//post request to my server to store any extra data
	const img = document.createElement('img');
	img.src = cloudFrontUrl;
	img.style = 'width:300px';
	document.body.appendChild(img);
});
