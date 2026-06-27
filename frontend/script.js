const API_URL = 'http://localhost:5000';

function showTab(tab) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(el => el.classList.remove('active'));

    // Show selected tab
    document.getElementById(tab).classList.add('active');
    event.currentTarget.classList.add('active');
}

function showMessage(elementId, message, isSuccess) {
    const msgEl = document.getElementById(elementId);
    msgEl.textContent = message;
    msgEl.className = `message ${isSuccess ? 'success' : 'error'}`;
    msgEl.style.display = 'block';

    setTimeout(() => {
        msgEl.style.display = 'none';
    }, 4000);
}

// Login Form
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            showMessage('loginMessage', `Welcome back, ${data.user.username}! Login successful.`, true);
            document.getElementById('loginForm').reset();
        } else {
            showMessage('loginMessage', data.error || 'Login failed', false);
        }
    } catch (error) {
        showMessage('loginMessage', 'Cannot connect to server. Is the backend running?', false);
    }
});

// Register Form
document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            showMessage('registerMessage', 'Account created successfully! You can now login.', true);
            document.getElementById('registerForm').reset();
            // Switch to login tab after successful registration
            setTimeout(() => {
                document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
                document.getElementById('login').classList.add('active');
                document.querySelectorAll('.tab-button').forEach(el => el.classList.remove('active'));
                document.querySelector('.tab-button').classList.add('active');
            }, 1500);
        } else {
            showMessage('registerMessage', data.error || 'Registration failed', false);
        }
    } catch (error) {
        showMessage('registerMessage', 'Cannot connect to server. Is the backend running?', false);
    }
});