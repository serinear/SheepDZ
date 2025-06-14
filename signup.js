document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation item
    const currentPath = window.location.pathname;
    
    // Clear all active states first
    document.querySelectorAll('.navbar nav a').forEach(link => link.classList.remove('active'));
    document.getElementById('login-btn').classList.remove('active');
    
    // Set active state based on current page
    if (currentPath.includes('signup.html')) {
        document.getElementById('signup-link').classList.add('active');
    } else if (currentPath.includes('login.html')) {
        document.getElementById('login-btn').classList.add('active');
    } else if (currentPath.includes('index.html') || currentPath === '/' || currentPath.endsWith('/')) {
        document.getElementById('home-link').classList.add('active');
    }
    
    const signupForm = document.getElementById('signupForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            
            // Basic validation
            if (!phone || !password) {
                alert('Veuillez remplir tous les champs.');
                return;
            }
            
            // Phone number validation (Algerian format)
            const phoneRegex = /^0[567][0-9]{8}$/;
            if (!phoneRegex.test(phone)) {
                alert('Veuillez entrer un numéro de téléphone valide (format: 05XXXXXXXX, 06XXXXXXXX ou 07XXXXXXXX).');
                return;
            }
            
            // Password validation
            if (password.length < 6) {
                alert('Le mot de passe doit contenir au moins 6 caractères.');
                return;
            }
            
            // Simulate registration success
            // In a real application, you would send this data to your server
            console.log('Registration data:', { phone, password });
            
            // Store user data in localStorage (for demo purposes only)
            // In a real application, this would be handled securely on the server
            localStorage.setItem('registeredPhone', phone);
            localStorage.setItem('registeredPassword', password);
            
            // Redirect to login page
            alert('Inscription réussie! Veuillez vous connecter.');
            window.location.href = 'login.html';
        });
    }
});