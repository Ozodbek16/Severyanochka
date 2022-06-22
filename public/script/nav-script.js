const btnCatalog = document.querySelector('.btn_catalog_svg');
const btnHoverCatalog = document.querySelector('.hover_catalog');
const imgBtnCatalog = document.querySelector('.btn_catalog_img');

btnCatalog.addEventListener('click', () => {
    if(!btnHoverCatalog.classList.contains('db')){
        btnHoverCatalog.style.display = 'block'
        return btnHoverCatalog.classList.add('db')
    }
    if(btnHoverCatalog.classList.contains('db')){
        btnHoverCatalog.style.display = 'none'
        btnHoverCatalog.classList.remove('db')
    }
})