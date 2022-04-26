const imageForm = document.querySelector('#images_form');
const imageInput = document.querySelector('#image');
const loader = document.getElementById('loader');

function showLoading() {
	loader.style.display = 'block';
}

function hideLoading() {
	loader.style.display = 'none';
}

imageForm.addEventListener('submit', async (event) => {
	showLoading();

	event.preventDefault();
	const form = new FormData(imageForm);
	const commentInput = new URLSearchParams(form);
	const postData = Object.fromEntries(commentInput.entries());
	const commentContent = postData['comment'];
	const bodyData = { comment: commentContent };

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
	}).then((res) => {
		hideLoading();
	});

	await fetch('/comment', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(bodyData),
	});

	const imageUrl = url.split('?')[0];

	const imagePath = imageUrl.split('/')[3];
	const cloudFrontUrl = 'https://d3qxlv297wj1rn.cloudfront.net/' + imagePath;

	//post request to my server to store any extra data
	const comment = document.createElement('p');
	comment.textContent = commentContent;
	comment.className = 'comment';

	const img = document.createElement('img');
	const imgContainer = document.querySelector('.uploadedimage_container');
	img.src = cloudFrontUrl;
	img.className = 'uploadedimage';

	// imgContainer.appendChild(comment);
	// imgContainer.appendChild(img);
	imgContainer.insertBefore(img, imgContainer.firstChild);
	imgContainer.insertBefore(comment, imgContainer.firstChild);
});
