'use strict';


const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginButton');
const signupButton = document.getElementById('signupButton');

if (loginButton) {
  loginButton.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        window.location.href = 'index.html';
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}

if (signupButton) {
  signupButton.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        window.location.href = 'index.html';
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}
