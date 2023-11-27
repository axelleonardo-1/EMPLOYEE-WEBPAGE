document.addEventListener('DOMContentLoaded', function() {
    // Check if user data exists in sessionStorage
    const userData = sessionStorage.getItem('selectedApplier');
    if (userData) {
        const data = JSON.parse(userData);
        
        // Set form fields with user data from sessionStorage
        document.getElementById('username').value = data.username;
        document.getElementById('firstName').value = data.profile.firstName;
        document.getElementById('lastName').value = data.profile.lastName;
        document.getElementById('location').value = data.profile.location;
        document.getElementById('contactNumber').value = data.profile.contactNumber;
        document.getElementById('userAvatar').src = data.profile.avatar;
        document.getElementById('avatar').value = data.profile.avatar;
        document.getElementById('skills').textContent = data.profile.skills;
        document.getElementById('education').textContent = data.profile.education;
        document.getElementById('workExperience').textContent = data.profile.workExperience;
        
        // If there is a PDF in the user profile, show a preview
        if (data.profile.resume) {
            const resumePreview = document.createElement('iframe');
            resumePreview.src = data.profile.resume;
            resumePreview.style.width = '100%';
            resumePreview.style.height = '700px';
            resumePreview.setAttribute('type', 'application/pdf');
            
            const resumeContainer = document.getElementById('resumeContainer');
            resumeContainer.innerHTML = '';
            resumeContainer.appendChild(resumePreview);
            
            // Disable the CV upload field if you don't want another CV to be uploaded
            document.getElementById('cvUpload').disabled = true;
        }
    } else {
        console.error('No user data found in sessionStorage.');
    }




    // Evento para el botón de rechazo
    const rejectButton = document.getElementById('rejectButton');
    rejectButton.addEventListener('click', function() {
        const jobId = sessionStorage.getItem('jobSelected');
        const job = JSON.parse(jobId);
        const data2 = JSON.parse(userData);
        const userId = data2._id; // Suponiendo que `data` contiene la información del aplicante

        // Llama a la función de rechazo
        rejectApplicant(job, userId);
    });

});

function rejectApplicant(jobId, userId) {
    fetch(`http://localhost:3000/jobs/delete/${jobId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            action: 'reject',
            userId: userId // ID del usuario a eliminar de peopleInterested
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Applicant rejected successfully:', data);
            window.location.href = './myVacants';
        } else {
            alert('Error rejecting applicant:', data.message);
        }
    })
    .catch(error => {
        console.error('Error during fetch:', error);
    });
}
