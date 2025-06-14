// Solidarity Program JavaScript - Exact React Implementation

function highlightActiveNavItem() {
    const currentPath = window.location.pathname;

    // Clear all active classes
    document.querySelectorAll('.navbar nav a').forEach(link => link.classList.remove('active'));

    const registerBtn = document.getElementById('register-btn');
    const feedbackLink = document.getElementById('feedback-link');
    const programmeLink = document.getElementById('programme-link');
    const homeLink = document.getElementById('home-link');

    if (registerBtn) registerBtn.classList.remove('active');
    
    // Set active based on current path
    if (currentPath.includes('register.html') && registerBtn) {
        registerBtn.classList.add('active');
    } else if (currentPath.includes('feedback.html') && feedbackLink) {
        feedbackLink.classList.add('active');
    } else if (currentPath.includes('programme.html') && programmeLink) {
        programmeLink.classList.add('active');
    } else if (currentPath.includes('index.html') || currentPath === '/' || currentPath.endsWith('/')) {
        if (homeLink) homeLink.classList.add('active');
    }
}

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
    
    console.log('Solidarity Program initialized');
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
}

function updateAmountHelp(donationType) {
    const amountDescription = document.querySelector('#amount').nextElementSibling;
    if (!amountDescription) return;

    if (donationType === 'full') {
        amountDescription.textContent = 'Le prix moyen d\'un mouton est de 35 000 DZD.';
    } else {
        amountDescription.textContent = 'Vous pouvez contribuer du montant de votre choix.';
    }
}

function handleDonationSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const donationData = {
        donationType: formData.get('donationType'),
        amount: formData.get('amount'),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message')
    };

    // Validate form data
    if (!validateDonationData(donationData)) {
        return;
    }

    // Process donation
    processDonation(donationData);
}

function validateDonationData(data) {
    // Basic validation
    if (!data.amount || parseFloat(data.amount) <= 0) {
        alert('Veuillez entrer un montant valide.');
        return false;
    }

    if (!data.name || data.name.trim().length < 2) {
        alert('Veuillez entrer un nom valide.');
        return false;
    }

    if (!data.email || !isValidEmail(data.email)) {
        alert('Veuillez entrer une adresse email valide.');
        return false;
    }

    if (!data.phone || data.phone.trim().length < 10) {
        alert('Veuillez entrer un numéro de téléphone valide.');
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function processDonation(data) {
    // Simulate processing delay
    setTimeout(() => {
        console.log('Donation submitted:', data);
        showDonationSuccess();
    }, 1000);
}

function showDonationSuccess() {
    const donationForm = document.getElementById('donation-form');
    const successMessage = document.getElementById('success-message');
    
    if (donationForm && successMessage) {
        donationForm.classList.add('hidden');
        successMessage.classList.remove('hidden');
        donationSuccess = true;
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth' });
    }
}

function resetDonationForm() {
    const form = document.getElementById('donationForm');
    const donationFormContainer = document.getElementById('donation-form');
    const successMessage = document.getElementById('success-message');
    
    if (form) {
        form.reset();
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
    // Animate progress bar when page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            animateProgressBar();
        }, 500);
    });
}

function animateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        // Reset animation
        progressBar.style.width = '0%';
        
        // Animate to target width
        setTimeout(() => {
            progressBar.style.width = '50%';
        }, 100);
    }
}

function animateStatistics() {
    const statNumbers = document.querySelectorAll('.text-3xl.font-bold.text-green-700');
    
    statNumbers.forEach((stat, index) => {
        const finalValue = stat.textContent;
        const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
        
        if (!isNaN(numericValue)) {
            animateNumber(stat, 0, numericValue, finalValue);
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
            element.textContent = (current / 1000000).toFixed(2) + 'M';
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

// Export functions for global access
window.switchTab = switchTab;
window.resetDonationForm = resetDonationForm;

console.log('Solidarity Program JavaScript loaded');