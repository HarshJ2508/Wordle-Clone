import { generateWord } from "./word.js";

const spinner = document.querySelector('.spinner')
const gridContainer = document.querySelector('.gridContainer')

var wordToGuessed = null

// generating random word for guessing 
generateWord().then(data => {
    spinner.classList.add("hideSpinner")
    console.log("Word Details: ",data);
    wordToGuessed = data[0]
    wordToGuessed = wordToGuessed['word']
    console.log("Word Generated: ",wordToGuessed)
    gridContainer.classList.add("activeGrid")
    
}).catch(err => {
    console.log(err) 
    alert("Error Occurred. Please Refresh Your Page")
});

var row, col; 
const colSize = 5, rowSize = 2
let index = 0, rowNo = 1

init(rowNo)

function init(rowNo) {
    if(rowNo <= rowSize) {
        row = document.getElementById(`row-${rowNo}`)
        col = row.children
        index = 0
    }
}

document.addEventListener('keydown', (event) => {
    if(event.key === 'Backspace' && index >= 1) {
        col[--index].focus()
    } 
    else if(event.key >= 'a' && event.key <= 'z' && index < colSize) {
        col[index++].focus()
    }
    else if(event.key === 'Enter' && index === colSize) {
        // set index to 0
        // index = 0

        // extract word from columns
        var word = ""
        for(let i = 0; i < colSize; i++) {
            word += col[i].value
        }
        console.log("Word entered by user: ",word)
        checkWord(word, wordToGuessed)
    }
    // console.log(event.key+", "+index)
})  

function checkLetterInWord(letter, wordToGuessed) {
    for(let i = 0; i < colSize; i++) {
        if(letter === wordToGuessed[i]) return true
    }
    return false
}

function checkWord(word, wordToGuessed) {
    if(wordToGuessed !== null) {
        // check if word is valid dictionary word or not


        for(let i = 0; i < colSize; i++) {
            if(word[i] === wordToGuessed[i]) {
                col[i].classList.add('greenCol')
            }
            else if(checkLetterInWord(word[i], wordToGuessed)) {
                col[i].classList.add('yellowCol')
            }
            else {
                col[i].classList.add('grayCol')
            }
        }
        rowNo += 1
        init(rowNo)
    }
}
