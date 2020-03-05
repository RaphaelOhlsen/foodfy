const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    const index = card.getAttribute("id");
    window.location.href = `http://127.0.0.1:5000/recipes/${index}`
  })
});
