document.addEventListener('DOMContentLoaded', function() {
    
    // Escuchar el evento submit del formulario de inicio de sesión
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional
        const user = document.getElementById('user').value;
        const password = document.getElementById('passwordSignIn').value;
        
        // Aquí podrías hacer algo con los valores, como enviarlos a tu servidor
        console.log('User:', user);
        console.log('Password:', password);
    });

    // ---------------------------------------------------------
    // Escuchar el evento submit del formulario de registro
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();
    
        const formData = {
            username: document.getElementById('email').value.split('@')[0], // Ejemplo de generación de username
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
    
        // Envía formData al servidor
        fetch('/register', {
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
                window.location.href = './userProfile.html';
            } else {
                console.error('Error al registrar:', data.message);
            }
            })
            .catch(error => console.error('Error al registrar:', error));
        });
        console.log('Registration Data:', formData);
    });


