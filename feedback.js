document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(tabId + '-content').classList.add('active');
        });
    });
    
    // Rating card functionality
    const ratingCards = document.querySelectorAll('.rating-card');
    let selectedRating = null;
    
    ratingCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selected class from all rating cards
            ratingCards.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked card
            this.classList.add('selected');
            selectedRating = this.getAttribute('data-rating');
        });
    });
    
    // Problem type radio functionality
    const problemOptions = document.querySelectorAll('.problem-option');
    let selectedProblemType = null;
    
    problemOptions.forEach(option => {
        option.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            selectedProblemType = radio.value;
            
            // Update visual state
            problemOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    // Category card functionality
    const categoryCards = document.querySelectorAll('.category-card');
    let selectedCategories = [];
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryText = this.querySelector('span').textContent;
            
            if (this.classList.contains('selected')) {
                // Remove from selection
                this.classList.remove('selected');
                selectedCategories = selectedCategories.filter(cat => cat !== categoryText);
            } else {
                // Add to selection
                this.classList.add('selected');
                selectedCategories.push(categoryText);
            }
        });
    });
    
    // Character count functionality
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        const maxLength = 500;
        const counter = textarea.parentNode.querySelector('.character-count');
        
        function updateCounter() {
            const length = textarea.value.length;
            counter.textContent = `${length}/${maxLength} caractères`;
            
            if (length > maxLength * 0.9) {
                counter.style.color = '#f44336';
            } else if (length > maxLength * 0.7) {
                counter.style.color = '#ff9800';
            } else {
                counter.style.color = '#666';
            }
        }
        
        textarea.addEventListener('input', updateCounter);
        textarea.setAttribute('maxlength', maxLength);
        updateCounter();
    });
    
    // Input validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    const ninInputs = document.querySelectorAll('input[type="text"]');
    
    emailInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim().length > 0) {
                if (isValidEmail(this.value)) {
                    this.style.borderColor = '#4caf50';
                } else {
                    this.style.borderColor = '#f44336';
                }
            } else {
                this.style.borderColor = '#e0e0e0';
            }
        });
    });
    
    ninInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Remove non-numeric characters
            this.value = this.value.replace(/[^0-9]/g, '');
            
            if (this.value.length > 0) {
                this.style.borderColor = '#4caf50';
            } else {
                this.style.borderColor = '#e0e0e0';
            }
        });
    });
    
    // Form validation and submission
    const feedbackSubmitBtn = document.querySelector('.feedback-submit');
    const problemSubmitBtn = document.querySelector('.problem-submit');
    
    if (feedbackSubmitBtn) {
        feedbackSubmitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const commentText = document.querySelector('.comment-textarea').value.trim();
            const email = document.querySelector('#feedback-email').value.trim();
            const nin = document.querySelector('#feedback-nin').value.trim();
            
            // Basic validation
            if (!selectedRating) {
                showAlert('Veuillez sélectionner une évaluation de votre expérience.', 'warning');
                return;
            }
            
            // Email validation if provided
            if (email && !isValidEmail(email)) {
                showAlert('Veuillez entrer une adresse email valide.', 'error');
                return;
            }
            
            // NIN validation if provided
            if (nin && nin.length < 10) {
                showAlert('Le NIN doit contenir au moins 10 chiffres.', 'error');
                return;
            }
            
            // Show loading state
            setLoadingState(this, true);
            
            // Collect feedback data
            const feedbackData = {
                type: 'feedback',
                rating: selectedRating,
                comment: commentText,
                email: email,
                nin: nin,
                timestamp: new Date().toISOString()
            };
            
            // Simulate form submission
            setTimeout(() => {
                console.log('Feedback submitted:', feedbackData);
                setLoadingState(this, false);
                showSuccessModal('Merci pour votre retour ! Votre avis a été envoyé avec succès. Nous apprécions votre contribution pour améliorer nos services.');
                resetFeedbackForm();
            }, 2000);
        });
    }
    
    if (problemSubmitBtn) {
        problemSubmitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const problemDescription = document.querySelector('.problem-textarea').value.trim();
            const email = document.querySelector('#problem-email').value.trim();
            const nin = document.querySelector('#problem-nin').value.trim();
            
            // Basic validation
            if (!selectedProblemType) {
                showAlert('Veuillez sélectionner un type de problème.', 'warning');
                return;
            }
            
            if (!problemDescription) {
                showAlert('Veuillez décrire votre problème.', 'error');
                return;
            }
            
            if (problemDescription.length < 20) {
                showAlert('Veuillez fournir une description plus détaillée (au moins 20 caractères).', 'warning');
                return;
            }
            
            // Email validation if provided
            if (email && !isValidEmail(email)) {
                showAlert('Veuillez entrer une adresse email valide.', 'error');
                return;
            }
            
            // NIN validation if provided
            if (nin && nin.length < 10) {
                showAlert('Le NIN doit contenir au moins 10 chiffres.', 'error');
                return;
            }
            
            // Show loading state
            setLoadingState(this, true);
            
            // Collect problem data
            const problemData = {
                type: 'problem',
                problemType: selectedProblemType,
                description: problemDescription,
                email: email,
                nin: nin,
                timestamp: new Date().toISOString()
            };
            
            // Simulate form submission
            setTimeout(() => {
                console.log('Problem reported:', problemData);
                setLoadingState(this, false);
                showSuccessModal('Votre problème a été signalé avec succès ! Notre équipe technique va examiner votre rapport et vous contacter si nécessaire.');
                resetProblemForm();
            }, 2000);
        });
    }
    
    // Helper functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showAlert(message, type = 'info') {
        // Create alert element
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-family: 'Poppins', sans-serif;
            font-weight: 500;
            z-index: 1001;
            max-width: 400px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            animation: slideInRight 0.3s ease-out;
        `;
        
        // Set background color based on type
        switch(type) {
            case 'error':
                alert.style.background = 'linear-gradient(135deg, #f44336, #d32f2f)';
                break;
            case 'warning':
                alert.style.background = 'linear-gradient(135deg, #ff9800, #f57c00)';
                break;
            case 'success':
                alert.style.background = 'linear-gradient(135deg, #4caf50, #2e7d32)';
                break;
            default:
                alert.style.background = 'linear-gradient(135deg, #2196f3, #1976d2)';
        }
        
        alert.textContent = message;
        document.body.appendChild(alert);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            alert.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => alert.remove(), 300);
        }, 5000);
    }
    
    function showSuccessModal(message) {
        const modal = document.getElementById('success-modal');
        const modalMessage = modal.querySelector('.modal-message');
        modalMessage.textContent = message;
        modal.style.display = 'flex';
    }
    
    function setLoadingState(button, isLoading) {
        const btnText = button.querySelector('.btn-text');
        const spinner = button.querySelector('.loading-spinner');
        
        if (isLoading) {
            button.disabled = true;
            btnText.style.display = 'none';
            spinner.style.display = 'block';
        } else {
            button.disabled = false;
            btnText.style.display = 'block';
            spinner.style.display = 'none';
        }
    }
    
    function resetFeedbackForm() {
        // Reset rating selection
        ratingCards.forEach(card => card.classList.remove('selected'));
        selectedRating = null;
        
        // Reset form fields
        document.querySelector('.comment-textarea').value = '';
        document.querySelector('#feedback-email').value = '';
        document.querySelector('#feedback-nin').value = '';
        
        // Reset input styles
        document.querySelectorAll('.contact-input').forEach(input => {
            input.style.borderColor = '#e0e0e0';
        });
    }
    
    function resetProblemForm() {
        // Reset problem type selection
        problemOptions.forEach(option => {
            option.classList.remove('selected');
            option.querySelector('input[type="radio"]').checked = false;
        });
        selectedProblemType = null;
        
        // Reset form fields
        document.querySelector('.problem-textarea').value = '';
        document.querySelector('#problem-email').value = '';
        document.querySelector('#problem-nin').value = '';
        
        // Reset input styles
        document.querySelectorAll('.contact-input').forEach(input => {
            input.style.borderColor = '#e0e0e0';
        });
    }
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // Add CSS animations
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
    `;
    document.head.appendChild(style);
});

// Global function to close modal
function closeModal() {
    const modal = document.getElementById('success-modal');
    modal.style.display = 'none';
}