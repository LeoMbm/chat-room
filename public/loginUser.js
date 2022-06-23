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

function getUserdata() {
  const data = document.cookie.split("=");
  const name = document.querySelector(".wlcUser");
  name.innerHTML = `Hey ${data[1]} !`;
}

getUserdata();

// TODO: GET USERNAME BY FETCH ??? AND DISPLAY THAT
