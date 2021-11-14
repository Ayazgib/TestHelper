import test from "./test.js";

let wrapper = document.querySelector('.questions');
let block = document.createElement('div');
block.style = 'position: absolute;';
wrapper.insertAdjacentElement('afterbegin', block);

function createTest (test) {
    test.forEach((question, i) => {
        wrapper.insertAdjacentHTML('beforeend', `<p>${i}) ${question.question}<br/><strong>${question.answer}</strong></p>`)
    })
}

function setBlockPosition (e) {
    console.log(document.querySelector('body').scrollTop, block.scrollTop);
    block.style = `position: absolute; top: ${e.clientY + window.pageYOffset}px; left: ${e.clientX}px;`
}



window.onload = function() {
    createTest(test);

    document.addEventListener('keydown', function(event) {
        while (block.firstElementChild) block.firstElementChild.remove();
        if (event.code == 'KeyZ') {
            let selection = window.getSelection();

            if (selection.type === 'Range') {
                let answers = test.filter(item => item.question.includes(selection));
                if (answers.length) {
                    answers.forEach(answer => {
                        block.insertAdjacentHTML('beforeend', `<p style="margin: 0; padding: 0">${answer.question.slice(0, 30)}<strong>${answer.answer}</strong></p>`)
                    })
                } else {
                    block.insertAdjacentHTML('beforeend', `<p>Отчислен!</p>`)
                }
                document.addEventListener('mousemove',  setBlockPosition);
            }

        }
    })

    document.addEventListener('keyup', function(event) {
        if (event.code == 'KeyZ') {
            while (block.firstElementChild) block.firstElementChild.remove();
        }
    })

};