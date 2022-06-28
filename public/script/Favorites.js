let togle = document.querySelector(".togle");
let togleA = document.querySelector(".togle_one");
let togleB = document.querySelector(".togle_two");

togleA.addEventListener("click", () => {
  togle.style.background = "#70c05b";
  togleA.style.transition = ".3s";
  togleA.style.opacity = "0";
  togleB.style.opacity = "1";
});
togleB.addEventListener("click", () => {
  togle.style.background = "#4b1807";
  togleB.style.transition = ".3s";
  togleB.style.opacity = "0";
  togleA.style.opacity = "1";
});
