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
});
