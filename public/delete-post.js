async function deletePost(event) {
    event.preventDefault(); 
    // Extract the post ID from the current URL
    const id = window.location.toString().split('/')[ 
      window.location.toString().split('/').length - 1 
    ];
  
    // Make a PUT request to the server with the updated post data
    const response = await fetch(`/dashboard/userpost/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        title,
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    // Check if the response from the server is successful 
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  
  document.querySelector('.deletePost').addEventListener('submit', deletePost);