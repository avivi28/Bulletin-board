const imageForm = document.querySelector('#images_form');
const imageInput = document.querySelector('#image');

imageForm.addEventListener('submit', async (event) => {
	event.preventDefault();
	const file = imageInput.files[0];

	//get secure url from my server
	const { url } = await fetch('/s3Url').then((res) => res.json());
	console.log(url);

	//post the image directly to the s3 bucket
	await fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': 'multipart/form-data',
		},
		body: file,
	});

	const imageUrl = url.split('?')[0];
	console.log(imageUrl);
	//post request to my server to store any extra data
});
