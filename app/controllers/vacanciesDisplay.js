window.addEventListener('DOMContentLoaded', (event) => {

    const publisher = sessionStorage.getItem("user");
    if (!publisher) {
        console.error('No se encontró información del editor en sessionStorage.');
        return; // Asegúrate de manejar este caso adecuadamente
    }
    
    const publisherData = JSON.parse(publisher);
    const publisherId = publisherData._id;

    fetch(`http://localhost:3000/jobs/vacancies?publisherId=${publisherId}`)
    .then(response => response.json())
    .then(jobs => {
        jobs.forEach(job => {
            createJobCard(job);
        });

        console.log(jobs);
        console.log("Entrega Jobs");
    })
    .catch(error => {
        console.error('Error fetching jobs:', error);
    });

    function createJobCard(job) {
        const container = document.getElementById('vacancies-container');
        const card = document.createElement('div');
        card.className = 'vacancy-card';
    
        const details = document.createElement('div');
        details.className = 'vacancy-details';

        // Generar el HTML para los enlaces de peopleInterested
        let peopleInterestedHTML = 'None';
        if (job.peopleInterested && job.peopleInterested.length > 0) {
            peopleInterestedHTML = job.peopleInterested.map(id => 
                `<a class="applier-link" data-id="${id}">${id}</a>`
            ).join(', '); // Separa los enlaces con comas
        }

        details.innerHTML = `
            <h2>${job.title} - ${job.company.name}</h2>
            <p>Description: ${job.description}</p>
            <p>Requirements: ${job.requirements}</p>
            <p>Skills: ${job.skills}</p>
            <p>Salary Range: $${job.salaryRange.min} - $${job.salaryRange.max}</p>
            <p>Job Type: ${job.jobType}</p>
            <p>Location: ${job.location}</p>
            <p>People Interested: ${peopleInterestedHTML}</p>
            <button class="btn-delete" data-id="${job._id}">Delete</button>
            <button class="btn-update" data-id="${job._id}">Update</button>
        `;

    
        card.appendChild(details);
        container.appendChild(card);
    }
    
    // Delega el evento click al contenedor de vacancies-container
    const container = document.getElementById('vacancies-container');
    container.addEventListener('click', function(event) {
        // Delegación para el botón de eliminar
        if (event.target.classList.contains('btn-delete')) {
            event.preventDefault();
            const jobId = event.target.getAttribute('data-id');
            console.log('Delete button clicked with data-id:', jobId);

            fetch(`http://localhost:3000/jobs/delete/${jobId}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Registro eliminado exitosamente: " + data.message);
                    window.location.reload(); // o la lógica de actualización que prefieras
                } else {
                    alert('Error al eliminar el registro: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error en la petición fetch:', error);
            });
        }

        // Delegación para el botón de actualizar
        if (event.target.classList.contains('btn-update')) {
            event.preventDefault();
            // Obtener el valor de data-id del botón que fue clickeado
            const jobId = event.target.getAttribute('data-id');
            console.log('Delete button clicked with data-id:', jobId);
            
            // Realizar la solicitud GET al servidor para obtener los detalles del trabajo
            fetch(`http://localhost:3000/jobs/busqueda/${jobId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(jobDetails => {
                    // Guardar los detalles del trabajo en sessionStorage
                    sessionStorage.setItem('jobToUpdate', JSON.stringify(jobDetails.job));
                    window.location.href = './updateVacant';
                })
                .catch(error => {
                    console.error('Error fetching job details:', error);
                });
        }


        // para los links de applier cuando se realizen los clicks
        if (event.target.classList.contains('applier-link')) {
            event.preventDefault();
            const applierId = event.target.getAttribute('data-id');
            
            fetch(`http://localhost:3000/user/profile/${applierId}`) // Asegúrate de que esta URL es correcta
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(applierDetails => {
                // Almacena los detalles del aplicante en sessionStorage
                sessionStorage.setItem('selectedApplier', JSON.stringify(applierDetails));
                // Redirige a la página del perfil del aplicante
                window.location.href = './applierProfile';
            })
            .catch(error => {
                console.error('Error fetching applier details:', error);
            });
        }

    });
});
