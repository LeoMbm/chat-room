const buttonPrevious = document.getElementById("previous-btn");

buttonPrevious.addEventListener("click", previousPage);

function previousPage() {
  let oldURL = document.referrer;

  window.location.href = oldURL;
  console.log(oldURL);
}
