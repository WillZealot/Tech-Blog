async function commentFormHandler(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  try {
    // Get the value of the comment text input field and remove leading/trailing whitespace
    const comment_content = document.querySelector('textarea[name="content"]').value.trim();

    // Extract the post_id from the current URL
    const post_id = window.location.toString().split('/').pop(); // Get the last element (post_id)

    // Check if the comment_content is not empty
    if (comment_content) {
      // Make a POST request to the server with the comment data
      const response = await fetch(`/api/post/${post_id}`, {
        method: 'POST',
        body: JSON.stringify({
          post_id,
          comment_content : comment_content,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Check if the response from the server is successful 
      if (response.ok) {
        document.location.reload(); // Reload the page to show the new comment
      } else {
        alert(response.statusText);
      }
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Replace '.comment-form' with the actual class of your comment form
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);