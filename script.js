const screens = [...document.querySelectorAll(".screen")];
const progressBar = document.getElementById("progressBar");
const screenNumber = document.getElementById("screenNumber");
let currentScreen = 1;

function showScreen(number) {
  currentScreen = number;
  screens.forEach((screen, index) => {
    screen.classList.toggle("active", index === number - 1);
  });
  progressBar.style.width = `${(number / screens.length) * 100}%`;
  screenNumber.textContent = `${String(number).padStart(2, "0")} / ${String(screens.length).padStart(2, "0")}`;
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (number === 6) confetti(100);
}
document.querySelectorAll("[data-next]").forEach(button => {
  button.addEventListener("click", () => showScreen(Math.min(currentScreen + 1, screens.length)));
});

// Funny news reactions
document.getElementById("agreeBtn").addEventListener("click", () => {
  document.getElementById("newsReply").textContent = "WOW! Unmai ya accept panni kitiyae! unaku oru award yae kudukkalam 🏆😂";
  confetti(16);
});
document.getElementById("denyBtn").addEventListener("click", () => {
  document.getElementById("newsReply").textContent = "Breaking news: Poi solladha Nivi, unmai ellarukkum theriyum!… 🕵️‍♀️🤣";
  confetti(10);
});

// Gift reveal
const giftButton = document.getElementById("giftButton");
giftButton.addEventListener("click", () => {
  if (giftButton.classList.contains("opened")) return;
  giftButton.classList.add("opened");
  document.getElementById("giftReveal").classList.remove("hidden");
  document.getElementById("giftHint").classList.add("hidden");
  confetti(35);
});

// Light-hearted bestie quiz, with no assumed real-life facts
const quiz = [
  { q: "Nivetha oda special talent enna?", a: ["Overthinking Olympics 🥇", "Reply late pannradhu 📱", "Ellathulayum cute-ah irukradhu 😌"], reply: ["Gold medal ready! 🥇😂", "Message-ku reply varradhukulla next birthday vandhudum pola. 📱😭", "Idha vida correct answer indha universe-laye illa! 🌍👑"] },
  { q: "Birthday girl-ku innaiku enna compulsory?", a: ["Cake saapdanum 🍰", "Birthday crown pottukanum 👑🎀", "Bst Frnd  kooda photo eduthu memories create pannanum 📸💗"], reply: ["Cake cut pannama birthday celebrate panradha? Unacceptable! 🚨🍰😂🍰", " Crown pottalum podaatiyum, inniku queen nee dhaan🎂✨ ", "Correct! Birthday memories dhaan forever special! 🥹🎀"] },
  { q: "Nivetha-ku best birthday gift edhu?", a: ["Diamond crown 👑", "Unlimited cake 🍰", "Bst Frnd  oda lifetime kalaaichal 😂"], reply: ["Queen energy dhaan, but budget konjam yosikkanum. 👑", "Unlimited cake-na friendship test pass! 🍰", "Correct! Unakku lifetime subscription already activate aayiduchu. 🤝😂"] }
];
let quizIndex = 0;
const quizQuestion = document.getElementById("quizQuestion");
const answers = document.getElementById("answers");
const quizCount = document.getElementById("quizCount");
const quizFeedback = document.getElementById("quizFeedback");
const nextQuestion = document.getElementById("nextQuestion");

function renderQuestion() {
  const item = quiz[quizIndex];
  quizCount.textContent = `QUESTION ${quizIndex + 1} / ${quiz.length}`;
  quizQuestion.textContent = item.q;
  quizFeedback.textContent = "";
  nextQuestion.classList.add("hidden");
  answers.innerHTML = "";
  item.a.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.textContent = answer;
    button.addEventListener("click", () => {
      if (answers.querySelector("button:disabled")) return;
      [...answers.children].forEach(option => option.disabled = true);
      button.classList.add("chosen");
      quizFeedback.textContent = item.reply[index];
      nextQuestion.textContent = quizIndex === quiz.length - 1 ? "Letter open pannalaam 💌 →" : "Next question →";
      nextQuestion.classList.remove("hidden");
      if (quizIndex === quiz.length - 1) nextQuestion.dataset.last = "true";
    });
    answers.appendChild(button);
  });
}
renderQuestion();
nextQuestion.addEventListener("click", () => {
  if (quizIndex < quiz.length - 1) {
    quizIndex++;
    renderQuestion();
  } else {
    showScreen(5);
  }
});

