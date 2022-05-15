import { WORDS } from "./words.js";
class Keyboard {
    constructor(elem) {
        this._elem = elem;
        elem.onclick = this.onClick.bind(this);
    }

    erase(event) {
        if (currentLetter > 0) {
            document.querySelectorAll('.word-row')[currentRow]
            .querySelectorAll('.letter-box')[currentLetter - 1]
            .innerHTML = '';
            document.querySelectorAll('.word-row')[currentRow]
            .querySelectorAll('.letter-box')[currentLetter - 1]
            .style.background = '';
            currentLetter--;
            pressedLetters.pop();
        }
    }

    enter(event) {
        if (win) return;
        if (currentLetter != 5) {
            showMessage('В слове недостаточно букв!');
            return;
        };

        let letterBoxes = document.querySelectorAll('.word-row')[currentRow]
        .querySelectorAll('.letter-box span');
        let letters = [];
        letterBoxes.forEach(item => letters.push(item.innerHTML));
        let word = letters.join('');
        
        if (word == 'ЧТОЭТ') {
            showMessage(`${target}`);
            return;
        }

        if (!inDictionary(word)) {
            showMessage('Такого слова нет в словаре!');
            return;
        }
        
        letterBoxes.forEach((item, index) => {

            if (item.innerHTML == target[index]) {
                item.style.setProperty('animation-delay', `${index * 0.5}s`);
                item.parentElement.style.setProperty('animation-delay', `${index * 0.5}s`);
                item.parentElement.classList.add('green');
                item.classList.add('rotated');
                pressedLetters[index].style.background = 'green';
            }

            else if (target.includes(item.innerHTML) &&
                     letterBoxes[target.indexOf(item.innerHTML)]
                     .innerHTML != item.innerHTML) {
                item.style.setProperty('animation-delay', `${index * 0.5}s`);
                item.parentElement.style.setProperty('animation-delay', `${index * 0.5}s`);
                item.parentElement.classList.add('yellow');
                item.classList.add('rotated');
                if (pressedLetters[index].style.background != 'green')
                    pressedLetters[index].style.background = 'rgb(189, 189, 9)';
            }

            else {
                item.style.setProperty('animation-delay', `${index * 0.5}s`);
                item.parentElement.style.setProperty('animation-delay', `${index * 0.5}s`);
                item.parentElement.classList.add('gray');
                item.classList.add('rotated');
                if (pressedLetters[index].style.background != 'green' &&
                    pressedLetters[index].style.background != 'yellow')
                    pressedLetters[index].style.background = 'rgb(95, 95, 95)';
            }
        });
        currentLetter = 0;
        currentRow++;
        pressedLetters = [];
        if (word == target) {
            showMessage('You win!');
            win = true;
            return;
        }
    }

    addLetter(event) {

        if (currentLetter == 5) return;
        if (currentRow == 6) {
            showMessage('No more tries!');
            return;
        }
        if (win) return;
        document.querySelectorAll('.word-row')[currentRow]
        .querySelectorAll('.letter-box')[currentLetter]
        .innerHTML = '<span>'+event.target.innerHTML+'</span>';
        document.querySelectorAll('.word-row')[currentRow]
        .querySelectorAll('.letter-box')[currentLetter]
        .style.background = "rgb(95, 95, 95)";
        currentLetter++;
        pressedLetters.push(event.target);
    }

    onClick(event) {
        let target = event.target;
        if (target.tagName == 'IMG')
            target = target.parentElement;
        let action = target.dataset.action;
        if (action) {
            this[action](event);
        }
    }
}
window.onload = function() {
    new Keyboard(document.querySelector('.keyboard'));
    document.querySelector('.new').onclick = newGame;
};

function showMessage(message) {
    let element = document.createElement('div');
    element.className = 'message';
    document.body.appendChild(element);
    element.innerHTML = '<span>'+message+'</span>';
    setTimeout = (() => {
        element.remove()
    }, 3000);
}

function inDictionary(word) {
    if (WORDS.includes(word.toLowerCase())) return true;
    return false;
}

function newGame() {
    target = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
    win = false;
    console.log(target);
    currentRow = 0;
    currentLetter = 0;
    pressedLetters = [];
    document.querySelectorAll('.board-letter').forEach
    (item => item.style.background = '');
    document.querySelectorAll('.letter-box').forEach
    (item => {
        item.innerHTML = ''; 
        item.className = "letter-box";
        item.style.background = '';
    });
}

let currentRow = 0;
let currentLetter = 0;
let win = false;
let pressedLetters = [];
let target = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
console.log(target);