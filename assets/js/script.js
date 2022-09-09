// Dados Iniciais
let currentQuestion = 0;
let corrects = 0;


// Eventos
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

// Funções
function showQuestion() {
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion];
        
        let percent = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${percent}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;

        let optionsHtml = '';
        for (let i in q.options) {
            optionsHtml += `<div class="option" data-op="${i}" ><span>${parseInt(i) + 1}</span>${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });
    } else {
        finishQuiz();
    }
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickedOption) {
        corrects++;
    }

    currentQuestion++;
    showQuestion();
}

function finishQuiz() {
    let totalCorrects = Math.floor((corrects / questions.length) * 100);
    
    if (totalCorrects < 50){
        document.querySelector('.scoreText1').innerHTML = 'Tá ruim hein!!?';
        document.querySelector('.scorePct').style.color = '#f00';
    } else if (totalCorrects >= 50 && totalCorrects < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito Bom!';
        document.querySelector('.scorePct').style.color = '#ff0';
    } else if (totalCorrects >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns!!!';
        document.querySelector('.scorePct').style.color = '#0d630d';
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${totalCorrects}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${corrects}.`;

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';
}

function resetEvent() {
    corrects = 0;
    currentQuestion = 0;
    showQuestion();
}

showQuestion();