// Friendship letter
document.getElementById("letterButton").addEventListener("click", () => {
  document.getElementById("letter").classList.toggle("hidden");
  document.getElementById("letterNext").classList.remove("hidden");
  document.getElementById("letterButton").querySelector("small").textContent = "Opened with love 💗";
});
document.getElementById("letterNext").addEventListener("click", () => {
  cakeScreen.classList.remove("hidden");
});

// Birthday wish and replay
const wishButton = document.getElementById("wishButton");
const wishHeading = document.getElementById("wishHeading");
const wishInstruction = document.getElementById("wishInstruction");
const finalNote = document.getElementById("finalNote");
const restartButton = document.getElementById("restartButton");

wishButton.addEventListener("click", () => {
  wishHeading.classList.add("hidden");
  wishInstruction.classList.add("hidden");
  finalNote.classList.remove("hidden");
  restartButton.classList.remove("hidden");
  wishButton.textContent = "Wish sent! 💌";
  wishButton.disabled = true;
  confetti(140);
});

restartButton.addEventListener("click", () => {
  quizIndex = 0;
  renderQuestion();
  giftButton.classList.remove("opened");
  document.getElementById("giftReveal").classList.add("hidden");
  document.getElementById("giftHint").classList.remove("hidden");
  document.getElementById("letter").classList.add("hidden");
  document.getElementById("letterNext").classList.add("hidden");
  document.getElementById("letterButton").querySelector("small").textContent = "Tap to open your letter";
  wishHeading.classList.remove("hidden");
  wishInstruction.classList.remove("hidden");
  finalNote.classList.add("hidden");
  restartButton.classList.add("hidden");
  wishButton.disabled = false;
  wishButton.textContent = "I made a wish ✨";
  document.getElementById("newsReply").textContent = "";
  showScreen(1);
});

function confetti(count = 50) {
  const layer = document.getElementById("confettiLayer");
  const pieces = ["💖", "✨", "🎀", "🌸", "🎉", "💕", "⭐", "🩷"];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti emoji";
    piece.textContent = pieces[Math.floor(Math.random() * pieces.length)];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.setProperty("--drift", `${Math.random() * 220 - 110}px`);
    piece.style.animationDuration = `${2.3 + Math.random() * 2.7}s`;
    piece.style.animationDelay = `${Math.random() * 0.5}s`;
    piece.style.fontSize = `${14 + Math.random() * 16}px`;
    layer.appendChild(piece);
    window.setTimeout(() => piece.remove(), 6000);
  }
}


const cakeScreen = document.getElementById("cakeScreen");
const cake = document.getElementById("cake");
const flame = document.getElementById("flame");
const smoke = document.getElementById("smoke");
const countdown = document.getElementById("countdown");
const cakeHint = document.getElementById("cakeHint");
const cutButton = document.getElementById("cutButton");
const cutLine = document.getElementById("cutLine");
const swipeHint = document.getElementById("swipeHint");
const sliceResult = document.getElementById("sliceResult");
const continueButton = document.getElementById("continueButton");

let countdownStarted = false;
let cakeCut = false;
let startPoint = null;

function resetCake() {
  countdownStarted = false;
  cakeCut = false;
  startPoint = null;

  flame.classList.remove("off");
  smoke.classList.remove("rising");
  cake.classList.remove("cutting-ready", "cut-done");

  countdown.textContent = "10";
  countdown.classList.remove("hidden");
  cakeHint.textContent = "Make a wish and blow the candle! 🌬️💗";

  cutButton.classList.add("hidden");
  swipeHint.classList.add("hidden");
  sliceResult.classList.add("hidden");
  continueButton.classList.add("hidden");
}

