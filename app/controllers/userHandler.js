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

    // Escuchar el evento submit del formulario de registro
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('passwordLogin').value;
        const contactNumber = document.getElementById('contactNumber').value;
        const location = document.getElementById('location').value;
        const userType = document.querySelector('input[name="userType"]:checked').value;
        
        // Objeto con los valores del formulario de registro
        const registrationData = {
            firstName,
            lastName,
            email,
            password,
            contactNumber,
            location,
            userType
        };

        // Aquí podrías enviar registrationData a tu servidor
        console.log('Registration Data:', registrationData);
    });
});

function createUser(){
    
}
