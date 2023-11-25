document.addEventListener('DOMContentLoaded', (event) => {
    const user = sessionStorage.getItem('user');
    const userData = JSON.parse(user);
    const applications = userData.profile.applications;

    if(applications.length == 0){
        console.log('No hay aplicaciones para mostrar.');
        return; // Si no hay aplicaciones, detén la ejecución aquí.
    }

    let applicationList = []; // Aquí almacenaremos los registros que se extraigan con el jobId
    
    // Uso de Promise.all para esperar a que todas las peticiones fetch se completen
    Promise.all(applications.map(app => {
        let jobId = app.id;
        return fetch(`http://localhost:3000/jobs/userApplications/${jobId}`)
            .then(response => response.json())
            .then(job => applicationList.push(job))
            .catch(error => console.error('Error fetching jobs:', error));
    })).then(() => {
        console.log("TRABAJOS");
        console.log(applicationList);

        const applicationsContainer = document.getElementById('applications-container');
        
        applicationList.forEach(job => {
            // Aquí construyes el HTML para cada tarjeta de vacante
            const jobCardHTML = `
            <div class="vacancy-card">
                <div class="vacancy-details">
                    <h2>${job.title} - ${job.company.name}</h2>
                    <p>Description: ${job.description}</p>
                    <p>Requirements: ${job.requirements}</p>
                    <p>Skills: ${job.skills}</p>
                    <p>Salary Range: $${job.salaryRange.min} - $${job.salaryRange.max}</p>
                    <p>Job Type: ${job.jobType}</p>
                    <p>Location: ${job.location}</p> 
                </div>
            </div>
            `;
            // Agrega la tarjeta al contenedor
            applicationsContainer.insertAdjacentHTML('beforeend', jobCardHTML);
        });
    });
});
