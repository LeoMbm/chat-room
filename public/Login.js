const loginForm = document.querySelector(".login");
const loginButton = document.querySelector(".loginBtn");
const showPwd = document.getElementById("checkbox");
const buttonPrevious = document.getElementById("previous-btn");

const maxAge = 3 * 24 * 60 * 60 * 1000;
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  if (!email || !password) alert("Please enter your email/password");

  try {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok == true) {
      loginButton.disabled = true;
      window.location.href = "http://localhost:3000/home";
    } else {
      alert("Email or password incorrect");
    }
  } catch (err) {
    console.log(err);
  }
});

showPwd.addEventListener("click", showPassword);

buttonPrevious.addEventListener("click", previousPage);

function showPassword() {
  const passwordField = document.getElementById("login-password");
  if (passwordField.type == "password") {
    passwordField.type = "text";
  } else {
    passwordField.type = "password";
  }
}
function previousPage() {
  let oldURL = document.referrer;

  window.location.href = oldURL;
}

// TODO: LOGOUT
