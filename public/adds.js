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


const Item = {
  deletePrepare(event) {
    const itemDiv = event.target.parentNode;
    const stepPrepare = document.querySelectorAll('.step.prepare');
    const inputPrepare = document.querySelectorAll('.step.prepare > input')
    if (stepPrepare.length < 2) {
      inputPrepare[0].value = "";
      return;
    }
    itemDiv.remove();
  },
  deleteIngredient(event) {
    const itemDiv = event.target.parentNode;
    const stepIngredient = document.querySelectorAll('.step.ingredient');
    const inputIngredient = document.querySelectorAll('.step.ingredient > input')
    if (stepIngredient.length < 2) {
      inputIngredient[0].value = "";
      return;
    }
    itemDiv.remove();
  }
}