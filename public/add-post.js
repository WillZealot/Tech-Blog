async function createNewPost() {
  try {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const postData = {
      title: title,
      content: content,
    };

    const response = await fetch('/dashboard/api/createpost', { // Adjust the endpoint URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Redirect to a URL of your choice after successful post creation
    redirect('/dashboard'); // Redirect to the dashboard or another relevant page
  } catch (error) {
    console.error('Error:', error);
    // Handle error as needed
  }
}

document.querySelector('.addPost').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission
  createNewPost();
});