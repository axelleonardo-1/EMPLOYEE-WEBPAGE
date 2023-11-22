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
                if(data.user.userType == 'publisher'){
                    window.location.href = './publisher';
                }
                else{
                window.location.href = './profile';
                }
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

    //--------------------------------------------------------------------------
    // Escuchar el evento del userProfileForm
    // NO FUNCIONA AUN
    document.getElementById('userProfileForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const updatedUserData = {
            avatar: document.getElementById('avatar').value,
            username: document.getElementById('username').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            location: document.getElementById('location').value,
            contactNumber: document.getElementById('contactNumber').value,
            skills: document.getElementById('skills').value,
            education: document.getElementById('education').value,
            workExperience: document.getElementById('workExperience').value,
            // Additional fields can be added here if needed
        };
    
        console.log(updatedUserData);

        // Retrieve the user ID from sessionStorage or another source
        const usuario = sessionStorage.getItem('user');
        const data = JSON.parse(usuario);
        const userId = data._id;
        
        console.log(userId);

        fetch(`http://localhost:3000/user/updateUserProfile/${userId}`, { // Replace with your API endpoint
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUserData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                // Update was successful, you can redirect or inform the user
                console.log('User profile updated:', data);
                window.location.href = './profile';
            } else {
                // Handle the error from the server
                console.error('Failed to update user profile:', data.message);
            }
        })
        .catch(error => {
            console.error('Error during the update process:', error);
        });

    });

});

        


