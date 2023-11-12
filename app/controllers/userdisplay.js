fetch('/app/data/userExample.json')
        .then(response => response.json())
        .then(data => {
            // Asumiendo que 'data' es el objeto que contiene la información del usuario
            // Establecer los valores predeterminados para los campos del formulario
            document.getElementById('username').value = data.username;
            document.getElementById('firstName').value = data.profile.firstName;
            document.getElementById('lastName').value = data.profile.lastName;
            document.getElementById('location').value = data.profile.location;
            document.getElementById('contactNumber').value = data.profile.contactNumber;
            document.getElementById('userAvatar').src = data.profile.avatar;
            document.getElementById('avatar').value = data.profile.avatar;
            document.getElementById('skills').textContent = data.profile.skills;
            document.getElementById('education').textContent = data.profile.education;
            document.getElementById('workExperience').textContent = data.profile.workExperience;
            //Falta darle value a todos los elements para al hacer save no se borre

        })
        .catch(error => console.error('Error loading the user data:', error));