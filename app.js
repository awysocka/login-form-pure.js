import { route } from './router';
import './sass/main.scss';
import homeView from './views/home.html';
import successView from './views/success.html';
import notFoundView from './views/404.html';


route('/', 'home', function() {
  this.title = 'Login'

  document.getElementById("home").innerHTML = homeView;

  function usernameInputValidation() {
    const usernameInput = document.getElementById('username');
    const usernameValidationMessage = document.getElementById('username-validation-message');

    if (usernameInput.value == null || usernameInput.value === '') {
      usernameValidationMessage.innerText = "Please enter the username.";
      usernameInput.classList.add('login-form__input--error');
      return false
    } else {
      usernameValidationMessage.innerText = "";
      usernameInput.classList.remove('login-form__input--error');
      return true
    }
  }  

  function passwordInputValidation() {
    const passwordInput = document.getElementById('password');
    const passwordValidationMessage = document.getElementById('password-validation-message');

    if (passwordInput.value == null || passwordInput.value === '') {
      passwordValidationMessage.innerText = "Please enter the password.";
      passwordInput.classList.add('login-form__input--error');
      return false
    } else {
      passwordValidationMessage.innerText = "";
      passwordInput.classList.remove('login-form__input--error');
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
          document.getElementById('password').classList.add('login-form__input--error')
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

  document.getElementById("success").innerHTML = successView;
});

route('*', '404', function () {
  document.getElementById("404").innerHTML = notFoundView;
});
