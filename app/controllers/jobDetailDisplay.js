// jobDetailDisplay.js
document.addEventListener('DOMContentLoaded', function() {
    // Obtén el jobId de la URL
    const params = new URLSearchParams(window.location.search);
    const jobId = params.get('jobId');

    // Carga los datos de los trabajos
    fetch(`/app/data/jobLists.json`)
        .then(response => response.json())
        .then(jobs => {
            // Encuentra el trabajo específico por jobId
            const job = jobs.find(j => j._id === jobId);
            if (job) {
                displayJobDetails(job);
            } else {
                document.getElementById('job-detail-container').innerHTML = '<p>Job not found.</p>';
            }
        })
        .catch(error => {
            console.error('Error loading job details:', error);
        });
});

function displayJobDetails(job) {
    // Construye el HTML con todos los detalles del trabajo
    const detailHTML = `
    <link rel="stylesheet" href="/app/views/styles/jobdetail.css">

    <div class="container mt-5" id="job-detail-container">
    <div class="row">
        <!-- Columna para la imagen y los datos de la compañía -->
        <div class="col-md-6">
            <img src="${job.company.logo}" alt="${job.company.name} Logo" class="img-fluid mb-3">
            <h2>${job.title}</h2>
            <p><strong>Company:</strong> ${job.company.name}</p>
            <p>${job.company.description}</p>
            <p><strong>Description:</strong> ${job.description}</p>
        </div>
        <!-- Columna para los detalles adicionales del trabajo -->
        <div class="col-md-6">
            <p><strong>Requirements:</strong> ${job.requirements.join(', ')}</p>
            <p><strong>Skills:</strong> ${job.skills.join(', ')}</p>
            <p><strong>Salary Range:</strong> ${job.salaryRange.min}$ - ${job.salaryRange.max}$</p>
            <p><strong>Job Type:</strong> ${job.jobType}</p>
            <p><strong>Location:</strong> ${job.location}</p>
            <p><strong>Posted At:</strong> ${new Date(job.postedAt).toLocaleDateString()}</p>
            <p><strong>Status:</strong> ${job.status}</p>
        </div>
    </div>
</div>
    `;

    document.getElementById('job-detail-container').innerHTML = detailHTML;
}
