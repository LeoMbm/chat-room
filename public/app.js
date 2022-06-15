// const { response } = require("express");
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = form.firstName.value;
  const lastName = form.lastName.value;
  const username = form.username.value;
  const email = form.email.value;
  const password = form.password.value;

  try {
    const res = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, username, email, password }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log(err);
  }
});

// const lastName = document.getElementById("lastName");
// const username = document.getElementById("username");
// const firstName = document.getElementById("firstName");
// const email = document.getElementById("email");
// const password = document.getElementById("password");
// const btn = document.querySelector(".signUpBtn");

// btn.addEventListener("click", postData);

// async function postData()
//     const data = {
//         "firstName": firstName.value,
//         "lastName": lastName.value,
//         "username": username.value,
//         "email": email.value,
//         "password": password.value};

//     fetch('localhost:3000/api/register', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//         })
//     .then(response => response.json())
//     .then(data => {
//     console.log('Success:', data);
//     })
//     .catch((error) => {
//     console.error('Error:', error);
// });

// async function postData() {
//   const data = {
//     firstName: firstName.value,
//     lastName: lastName.value,
//     username: username.value,
//     email: email.value,
//     password: password.value,
//     created_at: "",
//   };

//   const req = await fetch("http://localhost:3000/api/register", {
//     method: 'POST',
//     body: JSON.stringify(data),
//   });
//   console.log(firstName.value);
//   console.log(lastName.value);
//   console.log(username.value);
//   console.log(email.value);
//   return req.json();
// }

// body: JSON.stringify(data),

// async function getData() {
//   const req = await fetch("http://localhost:3000/api/users");
//   const data = await req.json();
//   console.log(data);
// }

// getData();