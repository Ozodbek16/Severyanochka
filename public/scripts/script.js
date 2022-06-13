var val_0 = document.querySelector(".filtr_bottom_price button");

var elem = document.querySelector(".multi-range .price_first1");
var target = document.querySelector(".price_first");

let bars = document.querySelector(".bars");
let btnbars = document.querySelector(".btn-bars");
// bars.style.display = "none";

btnbars.addEventListener("click", () => {
 
});

var rangeValue = function () {
  var newValue = elem.value;
  target.value = newValue;
};

elem.addEventListener("input", rangeValue);

var elem2 = document.querySelector(".multi-range .price_lest1");
var target2 = document.querySelector(".price_lest");

var rangeValue2 = function () {
  var newValue2 = elem2.value;
  target2.value = newValue2;
};
elem2.addEventListener("input", rangeValue2);

val_0.addEventListener("click", function () {
  target.value = 0;
  target2.value = 100;
});
