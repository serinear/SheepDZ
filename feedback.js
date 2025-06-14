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
    
    // Form validation and submission
    const feedbackSubmitBtn = document.querySelector('.feedback-submit');
    const problemSubmitBtn = document.querySelector('.problem-submit');
    
    if (feedbackSubmitBtn) {
        feedbackSubmitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const commentText = document.querySelector('.comment-textarea').value.trim();
            
            // Basic validation
            if (!selectedRating) {
                alert('Veuillez sélectionner une évaluation de votre expérience.');
                return;
            }
            
            if (selectedCategories.length === 0) {
                alert('Veuillez sélectionner au moins un domaine.');
                return;
            }
            
            // Collect feedback data
            const feedbackData = {
                type: 'feedback',
                rating: selectedRating,
                categories: selectedCategories,
                comment: commentText,
                timestamp: new Date().toISOString()
            };
            
            // Simulate form submission
            console.log('Feedback submitted:', feedbackData);
            
            // Show success message
            showSuccessMessage('Merci pour votre retour ! Votre avis a été envoyé avec succès.');
            
            // Reset form
            resetFeedbackForm();
        });
    }
    
    if (problemSubmitBtn) {
        problemSubmitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const problemDescription = document.querySelector('.problem-textarea').value.trim();
            const contactEmail = document.querySelector('.contact-input').value.trim();
            
            // Basic validation
            if (!selectedProblemType) {
                alert('Veuillez sélectionner un type de problème.');
                return;
            }
            
            if (selectedCategories.length === 0) {
                alert('Veuillez sélectionner au moins un domaine.');
                return;
            }
            
            if (!problemDescription) {
                alert('Veuillez décrire votre problème.');
                return;
            }
            
            // Email validation if provided
            if (contactEmail && !isValidEmail(contactEmail)) {
                alert('Veuillez entrer une adresse email valide.');
                return;
            }
            
            // Collect problem data
            const problemData = {
                type: 'problem',
                problemType: selectedProblemType,
                categories: selectedCategories,
                description: problemDescription,
                contactEmail: contactEmail,
                timestamp: new Date().toISOString()
            };
            
            // Simulate form submission
            console.log('Problem reported:', problemData);
            
            // Show success message
            showSuccessMessage('Votre problème a été signalé avec succès ! Nous vous contacterons bientôt.');
            
            // Reset form
            resetProblemForm();
        });
    }
    
    // Helper functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showSuccessMessage(message) {
        // Create success modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            max-width: 400px;
            margin: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        `;
        
        modalContent.innerHTML = `
            <div style="font-size: 3rem; color: #4caf50; margin-bottom: 15px;">✅</div>
            <h3 style="font-family: 'Manrope', sans-serif; color: #333; margin-bottom: 15px;">Succès !</h3>
            <p style="font-family: 'Poppins', sans-serif; color: #666; margin-bottom: 20px;">${message}</p>
            <button onclick="this.closest('.modal').remove()" style="
                background: #4caf50;
                color: white;
                border: none;
                padding: 12px 25px;
                border-radius: 8px;
                font-family: 'Poppins', sans-serif;
                font-weight: 500;
                cursor: pointer;
                transition: background 0.3s ease;
            " onmouseover="this.style.background='#45a049'" onmouseout="this.style.background='#4caf50'">
                Fermer
            </button>
        `;
        
        modal.className = 'modal';
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    function resetFeedbackForm() {
        // Reset rating selection
        ratingCards.forEach(card => card.classList.remove('selected'));
        selectedRating = null;
        
        // Reset category selection
        categoryCards.forEach(card => card.classList.remove('selected'));
        selectedCategories = [];
        
        // Reset comment textarea
        document.querySelector('.comment-textarea').value = '';
    }
    
    function resetProblemForm() {
        // Reset problem type selection
        problemOptions.forEach(option => {
            option.classList.remove('selected');
            option.querySelector('input[type="radio"]').checked = false;
        });
        selectedProblemType = null;
        
        // Reset category selection
        categoryCards.forEach(card => card.classList.remove('selected'));
        selectedCategories = [];
        
        // Reset form fields
        document.querySelector('.problem-textarea').value = '';
        document.querySelector('.contact-input').value = '';
    }
    
    // Add smooth scrolling for better UX
    function smoothScroll(element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => modal.remove());
        }
    });
    
    // Add loading state to submit buttons
    function setLoadingState(button, isLoading) {
        if (isLoading) {
            button.disabled = true;
            button.style.opacity = '0.7';
            button.innerHTML = '<span>Envoi en cours...</span>';
        } else {
            button.disabled = false;
            button.style.opacity = '1';
            // Restore original text based on button type
            if (button.classList.contains('feedback-submit')) {
                button.innerHTML = 'Envoyer le Feedback';
            } else {
                button.innerHTML = 'Signaler le Problème';
            }
        }
    }
    
    // Add input validation feedback
    const textareas = document.querySelectorAll('textarea');
    const inputs = document.querySelectorAll('input[type="email"]');
    
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            if (this.value.trim().length > 0) {
                this.style.borderColor = '#4caf50';
            } else {
                this.style.borderColor = '#e0e0e0';
            }
        });
    });
    
    inputs.forEach(input => {
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
    
    // Add character count for textareas
    textareas.forEach(textarea => {
        const maxLength = 500;
        const counter = document.createElement('div');
        counter.style.cssText = `
            text-align: right;
            font-size: 0.8rem;
            color: #666;
            margin-top: 5px;
            font-family: 'Poppins', sans-serif;
        `;
        
        textarea.parentNode.appendChild(counter);
        
        function updateCounter() {
            const remaining = maxLength - textarea.value.length;
            counter.textContent = `${textarea.value.length}/${maxLength} caractères`;
            
            if (remaining < 50) {
                counter.style.color = '#f44336';
            } else if (remaining < 100) {
                counter.style.color = '#ff9800';
            } else {
                counter.style.color = '#666';
            }
        }
        
        textarea.addEventListener('input', updateCounter);
        textarea.setAttribute('maxlength', maxLength);
        updateCounter();
    });
});