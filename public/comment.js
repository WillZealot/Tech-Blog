async function createNewComment() {
    try {
      const content = document.getElementById('comment-body').value;
  
      const commentData = {
        comment_content: content, 
      };
  
      const response = await fetch('/post/:id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Assuming the server responds with a redirect URL after successful comment creation
      const responseData = await response.json();
      window.location.href = responseData.redirectUrl; // Redirect to the URL sent by the server
    } catch (error) {
      console.error('Error:', error);
      // Handle error as needed
    }
  }
  
  document.querySelector('.comment-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    await createNewComment(); // Call the function to create a new comment
  });