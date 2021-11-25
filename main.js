import test from "./test.js";
import newTest from "./newQuestions.js";

let wrapper = document.querySelector('.questions');
let block = document.createElement('div');

document.querySelector('head').insertAdjacentHTML('beforeend', `<style>
p::selection {
background: none;
}
</style>`)

wrapper.insertAdjacentElement('afterbegin', block);
function createTest (test) {
    test.forEach((question, i) => {
        wrapper.insertAdjacentHTML('beforeend', `<p>${i}) ${question.question}<br/><strong>${question.answer}</strong></p>`)
    })
}

createTest(test);
createTest(newTest);

function setBlockPosition (e) {
    console.log(document.querySelector('body').scrollTop, block.scrollTop);
    block.style = `position: absolute; top: ${e.clientY + window.pageYOffset}px; left: ${e.clientX}px;`
}

window.onload = function() {
    createTest(test);
    createTest(newTest);

    let concatArr = test.concat(newTest)

    document.addEventListener('keydown', function(event) {
        while (block.firstElementChild) block.firstElementChild.remove();
        if (event.code == 'KeyZ') {
            let selection = window.getSelection();

            if (selection.type === 'Range') {
                let answers = concatArr.filter(item => item.question.includes(selection));
                if (answers.length) {
                    let answerString = ''
                    answers.forEach(answer => {
                        answerString += `${answer.question.slice(0, 30)}|${answer.answer}|`})

                } else {
                    window.history.pushState("string", "Title", 'Отчислен:)');
                }
                document.addEventListener('mousemove',  setBlockPosition);
            }

        }
    })

    document.addEventListener('keyup', function(event) {
        if (event.code == 'KeyX') {
            window.history.pushState("string", "Title", '?');
        }
    })

};