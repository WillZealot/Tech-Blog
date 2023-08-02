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
  
async function deletePost() {
    try {

    } catch (err) {

    }
}  
  


  document.querySelector('.addPost').addEventListener('submit', createNewPost);

  document.querySelector('#deletePostBtn').addEventListener('submit', deletePost);