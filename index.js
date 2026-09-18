// Massiiv objektidest "sõna - tõlge", mis hoiab kogu treeningu andmebaasi
let vocabulary = [
    { word: "tere", translation: "привет" },
    { word: "aitäh", translation: "спасибо" },
    { word: "palun", translation: "пожалуйста" },
    { word: "raamat", translation: "книга" },
    { word: "maja", translation: "дом" },
    { word: "vesi", translation: "вода" },
    { word: "sõber", translation: "друг" },
    { word: "kool", translation: "школа" }
];

// Praegune juhuslik sõna, mis kasutajale hetkel kuvatakse
let currentWord = null;
let correctCount = 0;
let totalCount = 0;

const wordBox = document.getElementById('wordBox');
const answerInput = document.getElementById('answerInput');
const result = document.getElementById('result');
const scoreText = document.getElementById('score');

// Funktsioon valib massiivist juhusliku elemendi ja kuvab selle ekraanile
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * vocabulary.length);
    currentWord = vocabulary[randomIndex];
    wordBox.textContent = currentWord.word;

    // Tühjendame vastuse välja ja tulemuse enne uut katset
    answerInput.value = '';
    result.textContent = '';
    result.className = 'result';
    answerInput.focus();
}

// Kontrollifunktsioon: võrdleb sisestatud vastust õige tõlkega
function checkAnswer() {
    if (!currentWord) return;

    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = currentWord.translation.toLowerCase();
    totalCount++;

    if (userAnswer === correctAnswer) {
        correctCount++;
        result.textContent = '✓ Õige!';
        result.className = 'result good';
    } else {
        // Näitame õiget vastust, kui kasutaja eksis
        result.textContent = `✕ Vale. Õige vastus: ${currentWord.translation}`;
        result.className = 'result bad';
    }

    scoreText.textContent = `Skoor: ${correctCount} / ${totalCount}`;
}

// Nupp "Uus sõna" — järgmise juhusliku sõna saamiseks
document.getElementById('refreshBtn').onclick = getRandomWord;
document.getElementById('checkBtn').onclick = checkAnswer;

// Vastuse kontroll toimub ka Enter-klahvi vajutamisel sisestusväljal
answerInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') checkAnswer();
});

// Kasutaja lisab uue sõna sõnastikku
document.getElementById('addBtn').onclick = () => {
    const wordField = document.getElementById('newWord');
    const translationField = document.getElementById('newTranslation');
    const addResult = document.getElementById('addResult');

    const newWord = wordField.value.trim();
    const newTranslation = translationField.value.trim();

    // Kontrollime tühje välju, et vältida prügi lisamist massiivi
    if (!newWord || !newTranslation) {
        addResult.textContent = 'Täida mõlemad väljad!';
        addResult.className = 'result bad';
        return;
    }

    vocabulary.push({ word: newWord, translation: newTranslation });
    addResult.textContent = `Lisatud: "${newWord}" → "${newTranslation}"`;
    addResult.className = 'result good';

    wordField.value = '';
    translationField.value = '';
};

// Käivitame esimese sõna kohe lehe laadimisel
getRandomWord();