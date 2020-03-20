function goToSection(sectionId) {
  window.history.pushState(null, '', '#' + sectionId);
  document.documentElement.scrollTo(0, document.getElementById(sectionId).offsetTop);
}

document.body.onclick = event => {
  if (event.target.classList.contains('back-button')) {
    goToSection('start');
  }
}

document.body.onsubmit = event => {
  event.preventDefault();
  const selectedRadio = event.target.querySelector('input[name="answer"]:checked');
  if (selectedRadio) {
    goToSection(selectedRadio.value);
  }
}
