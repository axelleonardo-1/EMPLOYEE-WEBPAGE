
window.addEventListener('DOMContentLoaded', (event) => {
    fetch('http://localhost:3000/jobs/allJobs')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(jobs => {
            displayJobs(jobs)
        })
        .catch(error => {
            console.error('Error fetching jobs:', error);
        });
});

function createJobCard(job) {
    return `
    <link rel="stylesheet" href="/styles/joblistStyle.css">
    <div class="col-md-6 mb-4">
        <div class="card">
            <div class="row no-gutters">
                <div class="col-md-4 d-flex align-items-center justify-content-center">
                    <img src="${job.company.logo}" class="card-img p-2" alt="${job.company.name} Logo">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${job.title}</h5>
                        <p class="card-text">${job.description}</p>
                        <h6 class="card-subjects">Requirements:</h6>
                        <ul>${job.requirements}</ul>
                        <h6>Skills:</h6>
                        <ul>${job.skills}</ul>
                        <p class="card-text"><small class="text-muted">Job Type: ${job.jobType}</small></p>
                        <p class="card-text"><small class="text-muted">Location: ${job.location}</small></p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 text-center">
                    <button class="btn btn-primary mb-2 apply-btn" data-id="${job._id}">Details</button>
                </div>
            </div>
        </div>
    </div>
    `;
}


 // ADAPTAR BOTON DE DETALLES COMO POR EJEMPLO COMPROBAR SI HAY UN USUARIO EN CASO CONTRARIO DE QUE NO HAYA USUARIO REDIRECCIONAR

function displayJobs(jobs) {
    const jobsContainer = document.getElementById('jobs-container');
    const rows = jobs.map(job => createJobCard(job)).join('');
    jobsContainer.innerHTML = `<div class="row">${rows}</div>`;  
    // Agrega event listeners a los botones Apply
    document.querySelectorAll('.apply-btn').forEach(button => {
        button.addEventListener('click', function() {
            const jobId = this.getAttribute('data-id');
            //GUARDA EL VALOR DE ID DEL TRABAJO

            detailButton(jobId);
        });
    });
}

function fetchJobDetails(jobId) {
    fetch(`http://localhost:3000/jobs/details/${jobId}`) // Use your server's URL
        .then(response => {

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(job => {
            window.location.href = './vacancyDetails'
            displayJobDetails(job);
        })
        .catch(error => {
            console.error('Error fetching job details:', error);
        });
}

function applyToJob(event) {
    event.preventDefault();
    const jobId = this.getAttribute('data-id');
    const user = sessionStorage.getItem('user');
    
    if (!user) {
        alert('Por favor, inicia sesión primero.');
        window.location.href = "./login";
        return;
    }

    const userProfile = JSON.parse(user);
    const applications = userProfile.profile.applications;
    const userId = userProfile._id;

    // Verificar si ya se ha aplicado a este trabajo
    const hasApplied = applications.some(application => application.id === jobId);
    if (hasApplied) {
        alert('Ya te has aplicado a este trabajo');
        return;
    }

    // Si no se ha aplicado, realizar las operaciones
    applyToJobPosting(userId, jobId);
    applyToUser(userId, jobId);
}

function applyToUser(userId, jobId) {
    // Actualizar las aplicaciones del usuario
    fetch(`http://localhost:3000/user/apply/${jobId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Usuario actualizado con éxito:', data);
            updateSessionStorageUser(data);
            window.location.href = './jobsApplied';
        } else {
            console.error('Error al aplicar al trabajo:', data.message);
        }
    })
    .catch(error => {
        console.error('Error durante el proceso de aplicación:', error);
    });
}

function applyToJobPosting(userId, jobId) {
    // Actualizar las aplicaciones en la publicación de trabajo
    fetch(`http://localhost:3000/jobs/apply/${jobId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId }) // Asegúrate de que esto coincida con lo que tu backend espera
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Trabajo actualizado con éxito:', data);
        } else {
            console.error('Error al aplicar al trabajo:', data.message);
        }
    })
    .catch(error => {
        console.error('Error durante el proceso de aplicación:', error);
    });
}

function updateSessionStorageUser(updatedUser) {
    // Actualizar la información del usuario en sessionStorage
    sessionStorage.setItem('user', JSON.stringify(updatedUser));
}

    
    
    function displayJobDetails(job) {
        // Use the provided job data to build the detail HTML
        const detailHTML = `
        <link rel="stylesheet" href="./styles/jobdetail.css">
        <div class="container mt-5" id="job-detail-container">
            <div class="row">
                <div class="col-md-6">
                    <img src="${job.company.logo}" alt="${job.company.name} Logo" class="img-fluid mb-3">
                    <h2>${job.title}</h2>
                    <p><strong>Company:</strong> ${job.company.name}</p>
                    <p>${job.company.description}</p>
                    <p><strong>Description:</strong> ${job.description}</p>
                </div>
                <div class="col-md-6">
                    <p><strong>Requirements:</strong> ${job.requirements}</p>
                    <p><strong>Skills:</strong> ${job.skills}</p>
                    <p><strong>Salary Range:</strong> ${job.salaryRange.min}$ - ${job.salaryRange.max}$</p>
                    <p><strong>Job Type:</strong> ${job.jobType}</p>
                    <p><strong>Location:</strong> ${job.location}</p>
                    <p><strong>Posted At:</strong> ${new Date(job.postedAt).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> ${job.status}</p>
                    <a><button class="btn btn-primary mb-2 apply-btn" data-id="${job._id}">Apply</button></a>
                </div>
            </div>
        </div>
        `;
    
        document.getElementById('job-detail-container').innerHTML = detailHTML;

        // PARA PODER APLICAR
        const applyButton = document.querySelector('.apply-btn');
        if (applyButton) {
            applyButton.addEventListener('click', applyToJob);
        }
    }

    function detailButton(jobId) {
        sessionStorage.setItem('selectedJobId', jobId); // Store the job ID
        window.location.href = './vacancyDetails'; // Navigate to details page
    }

    
window.addEventListener('DOMContentLoaded', (event) => {
    const jobId = sessionStorage.getItem('selectedJobId'); // Retrieve the job ID

    if (jobId) {
        fetch(`http://localhost:3000/jobs/details/${jobId}`) // Use your server's URL
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(job => {
                displayJobDetails(job); // Now display the job details
            })
            .catch(error => {
                console.error('Error fetching job details:', error);
            });
    } else {
        // Handle case where jobId is not found
        console.error('Job ID not found in sessionStorage');
    }
});


