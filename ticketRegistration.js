document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation item
    const currentPath = window.location.pathname;
    
    // Clear all active states first
    document.querySelectorAll('.navbar nav a').forEach(link => link.classList.remove('active'));
    document.getElementById('register-btn').classList.remove('active');
    
    // Set active state based on current page
    if (currentPath.includes('register.html')) {
        document.getElementById('register-btn').classList.add('active');
    } else if (currentPath.includes('feedback.html')) {
        document.getElementById('feedback-link').classList.add('active');
    } else if (currentPath.includes('programme.html')) {
        document.getElementById('programme-link').classList.add('active');
    } else if (currentPath.includes('index.html') || currentPath === '/' || currentPath.endsWith('/')) {
        document.getElementById('home-link').classList.add('active');
    }
    
    // Form elements
    const form = document.getElementById('ticketForm');
    const fileInput = document.getElementById('fileUpload');
    const uploadArea = document.querySelector('.upload-area');
    const priorityCheckbox = document.getElementById('priorityAccess');
    const uploadSection = document.getElementById('uploadSection');
    const successMessage = document.getElementById('successMessage');
    
    // Handle checkbox change to show/hide upload section
    priorityCheckbox.addEventListener('change', function() {
        if (this.checked) {
            uploadSection.style.display = 'block';
            uploadSection.style.animation = 'slideDown 0.3s ease-out';
        } else {
            uploadSection.style.display = 'none';
        }
    });
    
    // Handle file upload
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            const fileName = this.files[0].name;
            uploadArea.querySelector('p').textContent = `Selected: ${fileName}`;
            uploadArea.style.borderColor = '#4CAF50';
            uploadArea.style.backgroundColor = '#f0f8f0';
        }
    });
    
    // Handle drag and drop
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = '#4CAF50';
        this.style.backgroundColor = '#f0f8f0';
        this.style.transform = 'scale(1.02)';
    });
    
    uploadArea.addEventListener('dragleave', function() {
        this.style.borderColor = '#4CAF50';
        this.style.backgroundColor = '#fafafa';
        this.style.transform = 'scale(1)';
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = '#4CAF50';
        this.style.backgroundColor = '#f0f8f0';
        this.style.transform = 'scale(1)';
        
        if (e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            const fileName = e.dataTransfer.files[0].name;
            this.querySelector('p').textContent = `Selected: ${fileName}`;
        }
    });
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Enhanced validation
        const requiredFields = ['fullName', 'phone', 'wilaya', 'commune', 'ninCarte'];
        const missingFields = [];
        
        requiredFields.forEach(field => {
            if (!data[field]) {
                missingFields.push(field);
            }
        });
        
        if (missingFields.length > 0) {
            alert('Please fill in all required fields: ' + missingFields.join(', '));
            return;
        }
        
        // Validate NIN format (basic validation)
        if (data.ninCarte && data.ninCarte.length < 10) {
            alert('Please enter a valid NIN number (minimum 10 digits)');
            return;
        }
        
        // Validate phone number
        if (data.phone && !/^[0-9+\-\s()]+$/.test(data.phone)) {
            alert('Please enter a valid phone number');
            return;
        }
        
        // Check if priority access is checked but no file uploaded
        if (priorityCheckbox.checked && !fileInput.files.length) {
            alert('Please upload documents for prioritized access');
            return;
        }
        
        // Simulate form submission with loading
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            console.log('Form data:', data);
            console.log('Files:', fileInput.files);
            
            // Show success message
            successMessage.style.display = 'flex';
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
    
    // Add form animation on load
    setTimeout(() => {
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach((group, index) => {
            group.style.opacity = '0';
            group.style.transform = 'translateY(20px)';
            setTimeout(() => {
                group.style.transition = 'all 0.5s ease';
                group.style.opacity = '1';
                group.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
});


