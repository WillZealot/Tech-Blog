async function editUser(event) {
    event.preventDefault();
  
    // Get the value of the updated username input field
    const name = document.querySelector('input[name="username"]').value;
  
    try {
      // Make a PUT request to the server with the updated user data
      const response = await fetch(`dashboard/edituser`, {
        method: 'PUT',
        body: JSON.stringify({
          name,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Check if the response from the server is successful
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        const responseData = await response.json(); // Assuming the server returns JSON error message
        alert(responseData.error || 'An error occurred.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred. Please try again later.');
    }
  }
  
  //"editUser"
  document.querySelector('.editUser').addEventListener('submit', editUser);