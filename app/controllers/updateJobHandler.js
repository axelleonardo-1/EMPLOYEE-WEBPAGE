window.addEventListener('DOMContentLoaded', (event) => {
    // Asegúrate de que el 'jobToUpdate' está en sessionStorage
    const jobToUpdate = JSON.parse(sessionStorage.getItem('jobToUpdate'));

    if (jobToUpdate) {
        // Establece los valores de los detalles del trabajo
        document.getElementById('title').value = jobToUpdate.title || '';
        document.getElementById('description').value = jobToUpdate.description || '';
        document.getElementById('requirements').value = jobToUpdate.requirements || '';
        document.getElementById('skills').value = jobToUpdate.skills || '';
        document.getElementById('minSalary').value = jobToUpdate.salaryRange ? jobToUpdate.salaryRange.min : '';
        document.getElementById('maxSalary').value = jobToUpdate.salaryRange ? jobToUpdate.salaryRange.max : '';
        document.getElementById('jobType').value = jobToUpdate.jobType || '';
        document.getElementById('location').value = jobToUpdate.location || '';

        // Establece los valores de los detalles de la empresa
        document.getElementById('companyName').value = jobToUpdate.company ? jobToUpdate.company.name : '';
        document.getElementById('companyDescription').value = jobToUpdate.company ? jobToUpdate.company.description : '';
        document.getElementById('companyLogo').value = jobToUpdate.company ? jobToUpdate.company.logo : '';
    } else {
        console.error('No job details found in sessionStorage.');
        // Manejar la falta de datos, por ejemplo, redirigiendo al usuario a una página diferente
    }

    // Manejar la lógica de actualización del formulario
    const updateJobForm = document.getElementById('updateJobForm');
    updateJobForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // Obtener los valores de los campos del formulario
        const formData = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            requirements: document.getElementById('requirements').value,
            skills: document.getElementById('skills').value,
            salaryRange: {
                min: document.getElementById('minSalary').value,
                max: document.getElementById('maxSalary').value,
            },
            jobType: document.getElementById('jobType').value,
            location: document.getElementById('location').value,
            company: {
                name: document.getElementById('companyName').value,
                description: document.getElementById('companyDescription').value,
                logo: document.getElementById('companyLogo').value,
            }
        };

        // Extraer el _id del trabajo a actualizar de sessionStorage
        const jobToUpdate = JSON.parse(sessionStorage.getItem('jobToUpdate'));

        if (jobToUpdate && jobToUpdate._id) {
            fetch(`http://localhost:3000/jobs/updateJob/${jobToUpdate._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Job updated successfully:', data);
                    window.location.href = './myVacants';
                    // Aquí puedes redirigir o actualizar la interfaz de usuario como sea necesario
                } else {
                    console.error('Error updating job:', data.message);
                }
            })
            .catch(error => {
                console.error('Error during fetch:', error);
            });
        } else {
            console.error('No job ID found in sessionStorage.');
        }

    });
});
