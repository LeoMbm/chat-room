// const { response } = require("express");
const form = document.querySelector("form");
const button = document.querySelector("button");

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

    window.location.href = "http://localhost:3000/welcome";
    button.disabled = true;
  } catch (err) {
    console.log(err);
  }
});
