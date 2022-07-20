window.addEventListener("load", function (e) {
  const productItemFormMinus = document.querySelectorAll(
    ".cards_card_count_p span button.minus"
  );
  const productItemFormPlus = document.querySelectorAll(
    ".cards_card_count_p span button.plus"
  );
  const productItemFormCount = document.querySelectorAll(
    ".cards_card_count_p span .product_count"
  );

  const total_price = document.querySelector(".total_price");

  function fetchCount(productid, mode) {
    return new Promise((resolve, reject) => {
      fetch(`/shopping/upload/${productid}/${mode}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
      })
        .then((res) => res.json())
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  productItemFormMinus.forEach((minus, index) => {
    minus.addEventListener("click", () => {
      const productid = minus.getAttribute("data-productid");

      fetchCount(productid, "minus")
        .then((res) => {
          productItemFormCount[index].innerHTML = res.data.count;
          total_price.innerHTML = res.data.price;
          console.log(res);
        })
        .catch((err) => {
          alert(err);
        });
    });
    productItemFormPlus[index].addEventListener("click", () => {
      const productid =
        productItemFormPlus[index].getAttribute("data-productid");

      fetchCount(productid, "plus")
        .then((res) => {
          productItemFormCount[index].innerHTML = res.data.count;
          total_price.innerHTML = res.data.price;
          console.log(res);
        })
        .catch((err) => {
          alert(err);
        });
    });
  });
});
