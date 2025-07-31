// Element Selectors
let showLoginFrom = document.getElementById("hide-loginFrom");
let btnLogin = document.getElementById("btn-login");
let btnLogout = document.getElementById("btn-logout");
let homePages = document.getElementById("homePage");
let closeBtn = document.getElementById("closeBtn");
let startingPage = document.getElementById("startingPage");

const nameInputForUser = document.getElementById("nameInputForUser");
const emailInputForUser = document.getElementById("emailInputForUser");
const passwordInputForUser = document.getElementById("passwordInputForUser");
const passwordConfirmInputForUser = document.getElementById("passwordConfirmInputForUser");

// Navbar Script
// Handles active states and collapse of Bootstrap navbar

document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const loginBtn = document.getElementById("btn-login");
  const navbarCollapse = document.getElementById("navbarNav");

  function clearActive() {
    navLinks.forEach(link => link.classList.remove("active"));
    loginBtn.classList.remove("active");
  }

  function closeNavbar() {
    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
    if (bsCollapse) bsCollapse.hide();
  }

  navLinks.forEach(link => {
    link.addEventListener("click", function () {
      clearActive();
      this.classList.add("active");
      closeNavbar();
    });
  });

  loginBtn.addEventListener("click", function () {
    clearActive();
    document.querySelector(".nav-link[href='#']").classList.add("active");
    closeNavbar();
  });
});

// Toggle Login Form
function loginFormFunc() {
  showLoginFrom.classList.toggle("hide-loginFrom");
  homePages.classList.toggle("hide");
}

// Show login form when login button clicked
btnLogin.addEventListener("click", () => {
  loginFormFunc();
  startingPage.classList.toggle("hide");
});

// Close login form when close button clicked
closeBtn.addEventListener("click", () => {
  loginFormFunc();
  startingPage.classList.remove("hide");
});

// Show login form by default if not remembered
window.addEventListener("DOMContentLoaded", () => {
  const remembered = localStorage.getItem("rememberedUser");
  if (remembered) {
    startingPage.classList.remove("hide");
    showLoginFrom.classList.add("hide-loginFrom");
    btnLogout.classList.remove("d-none");
    btnLogin.classList.add("d-none");
  } else {
    showLoginFrom.classList.remove("hide-loginFrom");
    homePages.classList.add("hide");
    startingPage.classList.toggle("hide");
  }
});

// Signup and Forgot Password Toggle Logic
document.addEventListener("DOMContentLoaded", function () {
  const signupBtn = document.getElementById("btn-signup-submit");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const showSignInLink = document.getElementById("showSignIn");
  const showSignIn2 = document.getElementById("showSignIn2");
  const forgotPassword = document.getElementById("forgotPassword");
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");

  forgotPassword.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.add("d-none");
    forgotPasswordForm.classList.remove("d-none");
  });

  signupBtn.addEventListener("click", function (e) {
    e.preventDefault();
    loginForm.classList.add("d-none");
    signupForm.classList.remove("d-none");
  });

  showSignInLink.addEventListener("click", function (e) {
    e.preventDefault();
    signupForm.classList.add("d-none");
    loginForm.classList.remove("d-none");
    nameInputForUser.value = "";
    emailInputForUser.value = "";
    passwordInputForUser.value = "";
    passwordConfirmInputForUser.value = "";
  });

  showSignIn2.addEventListener("click", function (e) {
    e.preventDefault();
    signupForm.classList.add("d-none");
    loginForm.classList.remove("d-none");
    forgotPasswordForm.classList.add("d-none");
  });

  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    signupForm.classList.add("d-none");
    loginForm.classList.remove("d-none");
  });
});

