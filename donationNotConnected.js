// Solidarity Program JavaScript - Complete Implementation

// Global state
let currentTab = 'about';
let donationSuccess = false;

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    setupTabNavigation();
    setupDonationForm();
    setupProgressAnimation();
    highlightActiveNavItem();
    setupNavbarInteractions();
    
    console.log('Solidarity Program initialized');
}

// Navigation Bar Functions
function highlightActiveNavItem() {
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop() || 'index.html';

    // Clear all active classes
    document.querySelectorAll('.navbar nav a').forEach(link => {
        link.classList.remove('active');
    });

    // Set active based on current file
    const navLinks = {
        'dashboard.html': 'dashboard',
        'reservations.html': 'reservations', 
        'feedback.html': 'feedback',
        'solidarity-program.html': 'solidarity-program'
    };

    // Find and activate the correct nav link
    Object.keys(navLinks).forEach(file => {
        if (currentFile === file || currentPath.includes(file)) {
            const linkElement = document.querySelector(`nav a[href="${file}"]`);
            if (linkElement) {
                linkElement.classList.add('active');
            }
        }
    });

    // Default to feedback if we're on solidarity-program page
    if (currentFile === 'solidarity-program.html') {
        const feedbackLink = document.querySelector('nav a[href="feedback.html"]');
        if (feedbackLink) {
            feedbackLink.classList.add('active');
        }
    }
}

function setupNavbarInteractions() {
    // Handle mobile menu toggle if needed
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.addEventListener('click', function(e) {
            // Handle any navbar-specific interactions
        });
    }

    // Add hover effects to nav links
    document.querySelectorAll('.navbar nav a').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Tab Navigation Functions
function setupTabNavigation() {
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    
    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const tabValue = this.getAttribute('data-value');
            switchTab(tabValue);
        });
    });
}

function switchTab(tabName) {
    // Validate tab name
    const validTabs = ['about', 'donate', 'impact'];
    if (!validTabs.includes(tabName)) {
        console.error('Invalid tab name:', tabName);
        return;
    }

    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all tab triggers
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    tabTriggers.forEach(trigger => {
        trigger.classList.remove('active');
    });

    // Show selected tab content
    const selectedTab = document.querySelector(`.tab-content[data-value="${tabName}"]`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Add active class to selected tab trigger
    const activeTrigger = document.querySelector(`.tab-trigger[data-value="${tabName}"]`);
    if (activeTrigger) {
        activeTrigger.classList.add('active');
    }

    // Update current tab
    currentTab = tabName;

    // Trigger tab-specific actions
    onTabSwitch(tabName);
}

function onTabSwitch(tabName) {
    switch(tabName) {
        case 'about':
            animateProgressBar();
            break;
        case 'donate':
            // Reset donation success state when switching to donate tab
            if (donationSuccess) {
                resetDonationForm();
            }
            break;
        case 'impact':
            animateStatistics();
            break;
    }
}

// Donation Form Functions
function setupDonationForm() {
    const donationForm = document.getElementById('donationForm');
    const donationTypeRadios = document.querySelectorAll('input[name="donationType"]');
    
    // Handle donation type change
    donationTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateAmountHelp(this.value);
        });
    });

    // Handle form submission
    if (donationForm) {
        donationForm.addEventListener('submit', handleDonationSubmit);
    }

    // Setup form input validation
    setupFormValidation();
}

function setupFormValidation() {
    // Email validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            validateEmail(this);
        });
    }

    // Phone validation
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            // Only allow numbers and basic phone formatting
            this.value = this.value.replace(/[^0-9+\-\s()]/g, '');
        });
    }

    // Amount validation
    const amountInput = document.getElementById('amount');
    if (amountInput) {
        amountInput.addEventListener('input', function() {
            // Only allow numbers and decimal point
            this.value = this.value.replace(/[^0-9.]/g, '');
            
            // Validate amount
            const amount = parseFloat(this.value);
            if (amount > 0) {
                this.style.borderColor = '#22c55e';
            } else if (this.value !== '') {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '#e5e7eb';
            }
        });
    }
}

