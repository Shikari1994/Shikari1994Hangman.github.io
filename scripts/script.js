//Основные элементы
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector("button");

//Игровые переменные
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

//функция перезагрузки игры
const resetGame = () => {
correctLetters = [];
wrongGuessCount = 0;
hangmanImage.src = "images/hangman-0.svg";
guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
//Пустые ячейки для букв
wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
//Экранная клавиатура
keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
//Скрытие модального
gameModal.classList.remove("show");
}



//Функция для рандомного словца
const getRandomWord = () => {
    //выбираем слово и подсказку из массива
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    //выбор правильного и подсказка
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    //вызов функции перезагрузки игры
    resetGame();
    }
    
//экран завершения (выиграл или прогирал)
const gameOver = (isVictory) => {
//покажем модальку с деталями (выиграл или проиграл)
const modalText = isVictory ? `Ты нашел слово:` : 'Правильное слово:';
gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
gameModal.querySelector("h4").innerText = isVictory ? 'Поздравляю!' : 'Увы...';
gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`
gameModal.classList.add("show")
}

//Клавиатура
for (let i = 1072; i <= 1103; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    //прослушиватель событий щелчка
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}


//управление логикой, когда жмется кнопка клавы
const initGame = (button, clickedLetter) => {
    //Проверяем есть ли эта буква в слове
    if (currentWord.includes(clickedLetter)) {
        //при правильном нажатии на кнопку буквы будут обновлены 
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }

        });
    }  else {
        //если буква не верна то...
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    //оключаем нажатую кнопку, чтоб ее нельзя было нажать снова
    button.disabled = true;
    // отображение количества угадываний
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    //должна ли игра закончиться взависимости от победы или проигрыша
    if (wrongGuessCount === maxGuesses)
        return gameOver(false);
    if (correctLetters.length === currentWord.length) 
        return gameOver(true);
       
}



    //Начало игры со случайного слова
    getRandomWord()
   
 // Прослушиватель событий для кнопки повторного вопроизведения игры   
 playAgainBtn.addEventListener("click", getRandomWord)