// Signup Form Validation and Local Storage Save
{
  let existingUsers = JSON.parse(localStorage.getItem("userValidationDetails")) || [];
  const createAccountBtn = document.getElementById("createAccountBtn");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  createAccountBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const signupForm2 = document.getElementById("signupForm");
    const loginForm2 = document.getElementById("loginForm");

    const userName = nameInputForUser.value.trim();
    const userEmail = emailInputForUser.value.trim();
    const userPassword = passwordInputForUser.value.trim();
    const userConfirmPassword = passwordConfirmInputForUser.value.trim();

    let isValid = true;

    if (userName === "") {
      nameError.classList.remove("d-none");
      nameError.textContent = "Name is required";
      isValid = false;
    } else nameError.classList.add("d-none");

    if (!emailPattern.test(userEmail)) {
      emailError.classList.remove("d-none");
      emailError.textContent = "Enter a valid email address";
      isValid = false;
    } else emailError.classList.add("d-none");

    if (userPassword.length < 6) {
      passwordError.classList.remove("d-none");
      passwordError.textContent = "Password must be at least 6 characters";
      isValid = false;
    } else passwordError.classList.add("d-none");

    if (userConfirmPassword !== userPassword) {
      confirmPasswordError.classList.remove("d-none");
      confirmPasswordError.textContent = "Passwords do not match";
      isValid = false;
    } else confirmPasswordError.classList.add("d-none");

    if (isValid) {
      const emailExists = existingUsers.some((user) => user.email === userEmail);
      if (emailExists) {
        Swal.fire({
          icon: 'error',
          title: 'Oops! Email Exists',
          text: 'This email is already registered. Try logging in or use another one.',
          confirmButtonText: 'Got it',
          customClass: {
            popup: 'animated-popup',
            title: 'swal-title-modern',
            htmlContainer: 'swal-text-modern',
            confirmButton: 'swal-btn-modern'
          },
          showClass: { popup: 'animate__animated animate__fadeInDown' },
          hideClass: { popup: 'animate__animated animate__fadeOutUp' }
        });
        return;
      }

      Swal.fire({
        icon: 'success',
        title: 'Account Created!',
        text: 'Your account has been successfully created. Redirecting to login...',
        timer: 2000,
        showConfirmButton: false
      });

      const newUser = {
        id: Date.now(),
        userName: userName,
        email: userEmail,
        password: userPassword,
      };

      existingUsers.push(newUser);
      localStorage.setItem("userValidationDetails", JSON.stringify(existingUsers));

      signupForm2.classList.add("d-none");
      loginForm2.classList.remove("d-none");

      nameInputForUser.value = "";
      emailInputForUser.value = "";
      passwordInputForUser.value = "";
      passwordConfirmInputForUser.value = "";
    }
  });
}

// Email + Password Validation for Login
{
  let emailInputFromUser = document.getElementById("emailInputFromUser");
  let passwordInputFromUser = document.getElementById("passwordInputFromUser");
  let signInNowbtn = document.getElementById("signInNowbtn");

  function accountValidationFunc(email, password) {
    let dataFromLocalStore = JSON.parse(localStorage.getItem("userValidationDetails")) || [];
    let loginEmailError = document.getElementById("loginEmailError");
    let loginPasswordError = document.getElementById("loginPasswordError");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "" || !emailPattern.test(email)) {
      loginEmailError.classList.remove("d-none");
      Swal.fire({ icon: 'error', title: 'Invalid Email Address', text: 'Please enter a valid email to continue logging in.' });
      return;
    }

    if (password === "") {
      loginPasswordError.classList.remove("d-none");
      loginEmailError.classList.add("d-none");
      Swal.fire({ icon: 'error', title: 'Invalid Password', text: 'Please enter a valid password to continue logging in.' });
      return;
    }

    const userFound = dataFromLocalStore.find(user => user.email === email && user.password === password);

    if (userFound) {
      const rememberMe = document.getElementById("rememberMe").checked;
      if (rememberMe) localStorage.setItem("rememberedUser", email);
      else localStorage.removeItem("rememberedUser");

      loginFormFunc();
      startingPage.classList.remove("hide");
      btnLogout.classList.remove("d-none");
      btnLogin.classList.add("d-none");

      Swal.fire({ icon: 'success', title: 'Login Successful!', text: 'You have successfully logged in.', timer: 1000, showConfirmButton: false });
      return;
    } else {
      Swal.fire({ icon: 'error', title: 'Login Failed', text: 'Email or password does not match our records. Please try again or create a new account.' });
      return;
    }
  }

  signInNowbtn.addEventListener("click", (e) => {
    e.preventDefault();
    let emailByUser = emailInputFromUser.value.trim();
    let passwordByUser = passwordInputFromUser.value.trim();
    accountValidationFunc(emailByUser, passwordByUser);
  });
}

