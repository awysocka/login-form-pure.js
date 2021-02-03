import { route } from './router';
import './main.scss';

route('/', 'home', function() {
  this.title = 'Login'

  function usernameInputValidation() {
    const usernameInput = document.getElementById('username');
    const usernameValidationMessage = document.getElementById('username-validation-message');

    if (usernameInput.value == null || usernameInput.value === '') {
      usernameValidationMessage.innerText = "Please enter the username."
      return false
    } else {
      usernameValidationMessage.innerText = ""
      return true
    }
  }  

  function passwordInputValidation() {
    const passwordInput = document.getElementById('password');
    const passwordValidationMessage = document.getElementById('password-validation-message');

    if (passwordInput.value == null || passwordInput.value === '') {
      passwordValidationMessage.innerText = "Please enter the password."
      return false
    } else {
      passwordValidationMessage.innerText = ""
      return true
    }
  }

  this.$on('#username', 'input', usernameInputValidation);
  this.$on('#username', 'blur', usernameInputValidation);
  this.$on('#password', 'input', passwordInputValidation);
  this.$on('#password', 'blur', passwordInputValidation);

  this.$on('#login-form', 'submit', (e) => {
    e.preventDefault();

    const usernameValid = usernameInputValidation();
    const passwordValid = passwordInputValidation(); 

    if (usernameValid && passwordValid) {

      const data = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
      }
    
      fetch('https://zwzt-zadanie.netlify.app/api/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          window.location.href = "#/success";
        } else if (response.status === 401) {
          document.getElementById('password-validation-message').innerText = 'Wrong password!'
        } else {
          document.getElementById('error-validation-message').innerText = 'Oops! Something went wrong! Please try again later.'
        }
      })
      .catch((error) => {
        document.getElementById('error-validation-message').innerText = 'Oops! Something went wrong! Please try again later.'
        console.error(error)
      });
    }
  });
});

route('/success', 'success', function() {
  this.title = 'Login successful!';
});

route('/ex2', 'example2', function() {
  this.title = 'Example 2';
  this.counter = 0;
  this.$on('.my-button', 'click', () => {
    this.counter += 1;
    this.$refresh();
  });
});

route('*', '404', function () {});
