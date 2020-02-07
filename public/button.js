const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const ingredients = document.querySelector('.ingredients');
const contentPreparation = document.querySelector('#preparation');
const contentInformation = document.querySelector('#information');

button1.addEventListener('click', () => {
  ingredients.classList.toggle('hidde');

  if (button1.innerHTML === "MOSTRAR") {
    
    return button1.innerHTML = "ESCONDER"
  }
  return button1.innerHTML = "MOSTRAR"
})

button2.addEventListener('click', () => {
  contentPreparation.classList.toggle('hidde');

  if (button2.innerHTML === "MOSTRAR") {
    return button2.innerHTML = "ESCONDER"
  }
  return button2.innerHTML = "MOSTRAR"
})

button3.addEventListener('click', () => {
  contentInformation.classList.toggle('hidde');
  
  if (button3.innerHTML === "MOSTRAR") {
    return button3.innerHTML = "ESCONDER"
  }
  return button3.innerHTML = "MOSTRAR"
})