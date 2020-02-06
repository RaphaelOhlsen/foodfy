const closeButton = document.querySelector('.close-button');
const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card');
const modalImage = document.querySelector('.modal-img');
const modalTitle = document.querySelector('.modal-title');
const modalAuthor = document.querySelector('.modal-author');


cards.forEach(card => {
  card.addEventListener('click', () => {
    const image = card.querySelector('img').getAttribute('src');
    const title = card.querySelector('h3').innerHTML;
    const author = card.querySelector('p').innerHTML;

    modalImage.src = `${image}`;
    modalTitle.innerHTML = `${title}`;
    modalAuthor.innerHTML = `${author}`;
    modalOverlay.classList.remove('hidden');
  })
})


closeButton.addEventListener('click', () => {
  modalOverlay.classList.add('hidden');
  }
)