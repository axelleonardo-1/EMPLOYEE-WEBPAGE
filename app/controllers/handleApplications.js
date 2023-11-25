window.addEventListener('DOMContentLoaded', async (event) => {
    const user = sessionStorage.getItem('user');
    const userData = JSON.parse(user);
    const applications = userData.user.profile.applications;

    if(applications.length == 0){
        
    let applicationList = []; // Aquí almacenaremos los registros que se extraigan con el jobId
    
    for (const app of applications) {
        let jobId = app.id;
        try {
            const response = await fetch(`http://localhost:3000/jobs/userApplications/${jobId}`);
            const jobs = await response.json();
            applicationList.push(jobs);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    }
    
    console.log("TRABAJOS");
    console.log(applicationList);
    
    // Mover este bloque dentro del loop y realizar las operaciones DOM después de cargar los trabajos
    const applicationsContainer = document.getElementById('applications-container');
    
    for (const job of applicationList) {
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
    }
    }
    
});
