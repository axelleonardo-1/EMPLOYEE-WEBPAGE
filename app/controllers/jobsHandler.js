document.addEventListener('DOMContentLoaded', function() {
    // Get the form element
    const newJobForm = document.getElementById('newJobForm');

    // Listen for the form submission on creating new job
    newJobForm.addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();
        const userData = sessionStorage.getItem('user');
        const data = JSON.parse(userData);

        const jobsData = {
            employerId: data._id,
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
                logo: document.getElementById('companyLogo').value
            },
            status: "active" // Choose from "active", "closed"
        };

        console.log(jobsData);

        // handle the submission, for example, sending the data to a server
        fetch('http://localhost:3000/jobs/publishVacant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jobsData)
        })
        .then(response => response.json())
        .then(data => {
            if (data){
                console.log("Publish vacant succesfully");
                console.log(data);
                window.location.href = "./postVacant";
            }
            else{
                console.log("Publish vacant failed");
                window.location.href = "./postVacant";
            }
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
        });
    });




});
