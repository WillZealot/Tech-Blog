async function deletePost(event) {
  event.preventDefault();

  // Extract the post ID from the current URL
  const id = window.location.toString().split('/').pop();

  // Make a DELETE request to the server to delete the post
  const response = await fetch(`/dashboard/api/userpost/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Check if the response from the server is successful
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to delete the post.');
  }
}

document.querySelector('.deletePost').addEventListener('submit', deletePost);