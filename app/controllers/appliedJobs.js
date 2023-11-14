 // No funciona
fetch(`/app/data/userExample.json`) // Cambia la URL al endpoint correcto donde se alojan los datos de los usuarios
    .then(response => response.json())
    .then(user => {
        const appliedJobs = user.profile.applications; // Asume que 'applications' es un array de IDs de trabajo
        const container = document.getElementById('applied-jobs-container');
        container.innerHTML = ''; // Limpia el contenedor antes de añadir contenido nuevo

        appliedJobs.forEach(jobId => {
            // Aquí necesitas obtener los detalles del trabajo utilizando 'jobId'
            fetch(`/app/data/jobLists/${jobId}.json`) // Cambia la URL al endpoint correcto donde se alojan los detalles de los trabajos
                .then(response => response.json())
                .then(job => {
                    // 'job' contiene los detalles del trabajo
                    const jobElement = document.createElement('div');
                    jobElement.className = 'job-details';
                    jobElement.innerHTML = createJobDetailHTML(job);
                    container.appendChild(jobElement);
                })
                .catch(error => {
                    console.error('Error loading job details:', error);
                });
        });
    })
    .catch(error => {
        console.error('Error loading user applications:', error);
    });

function createJobDetailHTML(job) {
    // Construye el HTML con todos los detalles del trabajo
    return `
        <div>
            <h2>${job.title}</h2>
            <p>${job.description}</p>
            <!-- Agrega aquí más detalles según sea necesario -->
        </div>
    `;
}

function getCurrentUserId() {
    // Esta función debería obtener el ID del usuario actual de alguna manera,
    // ya sea a través de cookies, almacenamiento local, o la URL.
    return 'some-user-id'; // Ejemplo de ID de usuario
}


// Función para simular la obtención de aplicaciones de usuario
function fetchUserApplications() {
    // Esta es una función simulada. Debes reemplazarla con la lógica real para obtener las aplicaciones del usuario.
    return Promise.resolve([/* array de IDs de trabajos a los que el usuario ha aplicado */]);
}
