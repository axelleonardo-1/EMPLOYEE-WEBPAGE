window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('userProfileForm').addEventListener('submit', function(event) {
        document.getElementById('cargando').style.display = 'block';
        document.getElementById('cargando').style.display = 'flex';
        document.getElementById('cargando').style.top = 0;
        document.getElementById('cargando').style.bottom = 0;
        document.getElementById('cargando').style.right = 0;
        document.getElementById('cargando').style.left = 0;
        document.getElementById('cargando').style.right = 0;

        event.preventDefault();
        const user = sessionStorage.getItem('user');
        const userProfile = JSON.parse(user);
        const id = userProfile._id;

        const updatedUserData = {
            profile:{
                avatar: document.getElementById('avatar').value,
                skills: document.getElementById('skills').value,
                education: document.getElementById('education').value,
                workExperience: document.getElementById('workExperience').value,
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                location: document.getElementById('location').value,
                contactNumber: document.getElementById('contactNumber').value,
            }
            // Se pueden agregar campos adicionales aquí si es necesario
        };

        fetch(`http://localhost:3000/user/updateProfile/${id}`, {
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
            if (data.success == true ) {
                document.getElementById('cargando').style.display = 'none';
                document.getElementById('cargando').style.display = 'flex';
                document.getElementById('cargando').style.top = 0;
                document.getElementById('cargando').style.bottom = 0;
                document.getElementById('cargando').style.right = 0;
                document.getElementById('cargando').style.left = 0;
                document.getElementById('cargando').style.right = 0;

                setTimeout(() => {
                    
                    // Suponiendo que 'data' contiene el objeto 'user' actualizado que viene desde el servidor.
                    sessionStorage.setItem('user', JSON.stringify(data.user));

                    console.log('User profile updated and saved to sessionStorage');
                    window.location.href = './profile';
                    // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito si lo deseas.

                },1000);
            }
            else {
                alert('no fue exitoso');
            }

        })
        .catch(error => {
            console.error('Error during the update process:', error);
        });

    });
});