function validateEmail(emailInput) {
    const email = emailInput.value.trim();
    if (email === '') {
        emailInput.style.borderColor = '#e5e7eb';
        return true;
    }
    
    if (isValidEmail(email)) {
        emailInput.style.borderColor = '#22c55e';
        return true;
    } else {
        emailInput.style.borderColor = '#ef4444';
        return false;
    }
}

function updateAmountHelp(donationType) {
    const amountInput = document.getElementById('amount');
    const amountDescription = amountInput ? amountInput.nextElementSibling : null;
    
    if (!amountDescription) return;

    if (donationType === 'full') {
        amountDescription.textContent = 'Le prix moyen d\'un mouton est de 35 000 DZD.';
    } else {
        amountDescription.textContent = 'Vous pouvez contribuer du montant de votre choix.';
    }
}

function handleDonationSubmit(e) {
    e.preventDefault();
    
    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    setLoadingState(submitButton, true);
    
    // Get form data
    const formData = new FormData(e.target);
    const donationData = {
        donationType: formData.get('donationType'),
        amount: formData.get('amount'),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message') || ''
    };

    // Validate form data
    if (!validateDonationData(donationData)) {
        setLoadingState(submitButton, false);
        return;
    }

    // Process donation
    processDonation(donationData, submitButton);
}

function validateDonationData(data) {
    // Amount validation
    if (!data.amount || parseFloat(data.amount) <= 0) {
        showAlert('Veuillez entrer un montant valide.', 'error');
        return false;
    }

    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        showAlert('Veuillez entrer un nom valide.', 'error');
        return false;
    }

    // Email validation
    if (!data.email || !isValidEmail(data.email)) {
        showAlert('Veuillez entrer une adresse email valide.', 'error');
        return false;
    }

    // Phone validation
    if (!data.phone || data.phone.trim().length < 10) {
        showAlert('Veuillez entrer un numéro de téléphone valide.', 'error');
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function processDonation(data, submitButton) {
    // Simulate API call
    setTimeout(() => {
        console.log('Donation submitted:', data);
        setLoadingState(submitButton, false);
        showDonationSuccess();
        
        // Track donation for analytics (if needed)
        trackDonation(data);
    }, 2000);
}

function trackDonation(data) {
    // This would typically send data to analytics service
    console.log('Tracking donation:', {
        amount: data.amount,
        type: data.donationType,
        timestamp: new Date().toISOString()
    });
}

function showDonationSuccess() {
    const donationForm = document.getElementById('donation-form');
    const successMessage = document.getElementById('success-message');
    
    if (donationForm && successMessage) {
        donationForm.classList.add('hidden');
        successMessage.classList.remove('hidden');
        donationSuccess = true;
        
        // Scroll to success message smoothly
        successMessage.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
        
        // Show success animation
        setTimeout(() => {
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'scale(0.95)';
            setTimeout(() => {
                successMessage.style.opacity = '1';
                successMessage.style.transform = 'scale(1)';
            }, 100);
        }, 100);
    }
}

function resetDonationForm() {
    const form = document.getElementById('donationForm');
    const donationFormContainer = document.getElementById('donation-form');
    const successMessage = document.getElementById('success-message');
    
    if (form) {
        form.reset();
        
        // Reset input styles
        form.querySelectorAll('input, textarea').forEach(input => {
            input.style.borderColor = '#e5e7eb';
        });
    }
    
    if (donationFormContainer && successMessage) {
        donationFormContainer.classList.remove('hidden');
        successMessage.classList.add('hidden');
        donationSuccess = false;
    }
    
    // Reset help text
    updateAmountHelp('full');
}

// Progress and Animation Functions
function setupProgressAnimation() {
    // Setup intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('progress')) {
                    animateProgressBar();
                } else if (entry.target.querySelector('.text-3xl')) {
                    animateStatistics();
                }
            }
        });
    }, observerOptions);

    // Observe progress bars and statistics
    document.querySelectorAll('.progress, .bg-white.p-4.rounded-lg').forEach(el => {
        observer.observe(el);
    });
}

function animateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar && !progressBar.classList.contains('animated')) {
        progressBar.classList.add('animated');
        
        // Reset animation
        progressBar.style.width = '0%';
        progressBar.style.transition = 'width 2s ease-out';
        
        // Animate to target width
        setTimeout(() => {
            progressBar.style.width = '50%';
        }, 100);
    }
}

function animateStatistics() {
    const statContainers = document.querySelectorAll('.bg-white.p-4.rounded-lg');
    
    statContainers.forEach((container, index) => {
        const statNumber = container.querySelector('.text-3xl.font-bold.text-green-700');
        if (statNumber && !statNumber.classList.contains('animated')) {
            statNumber.classList.add('animated');
            
            const finalValue = statNumber.textContent;
            const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
            
            if (!isNaN(numericValue)) {
                setTimeout(() => {
                    animateNumber(statNumber, 0, numericValue, finalValue);
                }, index * 200);
            }
        }
    });
}

function animateNumber(element, start, end, suffix) {
    const duration = 2000;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = start + (end - start) * easeOutQuart(progress);
        
        if (suffix.includes('M')) {
            element.textContent = (current / 1000).toFixed(2) + 'M';
        } else {
            element.textContent = Math.floor(current).toString();
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = suffix;
        }
    }
    
    requestAnimationFrame(updateNumber);
}

function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
}

// Utility Functions
function setLoadingState(button, isLoading) {
    if (!button) return;
    
    if (isLoading) {
        button.disabled = true;
        button.style.opacity = '0.7';
        button.style.cursor = 'not-allowed';
        
        // Store original text
        button.dataset.originalText = button.textContent;
        button.textContent = 'Traitement en cours...';
        
        // Add spinner if not exists
        if (!button.querySelector('.spinner')) {
            const spinner = document.createElement('div');
            spinner.className = 'spinner';
            spinner.innerHTML = '⟳';
            spinner.style.cssText = `
                display: inline-block;
                animation: spin 1s linear infinite;
                margin-right: 8px;
            `;
            button.prepend(spinner);
        }
    } else {
        button.disabled = false;
        button.style.opacity = '1';
        button.style.cursor = 'pointer';
        
        // Restore original text
        if (button.dataset.originalText) {
            button.textContent = button.dataset.originalText;
        }
        
        // Remove spinner
        const spinner = button.querySelector('.spinner');
        if (spinner) {
            spinner.remove();
        }
    }
}

function showAlert(message, type = 'info') {
    // Remove existing alerts
    document.querySelectorAll('.custom-alert').forEach(alert => alert.remove());
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `custom-alert alert-${type}`;
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 20px;
        border-radius: 8px;
        color: white;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        z-index: 1000;
        max-width: 400px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        animation: slideInRight 0.3s ease-out;
        cursor: pointer;
    `;
    
    // Set background color based on type
    const colors = {
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)',
        success: 'linear-gradient(135deg, #10b981, #059669)',
        info: 'linear-gradient(135deg, #3b82f6, #2563eb)'
    };
    
    alert.style.background = colors[type] || colors.info;
    alert.textContent = message;
    
    // Add close button
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        float: right;
        margin-left: 10px;
        font-size: 20px;
        cursor: pointer;
        line-height: 1;
    `;
    closeBtn.onclick = () => removeAlert(alert);
    alert.appendChild(closeBtn);
    
    document.body.appendChild(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => removeAlert(alert), 5000);
}

function removeAlert(alert) {
    if (alert && alert.parentNode) {
        alert.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => alert.remove(), 300);
    }
}

// Add required CSS animations
function addCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .navbar nav a {
            transition: transform 0.2s ease;
        }
        
        .tab-trigger {
            transition: all 0.3s ease;
        }
        
        .tab-trigger:hover {
            transform: translateY(-2px);
        }
        
        .card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .progress-bar {
            transition: width 2s ease-out;
        }
        
        .success-message {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// Initialize custom styles
addCustomStyles();

// Export functions for global access
window.switchTab = switchTab;
window.resetDonationForm = resetDonationForm;
window.showAlert = showAlert;

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (!document.hidden && currentTab === 'about') {
        // Re-animate progress bar when page becomes visible
        setTimeout(animateProgressBar, 500);
    }
});

console.log('Solidarity Program JavaScript loaded successfully');