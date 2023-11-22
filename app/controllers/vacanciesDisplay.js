// Here we need to show the vacancies applies

window.addEventListener('DOMContentLoaded', (event) => {

    // realizar una ruta fetch donde se extraiga todos los datos que contengan el employerId
    // dentro de aqui enviaremos en el req solamente el id del user registrado en el sessionStorage
    // la ruta get de user.js se encarga de extraer los datos y enviar el data
    // en el response realizamos un mapeado de todos los resultados encontrados por ese id de nuestra base de datos
    // implementamos las cards en el html con los valores arrojados de la ruta get

    const publisher = sessionStorage.getItem("user");
    const publisherData = JSON.parse(publisher);
    const publisherId = publisherData._id;

    fetch(`http://localhost:3000/jobs/vacancies?publisherId=${publisherId}`)
    .then(response => response.json())
    .then(jobs => {
        // Assuming you have a function to create a card from a job object
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
        details.innerHTML = `
            <h2>${job.title} - ${job.company.name}</h2>
            <p>Description: ${job.description}</p>
            <p>Requirements: ${job.requirements}</p>
            <p>Skills: ${job.skills}</p>
            <p>Salary Range: $${job.salaryRange.min} - $${job.salaryRange.max}</p>
            <p>Job Type: ${job.jobType}</p>
            <p>Location: ${job.location}</p>
            <p>People Interested: ${job.peopleInterested && job.peopleInterested.length > 0 ? job.peopleInterested.length : 'None'}</p>
        `;
    
        const actions = document.createElement('div');
        actions.className = 'vacancy-actions';
        actions.innerHTML = `
            <button class="btn-delete">Delete</button>
            <button class="btn-delete" style="background-color: #2C5FDD;">Update</button>
        `;
    
        card.appendChild(details);
        card.appendChild(actions);
        container.appendChild(card);
    }
    

    // //ESTABLECER LOGICA DE LOS BOTONES
    // // Add event listeners to the buttons
    // actions.querySelector('.btn-delete').addEventListener('click', function() {
    //     // Add logic to handle the delete action
    //     //BORRAR
    // });

    // actions.querySelector('.btn-delete').addEventListener('click', function() {
    //     // Add logic to handle the reject action
    //     // RECHAZAR
    // });

});