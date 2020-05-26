const currentPage = location.pathname;
const menuItens = document.querySelectorAll('header .links a');

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    const index = card.getAttribute("id");
    window.location.href = `http://127.0.0.1:5000/recipes/${index}`
  })
});

menuItens.forEach(item => {
  if(currentPage.includes(item.getAttribute('href'))) 
    item.classList.toggle('active');
});

