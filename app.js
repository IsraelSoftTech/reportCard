document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const toggleSignupBtn = document.getElementById('toggle-signup-btn');
    const signupContainer = document.getElementById('signup-container');

    // Handle account creation
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;
        const accountType = document.getElementById('signup-account-type').value;

        let users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(user => user.username === username);

        if (existingUser) {
            alert('Username already exists. Please choose a different one.');
        } else {
            users.push({ username, password, accountType });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Account created successfully.');
            signupContainer.classList.add('hidden'); // Hide the signup form after successful creation
        }

        signupForm.reset();
    });

    // Handle login
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const accountType = document.getElementById('account-type').value;

        let users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === username && user.password === password && user.accountType === accountType);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            if (accountType === 'Admin') {
                window.location.href = 'admin.html';
            } else if (accountType === 'Teacher') {
                window.location.href = 'teacher.html';
            }
        } else {
            alert('Invalid login credentials.');
        }

        loginForm.reset();
    });

    // Toggle signup form visibility
    toggleSignupBtn.addEventListener('click', () => {
        signupContainer.classList.toggle('hidden');
    });
});
