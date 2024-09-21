const typingText = document.querySelector(".typing-text p");
const input = document.querySelector(".wrapper .input-field");
const time = document.querySelector(".time span b");
const mistakes = document.querySelector(".mistake span");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const btn = document.querySelector("button");
const keyboard = document.querySelector(".keyboard");
const resultsList = document.getElementById("results-list");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;
let results = [];

function loadParagraph() {
  const paragraph = [
    "Once upon a time, in a quaint little village nestled between rolling hills and lush green fields, where the sun kissed the earth and the air was filled with the sweet scent of blooming flowers, there lived a spirited chicken named Cluck, who was known far and wide for her adventurous spirit and quirky personality that always brightened the day.",
    "Cluck had a dream that soared far beyond the confines of her humble coop and the simple life of clucking and scratching in the dirt—she aspired to become a world-famous opera singer, captivating audiences with her enchanting voice and extraordinary talent, believing that music could transcend all boundaries and bring joy to every heart.",
    "Every single morning, as the first rays of sunlight peeked over the horizon, illuminating the landscape in a warm golden glow, she would rise at the crack of dawn, stretching her wings wide in a graceful manner, and diligently practice her scales, determined to improve her craft with each note, imagining herself performing on grand stages before cheering crowds.",
    "However, the other animals in the village, including cows that mooed in disbelief, pigs that snorted with laughter, and even the occasional sheep that bleated with amusement, found her singing to be an endless source of entertainment and hilarity, often gathering around her in a curious crowd to listen, chuckling at her exuberance while secretly admiring her passion.",
    "One sunny day, filled with a sense of boldness and resolve that burned brightly within her heart, Cluck made the courageous decision to audition for the highly anticipated village talent show, an event that brought everyone together to showcase their unique skills and creativity, dreaming of showcasing her special gift to the community she loved so dearly.",
    "With a confident strut that echoed her determination, she made her way onto the stage, fluffed her feathers to appear as grand as possible, and opened her beak wide to deliver a performance that would leave everyone speechless, channeling every ounce of her energy and passion into the moment, ready to embrace whatever came next.",
    "To everyone's utter astonishment, and even her own disbelief, a perfectly executed opera note rang out, resonating through the air like a melodious echo, filling the hearts of every listener with wonder and joy, as they were transported to a world of beauty and emotion, captivated by her unexpected talent.",
    "The crowd erupted into cheers and applause, going wild with excitement, as Cluck became an overnight sensation, beloved by every villager for her extraordinary talent and tenacity, with each ovation igniting her spirit and fueling her dreams even further.",
    "She even received a prestigious invitation to perform at the grand opera house in the bustling city, where dreams came alive, lights dazzled, and talent was celebrated in the most magnificent way, making her heart race with anticipation and joy at the thought of sharing her gift with a wider audience.",
    "With her dreams finally realized and her heart brimming with happiness, Cluck clucked happily ever after, basking in the glory of her newfound fame while inspiring other animals to chase their dreams, no matter how far-fetched they seemed, reminding them that with courage and perseverance, anything was possible."
];


  const randomIndex = Math.floor(Math.random() * paragraph.length);
  typingText.innerHTML = "";
  for (const char of paragraph[randomIndex]) {
    typingText.innerHTML += `<span>${char}</span>`;
  }
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => input.focus());
  typingText.addEventListener("click", () => {
    input.focus();
  });

  input.focus();
}

function initTyping() {
  const char = typingText.querySelectorAll("span");
  const typedChar = input.value.charAt(charIndex);

  if (charIndex < char.length && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTime, 1000);
      isTyping = true;
    }

    if (char[charIndex].innerText === typedChar) {
      char[charIndex].classList.add("correct");
    } else {
      mistake++;
      char[charIndex].classList.add("incorrect");
    }
    charIndex++;
    if (charIndex < char.length) {
      char[charIndex].classList.add("active");
    } else {
      clearInterval(timer);
      input.value = "";
    }
    mistakes.innerText = mistake;
    cpm.innerText = charIndex - mistake;

    highlightKey(typedChar);
  } else {
    clearInterval(timer);
    input.value = "";
  }
}

function initTime() {
  if (timeLeft > 0) {
    timeLeft--;
    time.innerText = timeLeft;
    let wpmVal = Math.round(
      ((charIndex - mistake) / 5 / (maxTime - timeLeft)) * 60
    );
    wpm.innerText = wpmVal;
  } else {
    clearInterval(timer);
    saveResult();
  }
}

function reset() {
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = 0;
  mistake = 0;
  isTyping = false;
  time.innerText = timeLeft;
  mistakes.innerText = mistake;
  wpm.innerText = 0;
  cpm.innerText = 0;
  input.value = "";
  input.focus();
}

function highlightKey(char) {
  const key = keyboard.querySelector(`[data-key="${char === ' ' ? ' ' : char.toLowerCase()}"]`);
  if (key) {
    key.classList.add("active");
    setTimeout(() => {
      key.classList.remove("active");
    }, 200);
  }
}

function saveResult() {
  const wpmValue = parseInt(wpm.innerText);
  const cpmValue = parseInt(cpm.innerText);
  const mistakesValue = parseInt(mistakes.innerText);

  results.unshift({ wpm: wpmValue, cpm: cpmValue, mistakes: mistakesValue });
  if (results.length > 5) {
    results.pop();
  }

  updateResultsList();
}

function updateResultsList() {
  resultsList.innerHTML = "";
  results.forEach((result, index) => {
    const li = document.createElement("li");
    li.textContent = `Attempt ${index + 1}: WPM: ${result.wpm}, CPM: ${result.cpm}, Mistakes: ${result.mistakes}`;
    resultsList.appendChild(li);
  });
}

input.addEventListener("input", initTyping);
btn.addEventListener("click", reset);

loadParagraph();