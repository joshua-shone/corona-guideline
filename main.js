(async function() {
  const response = await fetch('questions.json');
  const questions = await response.json();

  location.hash = '#start';
  showQuestion('start');

  window.onhashchange = () => {
    if (location.hash.length > 1) {
      showQuestion(location.hash.slice(1));
    }
    document.body.classList.toggle('can-go-back', location.hash && location.hash !== '#start');
  }

  function showQuestion(questionId) {
    const question = questions[questionId];
    if (!question) {
      return;
    }

    document.querySelector('#title').textContent = question.title;
    document.querySelector('#description').textContent = question.description;

    const answers = document.getElementById('answers');
    answers.innerHTML = question.answers.map(answer => `
      <label>
        <input type="radio" name="answer">
        <span>
          <div class="text"></div>
          <div class="detail"></div>
        </span>
      </label>`
    ).join('');
    for (let i=0; i<question.answers.length; i++) {
      answers.children[i].querySelector('input').value = question.answers[i].id;
      answers.children[i].querySelector('.text').textContent = question.answers[i].text;
      answers.children[i].querySelector('.detail').textContent = question.answers[i].detail;
    }
  }

  document.querySelector('form').onsubmit = event => {
    event.preventDefault();
    const selectedRadio = event.target.querySelector('input[name="answer"]:checked');
    if (selectedRadio) {
      location.hash = '#' + selectedRadio.value;
    }
  }

  document.getElementById('back-button').onclick = () => history.back();
})();
