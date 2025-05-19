// Email validation function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Password validation function
function validatePassword(password) {
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[@#$%^&*]/.test(password)
    };

    // Update requirement checks in UI
    document.getElementById('length-check').style.color = requirements.length ? '#4ade80' : '#gray-400';
    document.getElementById('uppercase-check').style.color = requirements.uppercase ? '#4ade80' : '#gray-400';
    document.getElementById('lowercase-check').style.color = requirements.lowercase ? '#4ade80' : '#gray-400';
    document.getElementById('number-check').style.color = requirements.number ? '#4ade80' : '#gray-400';
    document.getElementById('special-check').style.color = requirements.special ? '#4ade80' : '#gray-400';

    return Object.values(requirements).every(Boolean);
}

// Add password input listener for real-time validation
document.getElementById('password').addEventListener('input', function(e) {
    validatePassword(e.target.value);
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validate email format
    if (!validateEmail(email)) {
        swal({
            title: "Invalid Email!",
            text: "Please enter a valid email address",
            icon: "error",
            button: "Try Again",
        });
        return;
    }

    // Validate password format
    if (!validatePassword(password)) {
        swal({
            title: "Invalid Password!",
            text: "Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters",
            icon: "error",
            button: "Try Again",
        });
        return;
    }
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        swal({
            title: "Error!",
            text: "Invalid email or password!",
            icon: "error",
            button: "Try Again",
        });
        return;
    }
    
    // Show success alert using SweetAlert
    swal({
        title: "Welcome!",
        text: `Welcome back, ${user.name}!`,
        icon: "success",
        button: "Continue",
    }).then(() => {
        // Redirect to home page after clicking the button
        window.location.href = 'index.html';
    });
});