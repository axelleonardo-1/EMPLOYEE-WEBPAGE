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
            
            // Si hay un PDF en el perfil del usuario, mostrar una vista previa
            if (data.profile.resume) {
                // Crea un elemento iframe para la vista previa del PDF
                const resumePreview = document.createElement('iframe');
                resumePreview.src = data.profile.resume; // La URL del PDF
                resumePreview.style.width = '100%'; // Ajustar al ancho del contenedor
                resumePreview.style.height = '700px'; // Altura del iframe
                resumePreview.setAttribute('type', 'application/pdf');

                // Ubicar el iframe en el DOM
                const resumeContainer = document.getElementById('resumeContainer'); // Asegúrate de que este ID exista en tu HTML
                resumeContainer.innerHTML = ''; // Limpiar el contenedor si hay algo dentro
                resumeContainer.appendChild(resumePreview);

                // ocultar el campo de carga si no quieres que suban otro CV
                document.getElementById('cvUpload').disabled = true;
            }
        })
        .catch(error => console.error('Error loading the user data:', error));