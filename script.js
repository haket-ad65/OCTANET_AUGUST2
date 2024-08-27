document.addEventListener("DOMContentLoaded", function() {
    // Helper function to set error messages
    function setError(message, errorId) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = message ? 'block' : 'none';
        }
    }

    // Helper function to validate email
    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    // Code for the todo list page
    const taskInput = document.getElementById("new-task");
    const addBtn = document.getElementById("add-btn");
    const taskList = document.getElementById("task-list");

    if (taskInput && addBtn && taskList) {
        addBtn.addEventListener("click", function() {
            const taskText = taskInput.value.trim();
            if (taskText !== "") {
                const li = document.createElement("li");
                li.textContent = taskText;

                const compBtn = document.createElement("button");
                compBtn.textContent = "Complete";
                compBtn.addEventListener("click", function() {
                    li.classList.toggle("completed");
                });

                const delBtn = document.createElement("button");
                delBtn.textContent = "Delete";
                delBtn.addEventListener("click", function() {
                    taskList.removeChild(li);
                });

                li.appendChild(compBtn);
                li.appendChild(delBtn);
                taskList.appendChild(li);
                taskInput.value = "";
            }
        });
    } else {
        console.error("One or more elements not found on todo list page");
    }

    // Code for the login/register page
    const showRegist = document.getElementById("show-regist");
    const showLogin = document.getElementById("show-login");
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const formTitle = document.getElementById("form-title");

    if (showRegist && showLogin && loginForm && registerForm && formTitle) {
        showRegist.addEventListener("click", function() {
            loginForm.style.display = "none";
            registerForm.style.display = "block";
            formTitle.textContent = "Register";
        });

        showLogin.addEventListener("click", function() {
            loginForm.style.display = "block";
            registerForm.style.display = "none";
            formTitle.textContent = "Login";
        });
    } else {
        console.error("One or more elements not found on login/register page");
    }

    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const userName = document.getElementById('register-username');
    const regEmail = document.getElementById('register-email');
    const regPass = document.getElementById('register-password');
    const loginErrorElement = document.getElementById('loginerrormsg');
    const registerErrorElement = document.getElementById('registerrormsg');

    // Validation of Login form
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const eMail = emailInput.value.trim();
            const pwd = passwordInput.value.trim();

            if (eMail === '') {
                setError('Email is required', 'loginerrormsg');
            } else if (pwd === '') {
                setError('Password is required', 'loginerrormsg');
            } else if (!validateEmail(eMail)) {
                setError('Invalid email address', 'loginerrormsg');
            } else if (pwd.length < 8) {
                setError('Password should contain at least 8 characters', 'loginerrormsg');
            } else {
                console.log(`Logging in with email ${eMail} and password: ${pwd}`);
                localStorage.setItem('email', eMail);
                // Redirect or perform further actions
            }
        });
    }

    // Validation of Registration form
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const eMail = regEmail.value.trim();
            const uname = userName.value.trim();
            const pwd = regPass.value.trim();

            if (eMail === '') {
                setError('Email is required', 'registerrormsg');
            } else if (pwd === '') {
                setError('Password is required', 'registerrormsg');
            } else if (uname === '') {
                setError('Username is required', 'registerrormsg');
            } else if (!validateEmail(eMail)) {
                setError('Invalid email address', 'registerrormsg');
            } else if (pwd.length < 8) {
                setError('Password should contain at least 8 characters', 'registerrormsg');
            } else if (uname.length < 3) {
                setError('Username should contain more than 3 characters', 'registerrormsg');
            } else {
                console.log(`Registering with email ${eMail} and password: ${pwd}`);
                localStorage.setItem('username', uname);
                localStorage.setItem('email', eMail);
                window.location.href = 'profile.html';
            }
        });
    }

    // Profile Page JavaScript
    if (document.getElementById('profile')) {
        const profUsername = document.getElementById('pro-username');
        const profEmail = document.getElementById('pro-email');
        const chProForm = document.getElementById('change-pro-form');
        const editProForm = document.getElementById('edit-pro-form');

        const username = localStorage.getItem('username');
        const email = localStorage.getItem('email');

        profUsername.textContent = username || '[UserName]';
        profEmail.textContent = email || '[User Email]';

        // Event listener for edit profile form
        if (editProForm) {
            editProForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Edit profile form submitted');
                const newUsername = document.getElementById('edit-name').value.trim();
                const newEmail = document.getElementById('edit-email').value.trim();

                if (newUsername === '') {
                    setError('New username is required', 'edit-error-msg');
                } else if (newEmail === '') {
                    setError('New email is required', 'edit-error-msg');
                } else if (newUsername.length < 3) {
                    setError('New username must be at least 3 characters', 'edit-error-msg');
                } else if (!validateEmail(newEmail)) {
                    setError('Invalid email', 'edit-error-msg');
                } else {
                    localStorage.setItem('username', newUsername);
                    localStorage.setItem('email', newEmail);
                    console.log('Local storage updated:', localStorage.getItem('username'), localStorage.getItem('email'));

                    profUsername.textContent = newUsername;
                    profEmail.textContent = newEmail;
                    setError('', 'edit-error-msg'); // Clear error message
                }
            });
        }

        // Event listener for change password form
        if (chProForm) {
            chProForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const currentPwd = document.getElementById('current-pass').value.trim();
                const newPwd = document.getElementById('new-pass').value.trim();
                const confPwd = document.getElementById('confirm-pass').value.trim();

                if (currentPwd === '') {
                    setError('Current password is required', 'change-error-msg');
                } else if (newPwd === '') {
                    setError('New password is required', 'change-error-msg');
                } else if (confPwd === '') {
                    setError('Confirm password is required', 'change-error-msg');
                } else if (newPwd.length < 8) {
                    setError('New password should contain at least 8 characters', 'change-error-msg');
                } else if (newPwd !== confPwd) {
                    setError('Passwords do not match', 'change-error-msg');
                } else {
                    console.log(`Updating password from ${currentPwd} to ${newPwd}`);
                    // Add logic to handle password update
                    setError('', 'change-error-msg'); // Clear error message
                }
            });
        }
    }
});
