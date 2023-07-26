const login = async () => {
    const response = await fetch('/api/users', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      res.render('login');
    } else {
      alert('Failed to logIn.');
    }
  };
  
  document.querySelector('#login').addEventListener('click', login);
  