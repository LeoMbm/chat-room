const button = document.querySelector("#logout-btn");

button.addEventListener("click", logout);

async function logout(e) {
  try {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.href = "http://localhost:3000/";
  } catch (err) {
    console.log(err);
  }
}

// async function getUserdata() {
//   const res = await fetch(`http://localhost:3000/api/users`);

//   const data = await res.json();
//   console.log(data);
// }

// getUserdata();

// TODO: GET USERNAME BY FETCH ??? AND DISPLAY THAT
