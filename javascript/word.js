var wordToGuessed = null
async function generateWord() {
    try {
        const response = await fetch('https://random-word-api.herokuapp.com/word?length=5')
        const data = await response.json()
        wordToGuessed = data[0]
        getDetailsOfWord(wordToGuessed)
    } catch (error) {
        console.log(error)
    }
}
generateWord()

async function getDetailsOfWord(wordToGuessed) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordToGuessed}`)
        const data = await response.json()
        console.log("Word Generated: ", wordToGuessed)
        console.log("Details of word: ")
        console.log(data)
    } catch (error) {
        console.log("Word not found")
        generateWord()
    }
}



