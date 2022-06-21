const dateInp = document.querySelector('.hidden_input').value
const date = document.querySelector('.time_price_date')
const dateText = document.querySelector('.order_date');
const viewBtn = document.querySelector('.view_more_btn');
const hideCards = document.querySelector('.hide_cards');

date.addEventListener('click', () => {
    // dateText.innerHTML = dateInp
})



viewBtn.addEventListener('click', () => {
    hideCards.style.position = 'unset'
    viewBtn.style.display = 'none'
})
