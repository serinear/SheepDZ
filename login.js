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
    
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            // Basic validation
            if (!phone || !password) {
                alert('Veuillez remplir tous les champs.');
                return;
            }
            
            // Retrieve stored credentials (for demo purposes only)
            // In a real application, authentication would be handled securely on the server
            const registeredPhone = localStorage.getItem('registeredPhone');
            const registeredPassword = localStorage.getItem('registeredPassword');
            
            // Check if credentials match
            if (phone === registeredPhone && password === registeredPassword) {
                // If "remember me" is checked, store a token
                if (remember) {
                    localStorage.setItem('authToken', 'demo-token-' + Date.now());
                }
                
                // Redirect to home page after successful login
                alert('Connexion réussie!');
                window.location.href = 'index.html';
            } else {
                alert('Numéro de téléphone ou mot de passe incorrect.');
            }
        });
    }
    
    // Check if user is already logged in (for demo purposes)
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
        // You might want to validate the token here in a real application
        console.log('User is already logged in with token:', authToken);
    }
});