// Logout Functionality
btnLogout.addEventListener("click", (e) => {
  e.preventDefault();
  Swal.fire({ icon: 'success', title: 'Logout Successful!', text: 'You have been logged out successfully.', timer: 2000, showConfirmButton: false });
  localStorage.removeItem("rememberedUser");
  location.reload();
});

// Forgot Password & OTP Update Logic
{
  const dataFromLocalStore = JSON.parse(localStorage.getItem("userValidationDetails")) || [];

  let uniqueId = "";
  let generatedOtp = "";
  let userEmailForReset = "";

  document.getElementById("sendOtpBtn").addEventListener("click", function () {
    const email = document.getElementById("forgotEmailInput").value.trim();
    userEmailForReset = email;
    let userFound = false;

    for (let eachUser of dataFromLocalStore) {
      if (eachUser.email.trim().toLowerCase() === email.toLowerCase()) {
        userFound = true;
        uniqueId = eachUser.id;
        generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        break;
      }
    }

    if (email === "" || !email.includes("@") || !userFound) {
      Swal.fire({ icon: 'error', title: 'Invalid Email!', text: 'Please enter a valid email address.' });
    } else {
      Swal.fire({ icon: 'info', title: 'OTP Sent!', text: `Your OTP is: ${generatedOtp}`, timer: 4000, showConfirmButton: true });
      document.getElementById("otpInputContainer").classList.remove("d-none");
    }
  });

  document.getElementById("forgotPasswordForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const newPass = document.getElementById("newPasswordInput").value.trim();
    const confirmPass = document.getElementById("confirmNewPasswordInput").value.trim();
    const enteredOtp = document.getElementById("otpInput").value.trim();

    if (enteredOtp !== generatedOtp) {
      Swal.fire({ icon: 'error', title: 'Incorrect OTP!', text: 'The OTP you entered is not correct.' });
      return;
    }

    if (newPass.length < 6) {
      Swal.fire({ icon: 'error', title: 'Weak Password!', text: 'Password must be at least 6 characters.' });
      return;
    }

    if (newPass !== confirmPass) {
      Swal.fire({ icon: 'error', title: 'Mismatch!', text: 'Passwords do not match.' });
      return;
    }

    const updatedUsers = dataFromLocalStore.map(user => {
      if (user.id === uniqueId) {
        return { ...user, password: newPass };
      }
      return user;
    });

    localStorage.setItem("userValidationDetails", JSON.stringify(updatedUsers));

    Swal.fire({ icon: 'success', title: 'Password Reset!', text: 'Your password has been successfully updated. Redirecting to login...', timer: 3000, showConfirmButton: false });

    setTimeout(() => {
      signupForm.classList.add("d-none");
      loginForm.classList.remove("d-none");
      forgotPasswordForm.classList.add("d-none");
    }, 2000); 
    document.getElementById("forgotPasswordForm").reset();
    document.getElementById("otpInputContainer").classList.add("d-none");
  });
}

// Section loading script 
{

  const sections = document.querySelectorAll('section');
  const loadSection = (section) => {
    const src = section.getAttribute('data-src');
    if (src && !section.classList.contains('loaded')) {
      document.getElementById('spinner').style.display = 'block';
      fetch(src)
         .then(res => res.text())
         .then(data => {
           section.innerHTML = data;
           section.classList.add('loaded');
           document.getElementById('spinner').style.display = 'none';
       
           // Load script if needed (like about.js)
           loadExtraScriptIfNeeded(src);
      });

    }
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;
        loadSection(section);
        section.classList.add('visible');
        obs.unobserve(section);
      }
    });
  }, {
    threshold: 0.3
  });

  sections.forEach(section => observer.observe(section));


function loadExtraScriptIfNeeded(src) {
  if (src.includes("about.html")) {
    const script = document.createElement("script");
    script.src = "about.js";
    document.body.appendChild(script);
  }
}

}