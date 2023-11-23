
document.addEventListener('DOMContentLoaded', function() {
    // Escuchar el evento submit del formulario de inicio de sesión
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional
        const user = document.getElementById('user').value; password = document.getElementById('passwordSignIn').value;
        // Enviar de usuario y la contraseña al servidor
        fetch('http://localhost:3000/user/login', { // La URL puede variar según la configuración del servidor
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
                // El usuario inició sesión correctamente, proceder con lo siguiente
                sessionStorage.setItem('user', JSON.stringify(data.user));
                if(data.user.userType == 'publisher'){
                    window.location.href = './publisher';
                }
                else{
                window.location.href = './profile';
                }
            } else {
                // Inicio de sesión fallido, manejar error
                console.error('Login failed:', data.message);
            }
        })
        .catch(error => {
            console.error('Error during fetch:', error);
        });
    });
    
    // Escuchar el evento submit del formulario de registro (funcional)
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = {
            username: document.getElementById('username').value,
            password_hash: document.getElementById('passwordLogin').value, // Enviar la contraseña de forma segura y hashearla en el servidor
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

        // Enviar formData al servidor
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
                // Guardar el usuario en sessionStorage y redirigir a su perfil
                sessionStorage.setItem('user', JSON.stringify(data.user));
                // REALIZAR COMPROBACION PARA SABER QUE VENTANA ABRIR EN BASE AL TIPO DE USUARIO
                if(data.user.userType == 'publisher'){
                    window.location.href = './publisher';
                }
                else{
                window.location.href = './profile';
                }
            } else {
                console.error('Error al registrar:', data.message);
            }
            })
            .catch(error => console.error('Error al registrar:', error));
        });


});
//