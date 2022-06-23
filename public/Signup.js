// const { response } = require("express");
const form = document.querySelector("form");
const button = document.querySelector("button");
const showPwd = document.getElementById("checkbox");
const buttonPrevious = document.getElementById("previous-btn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = form.firstName.value;
  const lastName = form.lastName.value;
  const username = form.username.value;
  const email = form.email.value;
  const password = form.password.value;
  if (!firstName || !lastName || !username || !email || !password)
    return alert("Please don't leave the fields empty");
  try {
    const res = await fetch("http://localhost:3000/signup", {
      method: "POST",
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    console.log(res);
    if (res.status == 401) {
      alert("User Already exist");
    } else {
      button.disabled = true;
      window.location.href = "http://localhost:3000/welcome";
    }
  } catch (err) {
    console.log(err);
  }
});

showPwd.addEventListener("click", showPassword);

buttonPrevious.addEventListener("click", previousPage);

function showPassword() {
  const passwordField = document.getElementById("password");
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
