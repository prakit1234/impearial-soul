// Get Firebase Auth instance
const auth = firebase.auth();

// Phone number authentication
function setupPhoneAuth() {
    // Set up recaptcha verifier
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'normal',
        'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignInSubmit();
        }
    });

    window.recaptchaVerifier.render();
}

// Function to send verification code
function sendVerificationCode(phoneNumber) {
    auth.signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
        .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message.
            window.confirmationResult = confirmationResult;
            document.getElementById('verification-code-container').style.display = 'block';
        }).catch((error) => {
            // Error; SMS not sent
            console.error('Error sending verification code:', error);
            alert('Error sending verification code. Please try again.');
        });
}

// Function to verify code
function verifyCode(code) {
    window.confirmationResult.confirm(code)
        .then((result) => {
            // User signed in successfully.
            const user = result.user;
            document.getElementById('loginModal').style.display = 'none';
            updateUIForLoggedInUser(user);
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            console.error('Error verifying code:', error);
            alert('Invalid verification code. Please try again.');
        });
}

// Update UI for logged in user
function updateUIForLoggedInUser(user) {
    const loginBtn = document.getElementById('loginBtn');
    loginBtn.textContent = 'Logout';
    loginBtn.onclick = () => {
        auth.signOut().then(() => {
            loginBtn.textContent = 'Login';
            loginBtn.onclick = () => {
                document.getElementById('loginModal').style.display = 'block';
            };
        });
    };
}

// Listen for auth state changes
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        updateUIForLoggedInUser(user);
    } else {
        // User is signed out
        const loginBtn = document.getElementById('loginBtn');
        loginBtn.textContent = 'Login';
        loginBtn.onclick = () => {
            document.getElementById('loginModal').style.display = 'block';
        };
    }
}); 