// Start countdown when the cake screen opens.
function startCakeCountdown() {
  if (countdownStarted) return;
  countdownStarted = true;

  let seconds = 10;
  countdown.textContent = seconds;

  const timer = setInterval(() => {
    seconds -= 1;
    countdown.textContent = seconds;

    if (seconds <= 0) {
      clearInterval(timer);

      // Blow out the candle automatically.
      flame.classList.add("off");
      smoke.classList.remove("rising");
      void smoke.offsetWidth;
      smoke.classList.add("rising");

      cakeHint.textContent = "Wish made! Happy Birthday! 🎉";
      countdown.classList.add("hidden");

      // Show cut button only after the candle is blown out.
      setTimeout(() => {
        cutButton.classList.remove("hidden");
      }, 900);
    }
  }, 1000);
}

// Reveal the cake screen from the letter's final button.
document.getElementById("letterNext").addEventListener("click", () => {
  resetCake();
  cakeScreen.classList.remove("hidden");
  startCakeCountdown();
});

// Show dotted cutting line.
cutButton.addEventListener("click", () => {
  cutButton.classList.add("hidden");
  cake.classList.add("cutting-ready");
  swipeHint.classList.remove("hidden");
  cakeHint.textContent = "Swipe down the dotted line to cut! 🍰";
});

// Mobile touch and desktop mouse support.
function getCakePoint(event) {
  const rect = cake.getBoundingClientRect();
  const touch = event.touches ? event.touches[0] : event;

  return {
    x: touch.clientX,
    y: touch.clientY,
    inside: touch.clientX >= rect.left &&
            touch.clientX <= rect.right &&
            touch.clientY >= rect.top &&
            touch.clientY <= rect.bottom,
    centerX: rect.left + rect.width / 2,
    top: rect.top,
    bottom: rect.bottom
  };
}

function beginCut(event) {
  if (!cake.classList.contains("cutting-ready") || cakeCut) return;

  const point = getCakePoint(event);

  // Start close to the dotted line at the top of the cake.
  if (
    point.inside &&
    point.y <= point.top + 32 &&
    Math.abs(point.x - point.centerX) < 38
  ) {
    startPoint = point;
  }
}

function finishCut(event) {
  if (!startPoint || cakeCut) return;

  const touch = event.changedTouches
    ? event.changedTouches[0]
    : event;

  const endY = touch.clientY;
  const endX = touch.clientX;
  const cakeRect = cake.getBoundingClientRect();

  const swipedDown = endY > startPoint.y + cakeRect.height * 0.55;
  const nearLine = Math.abs(endX - startPoint.centerX) < 48;
  const reachedBottom = endY >= cakeRect.bottom - 12;

  startPoint = null;

  if (swipedDown && nearLine && reachedBottom) {
    finishCakeCut();
  }
}

cake.addEventListener("touchstart", beginCut, { passive: true });
cake.addEventListener("touchend", finishCut, { passive: true });
cake.addEventListener("mousedown", beginCut);
document.addEventListener("mouseup", finishCut);

function finishCakeCut() {
  if (cakeCut) return;
  cakeCut = true;

  cake.classList.remove("cutting-ready");
  cake.classList.add("cut-done");
  cutLine.style.opacity = "1";
  swipeHint.classList.add("hidden");
  cakeHint.textContent = "Yay! You cut your birthday cake! 🎂";

  setTimeout(() => {
    sliceResult.classList.remove("hidden");
    continueButton.classList.remove("hidden");
  }, 650);
}

// Only continue to the next page after the cake slice appears.
continueButton.addEventListener("click", () => {
  cakeScreen.classList.add("hidden");
  cakeScreen.classList.remove("is-cut");

  // Existing final birthday page:
  showScreen(6);
});
