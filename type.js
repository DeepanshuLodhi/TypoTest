const typingText = document.querySelector(".typing-text p");
const input = document.querySelector(".wrapper .input-field");
const time = document.querySelector(".time span b");
const mistakes = document.querySelector(".mistake span");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const btn = document.querySelector("button");

// set value
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph() {
  const paragraph = [
    "Once upon a time, in a small village, there was a chicken named Cluck.",
    "Cluck had a dream of becoming a world-famous opera singer.",
    "Every morning, she would wake up at the crack of dawn and practice her scales.",
    "The other animals in the village found her singing hilarious.",
    "One day, Cluck decided to audition for the village talent show.",
    "She strutted onto the stage, fluffed her feathers, and opened her beak to sing.",
    "To everyone's surprise, including her own, a perfect opera note rang out.",
    "The crowd went wild, and Cluck became an overnight sensation.",
    "She even got invited to perform at the grand opera house in the city.",
    "Cluck's dream had come true, and she clucked happily ever after.",
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

  // Added focus on input field
  input.focus();
}

// handle user input
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
  }
}

function reset() {
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = 0;
  mistake = 0;
  isTyping = false; // Corrected typo from istyping to isTyping
  time.innerText = timeLeft;
  mistakes.innerText = mistake;
  wpm.innerText = 0;
  cpm.innerText = 0;
  input.value = "";


  input.focus();
}

input.addEventListener("input", initTyping);
btn.addEventListener("click", reset);

loadParagraph();
