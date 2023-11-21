document.addEventListener('DOMContentLoaded', function() {
    
    // Escuchar el evento submit del formulario de inicio de sesión
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional
        const user = document.getElementById('user').value;
        const password = document.getElementById('passwordSignIn').value;
        
        // Send the username and password to the server
        fetch('http://localhost:3000/user/login', { // The URL may differ based on your server setup
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                // The user is logged in successfully, proceed further
                sessionStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = './profile';
            } else {
                // Login failed, handle error
                console.error('Login failed:', data.message);
            }
        })
        .catch(error => {
            console.error('Error during fetch:', error);
        });
    });
    
    // ---------------------------------------------------------
    // Escuchar el evento submit del formulario de registro (funcional)
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = {
            username: document.getElementById('username').value,
            password_hash: document.getElementById('passwordLogin').value, //enviar la contraseña de forma segura y hashearla en el servidor
            email: document.getElementById('email').value,
            userType: document.querySelector('input[name="userType"]:checked').value,
            profile: {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                contactNumber: document.getElementById('contactNumber').value || null,
                location: document.getElementById('location').value || null,
                // Los campos como avatar, resume, skills, education, workExperience y aplications inicialmente estarán vacíos o nulos
            }
        };
    
        console.log('Registration Data:', formData);

        // Envía formData al servidor
        fetch('http://localhost:3000/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Guarda el usuario en sessionStorage y redirige a su perfil
                sessionStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = './profile';
            } else {
                console.error('Error al registrar:', data.message);
            }
            })
            .catch(error => console.error('Error al registrar:', error));
        });
        
    });


