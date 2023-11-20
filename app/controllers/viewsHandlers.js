document.addEventListener('DOMContentLoaded', (event) => {
  const profileLink = document.getElementById('profileLink');

      profileLink.addEventListener('click', (event) => {
      event.preventDefault(); // Evitar que el enlace navegue de manera predeterminada

      // Comprobar si hay un usuario en sessionStorage
      const user = sessionStorage.getItem('user');

      // Si hay un usuario, navega a userProfile.html, si no, a userLogin.html
      if (user) {
          window.location.href = './userProfile.html';
      } else {
          window.location.href = './userLogin.html';
      }
  });
});

  