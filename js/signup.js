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

// Email validation function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add password input listener
document.getElementById('password').addEventListener('input', function(e) {
    validatePassword(e.target.value);
});

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validate email
    if (!validateEmail(email)) {
        swal({
            title: "Invalid Email!",
            text: "Please enter a valid email address",
            icon: "error",
            button: "Try Again",
        });
        return;
    }

    // Validate password
    if (!validatePassword(password)) {
        swal({
            title: "Weak Password!",
            text: "Please ensure your password meets all the requirements",
            icon: "error",
            button: "Try Again",
        });
        return;
    }
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.find(user => user.email === email);
    
    if (userExists) {
        swal({
            title: "Error!",
            text: "An account with this email already exists!",
            icon: "error",
            button: "Try Again",
        });
        return;
    }
    
    // Store user data
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    // Show success alert
    swal({
        title: "Success!",
        text: "Your account has been created successfully!",
        icon: "success",
        button: "Continue to Login",
    }).then(() => {
        window.location.href = 'login.html';
    });
});