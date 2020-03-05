const showButtons = document.querySelectorAll(".show-button");

showButtons.forEach(showButton => {
  showButton.addEventListener('click', () => {
    
    if (showButton.innerHTML === "MOSTRAR") {
      showButton.innerHTML = "ESCONDER";
    } else {
      showButton.innerHTML = "MOSTRAR";
    }
    const content = showButton.nextElementSibling;
    if (content.classList.contains("hidde")) {
      content.classList.remove("hidde")
    } else {
      content.classList.add("hidde");
    }
  });
});