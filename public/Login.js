const loginForm = document.querySelector(".login");
const loginButton = document.querySelector(".loginBtn");

const maxAge = 3 * 24 * 60 * 60 * 1000;
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  if (!email || !password) alert("Please enter your email/password");

  try {
    const res = fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    window.location.href = "http://localhost:3000/info";
    loginButton.disabled = true;
  } catch (err) {
    console.log(err);
  }
});

// TODO: LOGIN, GET COOKIE
// FIXME: BAD REQUEST FORM
