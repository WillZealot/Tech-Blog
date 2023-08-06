async function createNewPost() {
    try {
      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;
  
      const postData = {
        user_id: req.session.userId,
        title: title,
        content: content,
      };
  
      const response = await fetch('/dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Assuming the server responds with a redirect URL after successful post creation
      const responseData = await response.json();
      window.location.href = responseData.redirectUrl; // Redirect to the URL sent by the server
    } catch (error) {
      console.error('Error:', error);
      // Handle error as needed
    }
  }
  
  async function updatePost() {
    try {
      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;
  
      const postData = {
        title: title,
        content: content,
      };
  
      // Get the post ID from the data attribute of the form
      const postId = document.getElementById('updatePostForm').dataset.postId;
  
      const response = await fetch(`/userpost/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Assuming the server responds with a redirect URL after successful post update
      const responseData = await response.json();
      window.location.href = responseData.redirectUrl; // Redirect to the URL sent by the server
    } catch (error) {
      console.error('Error:', error);
      // Handle error as needed
    }
  }
  
  document.querySelector('.editPost').addEventListener('submit', updatePost);
  
  document.querySelector('.addPost').addEventListener('submit', createNewPost);