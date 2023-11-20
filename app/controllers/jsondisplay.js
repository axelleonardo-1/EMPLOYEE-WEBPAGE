
fetch('/data/jobLists.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    displayJobs(data);
  })
  .catch(error => {
    console.log(error);
  });
 

function createJobCard(job) {
    return `
    <link rel="stylesheet" href="/styles/joblistStyle.css">
    <div class="col-md-6 mb-4">
    <div class="card">
        <!-- Fila para el logo y la información -->
        <div class="row no-gutters">
            <!-- Columna para el logo -->
            <div class="col-md-4 d-flex align-items-center justify-content-center">
                <img src="${job.company.logo}" class="card-img p-2" alt="${job.company.name} Logo">
            </div>
            <!-- Columna para la información -->
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${job.title}</h5>
                    <p class="card-text">${job.description}</p>
                    <h6 class="card-subjects"   >Requirements:</h6>
                    <ul>${job.requirements.map(req => `<li>${req}</li>`).join('')}</ul>
                    <h6>Skills:</h6>
                    <ul>${job.skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
                    <p class="card-text"><small class="text-muted">Job Type: ${job.jobType}</small></p>
                    <p class="card-text"><small class="text-muted">Location: ${job.location}</small></p>
                </div>
            </div>
        </div>
        <!-- Fila para el botón Apply -->
        <div class="row">
            <div class="col-12 text-center">
                <button class="btn btn-primary mb-2 apply-btn" data-id="${job._id}">Details</button>
            </div>
        </div>
    </div>
</div>


    `;
}

function displayJobs(jobs) {
    const jobsContainer = document.getElementById('jobs-container');
    const rows = jobs.map(job => createJobCard(job)).join('');
    jobsContainer.innerHTML = `<div class="row">${rows}</div>`;
    
    // Agrega event listeners a los botones Apply
    document.querySelectorAll('.apply-btn').forEach(button => {
        button.addEventListener('click', function() {
            const jobId = this.getAttribute('data-id');
            // Aquí podrías redireccionar a la nueva página HTML con los detalles del trabajo o abrir un modal, etc.
            // Por ejemplo:
            window.location.href = `./job-detail.html?jobId=${jobId}`;
        });
    });
}

// jsondisplay.js
window.onload = function() {
    fetch('/data/jobLists.json')
        .then(response => response.json())
        .then(data => {
            displayJobs(data);
        })
        .catch(error => console.error('Error loading the job listings:', error));
};
