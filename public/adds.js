function addIngredient(e) {
  e.preventDefault();
  
  const ingredients = document.querySelector('#ingredients');
  const fieldContainer = document.querySelectorAll(".ingredient");

  
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  if(newField.children[0].value == "") return false;

  newField.children[0].value = "";
  ingredients.appendChild(newField);
}

function addPreparation(e) {
  e.preventDefault();
  
  const steps = document.querySelector('#steps');
  const fieldContainer = document.querySelectorAll(".step");

  
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  if(newField.children[0].value == "") return false;

  newField.children[0].value = "";
  steps.appendChild(newField);
}


document
  .querySelector('.add-ingredient')
  .addEventListener("click", addIngredient);

document
.querySelector('.add-step')
.addEventListener("click", addPreparation);


document
  .querySelector('.add-ingredient')
  .addEventListener("click", addIngredient);
