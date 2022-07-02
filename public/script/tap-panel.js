const orders_time_day = document.querySelectorAll(".orders_time_day");
const order_changes = document.querySelectorAll(".order_changes");
const orders_main_time = document.querySelectorAll(".orders_main_time");
const order_main = document.querySelectorAll(".order_main");
const aaa = document.querySelectorAll(".nav-button .aaa");
const carouselItems = document.querySelectorAll(".carousel_item");
const spans = document.querySelectorAll(".nav-button span");

orders_time_day.forEach((item, index) => {
  item.addEventListener("click", () => {
    item.classList.add("active");
    document.querySelectorAll(".order_changes").forEach((item2, index2) => {
      if (index == index2) {
        item2.classList.add("active");
      } else {
        item2.classList.remove("active");
        document
          .querySelectorAll(".orders_time_day")
          [index2].classList.remove("active");
      }
    });
  });
});

carouselItems.forEach((carouselItem) => {
  carouselItem.querySelectorAll(".nav-button").forEach((item, index) => {
    item.parentElement.parentElement.childNodes[3].childNodes.forEach(
      (element) => {
        element.addEventListener("click", (e) => {
          item.parentElement.parentElement.childNodes[3].classList.add(
            "closed"
          );
          carouselItem
            .querySelectorAll(".nav-button .aaa")
            [index].classList.remove("active");
          item.style.background =
            element.childNodes[3].getAttribute("data-color");
          item.children[1].innerHTML = element.children[1].innerHTML;
          item.children[0].src = element.children[0].src;
        });
      }
    );

    item.addEventListener(
      "click",
      function () {
        this.parentNode.parentNode.childNodes[3].classList.toggle("closed");
        const isClosed =
          this.parentNode.parentNode.childNodes[3].classList.contains("closed");
        isClosed
          ? carouselItem
              .querySelectorAll(".nav-button .aaa")
              [index].classList.remove("active")
          : carouselItem
              .querySelectorAll(".nav-button .aaa")
              [index].classList.add("active");
      },
      false
    );
  });

  carouselItem.querySelectorAll(".orders_main_time").forEach((item, index) => {
    item.addEventListener("click", () => {
      item.classList.add("active");
      carouselItem.querySelectorAll(".order_main").forEach((item2, index2) => {
        if (index == index2) {
          item2.classList.add("active");
        } else {
          item2.classList.remove("active");
          carouselItem
            .querySelectorAll(".orders_main_time")
            [index2].classList.remove("active");
        }
      });
    });
  });
});
