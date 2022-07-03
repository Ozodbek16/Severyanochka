const btnCatalog = document.querySelector(".btn_catalog_svg");
const btnHoverCatalog = document.querySelector(".hover_catalog");
const imgBtnCatalog = document.querySelector(".btn_catalog_img");

btnCatalog.addEventListener("click", () => {
  if (!btnHoverCatalog.classList.contains("db")) {
    btnHoverCatalog.style.display = "block";
    return btnHoverCatalog.classList.add("db");
  }
  if (btnHoverCatalog.classList.contains("db")) {
    btnHoverCatalog.style.display = "none";
    btnHoverCatalog.classList.remove("db");
  }
});

const profileBtn = document.querySelector(".btn_user");
if (profileBtn !== null) {
  const arrow = document.querySelector(".nav_icon_meniki");
  const dropdown = document.querySelector(".dropdown");

  profileBtn.addEventListener("click", (e) => {
    if (arrow.style.transform == "rotate(180deg)") {
      dropdown.style.display = "none";
      arrow.style.transform = "rotate(0deg)";
    } else {
      arrow.style.transform = "rotate(180deg)";
      dropdown.style.display = "block";
    }
  });
}

const btnSign = document.querySelector('.btn_sign_in');

if (!!btnSign) {
  const login = document.querySelector('.login-body');
  btnSign.addEventListener('click', (e) => {
    login.style.display = 'flex'
  })

  const closeBtn = document.querySelector('.close_btn');
  closeBtn.addEventListener('click',(e)=>{
    login.style.display = 'none'
  })
}