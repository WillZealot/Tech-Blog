const signup = async () => {
    const response = await fetch('/api/users/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to signup.');
    }
  };
  
  document.querySelector('#signup').addEventListener('click', signup);