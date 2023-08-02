const logout = async () => {
    const response = await fetch('/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log out.');
    }
  };
  
  let logoutTimeout;
  
  const resetLogoutTimer = () => {
    clearTimeout(logoutTimeout);
    logoutTimeout = setTimeout(logout, 60000); // 1 minute timeout
  };
  
  document.addEventListener('click', () => {
    resetLogoutTimer();
  });
  
  document.addEventListener('keydown', () => {
    resetLogoutTimer();
  });
  
  document.querySelector('#logout').addEventListener('click', logout);