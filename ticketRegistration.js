document.addEventListener('DOMContentLoaded', function () {
    // Set active navigation
    setActiveNavigation();

    // Form elements
    const form = document.getElementById('ticketForm');
    const fileInput = document.getElementById('fileUpload');
    const uploadArea = document.querySelector('.upload-area');
    const priorityCheckbox = document.getElementById('priorityAccess');
    const uploadSection = document.getElementById('uploadSection');
    const successMessage = document.getElementById('successMessage');

    // Checkbox: show/hide upload section
    priorityCheckbox.addEventListener('change', function () {
        if (this.checked) {
            uploadSection.style.display = 'block';
            uploadSection.style.animation = 'slideDown 0.3s ease-out';
        } else {
            uploadSection.style.display = 'none';
        }
    });

    // File input change
    fileInput.addEventListener('change', function () {
        if (this.files.length > 0) {
            const fileName = this.files[0].name;
            uploadArea.querySelector('p').textContent = `Selected: ${fileName}`;
            uploadArea.style.borderColor = '#4CAF50';
            uploadArea.style.backgroundColor = '#f0f8f0';
        }
    });

    // Drag and drop
    uploadArea.addEventListener('dragover', function (e) {
        e.preventDefault();
        this.style.borderColor = '#4CAF50';
        this.style.backgroundColor = '#f0f8f0';
        this.style.transform = 'scale(1.02)';
    });

    uploadArea.addEventListener('dragleave', function () {
        this.style.borderColor = '#4CAF50';
        this.style.backgroundColor = '#fafafa';
        this.style.transform = 'scale(1)';
    });

    uploadArea.addEventListener('drop', function (e) {
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

    // Form submit
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {};

        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

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

        if (data.ninCarte && data.ninCarte.length < 10) {
            alert('Please enter a valid NIN number (minimum 10 digits)');
            return;
        }

        if (data.phone && !/^[0-9+\-\s()]+$/.test(data.phone)) {
            alert('Please enter a valid phone number');
            return;
        }

        if (priorityCheckbox.checked && !fileInput.files.length) {
            alert('Please upload documents for prioritized access');
            return;
        }

        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        setTimeout(() => {
            console.log('Form data:', data);
            console.log('Files:', fileInput.files);
            successMessage.style.display = 'flex';
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });

    // Animate form on load
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

// 🔹 Modular Navigation Logic
function setActiveNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar nav a');

    // Clear all active states
    navLinks.forEach(link => link.classList.remove('active'));

    // Determine which nav link to activate
    if (currentPath.includes('register.html')) {
        setActive('register-btn');
    } else if (currentPath.includes('feedback.html')) {
        setActive('feedback-link');
    } else if (currentPath.includes('programme.html')) {
        setActive('programme-link');
    } else if (currentPath.includes('index.html') || currentPath === '/' || currentPath.endsWith('/')) {
        setActive('home-link');
    }
}

// 🔹 Helper function
function setActive(id) {
    const el = document.getElementById(id);
    if (el) {
        el.classList.add('active');
    }
}
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.navbar nav a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  navLinks.forEach(link => {
    // Correspondance exacte ou partielle selon votre structure URL
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
    
    // Optionnel : gestion manuelle du clic (pour SPA)
    link.addEventListener('click', function(e) {
      if (!this.href.includes('#')) { // Exclure les ancres
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
});