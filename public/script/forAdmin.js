const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  document.querySelectorAll("input").forEach((inp) => {
    if (!inp.value) {
      e.preventDefault();
    }
  });
});