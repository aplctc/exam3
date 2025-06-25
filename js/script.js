const questions = [
  { text: "Q: এটির নাম কি ?", image: " img/Image-5.jpeg", answers: ["কনক্রিট মিক্সার", "মাচাং/স্ক্যাফোল্ডিং", "রড বাঁকানোর মেশিন", "মেজারিং টেপ"] },
  { text: "Q: ওয়াটার লেভেল কি বৈদ্যুতিক যন্ত্র? ", answers: ["A) হ্যাঁ ", "B) না"] },
  { text: "Q: স্ক্রিডিং কী? ", answers: ["A) ইট কাটা", "B) মাটি চাপা", "C) ফ্লোর সমান করা", "D) রড সোজা করা"] },
  { text: "Q: নিম্নের চিত্রটির নাম কি?", image: " img/Image-6.jpeg", answers: ["ট্রাওয়েল/প্লাস্টার ফিনিশিং যন্ত্র", "ভাইব্রেটর মেশিন", "মাচাং/স্ক্যাফোল্ডিং", "জ্যাক হ্যামার"] },
  { text: "Q: ওয়াল প্লাস্টারের স্ট্যান্ডার্ড থিকনেস কত?", answers: ["A) ১২ মিমি ", "B) ২৫ মিমি ", "C) ১০ মিমি ", "D) ১২ ইঞ্চি  "] },
  { text: "Q: ওয়াল টাইলস বসানোর আগে কী করা উচিত? ", answers: ["A) পানি দেওয়া ", "B) শুকানো ", "C) ঘষে ফেলা ", "D) রং করা "] },
  { text: "Q: এটির নাম কি ?", image: " img/Image-7.jpeg", answers: ["কনক্রিট মিক্সার", "ভাইব্রেটর মেশিন", "রড বাঁকানোর মেশিন", "রড কাটার মেশিন"] },
  { text: "Q: নিম্নের চিত্রটির নাম কি?", image: " img/Image-8.jpeg", answers: ["মেজারিং টেপ", "ভাইব্রেটর মেশিন", "রড বাঁকানোর মেশিন", "জ্যাক হ্যামার"] },
  { text: "Q: মর্টার মিক্সে বেশি পানি দিলে কী হয়?", answers: ["A) কাজ সহজ হয় ", "B) শুকিয়ে যায়  ", "C) ফাটল পড়ে ", "D) শক্ত হয় "] },
  { text: "Q: ইটের জোড়ায় কোন মেটেরিয়াল ব্যবহার হয়? ", answers: ["A) পানি", "B) চুন", "C) মিক্সড সিমেন্ট", "D) মর্টার "] },
  { text: "Q: সবচেয়ে বেশি লোড বহন করে কোন অংশ? ", answers: ["A) দেয়াল", "B) পিলার", "C) ফ্লোর", "D) ছাদ "] },
  { text: "Q: ইটের গাঁথুনিতে সাধারণত কোন জোড় সবচেয়ে মজবুত?", answers: ["A) স্ট্যাক বন্ড ", "B) ইংলিশ বন্ড ", "C) হরাইজন্টাল বন্ড", "D) র্যান্ডম বন্ড "] },
  { text: "Q: এটির নাম কি ?", image: " img/Image-10.jpeg", answers: ["Exit", "No parking", "Manhole", "Dangerous"] },
  { text: "Q: সিমেন্ট কোথায় সংরক্ষণ করতে হয়?", answers: ["A) খোলা জায়গায়", "B) প্লাস্টিকের ব্যাগে ", "C) কাঠের বাক্সে", "D) শুকনো ও উঁচু জায়গায় "] },
  { text: "Q: নিম্নের চিত্রটির নাম কি?", image: " img/Image-9.jpeg", answers: ["Exit", "No parking", "Manhole", "Dangerous"] }
];

let currentQuestion = 0;
const answersStorage = Array(questions.length).fill(null);
const questionText = document.getElementById('questionText');
const questionImage = document.getElementById('questionImage');
const answerBox = document.getElementById('answerBox');
const progressBar = document.getElementById('progressBar');
const questionNav = document.getElementById('questionNav');

function renderQuestion(index) {
  const q = questions[index];
  questionText.textContent = q.text;
  questionImage.style.display = q.image ? 'block' : 'none';
  questionImage.src = q.image || '';
  answerBox.innerHTML = '';

  q.answers.forEach((ans, i) => {
    const div = document.createElement('div');
    div.className = 'option';
    if (answersStorage[index] === i) div.classList.add('selected');
    div.onclick = () => {
      answersStorage[index] = i;
      updateNavStatus();
      renderQuestion(index);
    };
    div.textContent = ans;
    answerBox.appendChild(div);
  });

  progressBar.style.width = ((index + 1) / questions.length * 100) + '%';
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion(currentQuestion);
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion(currentQuestion);
  }
}

function updateNavStatus() {
  [...questionNav.children].forEach((btn, idx) => {
    btn.classList.remove('active', 'answered');
    if (idx === currentQuestion) btn.classList.add('active');
    if (answersStorage[idx] !== null) btn.classList.add('answered');
  });
}

questions.forEach((_, i) => {
  const btn = document.createElement('button');
  btn.textContent = (i + 1).toString().padStart(2, '0');
  btn.onclick = () => {
    currentQuestion = i;
    renderQuestion(i);
    updateNavStatus();
  };
  questionNav.appendChild(btn);
});

let totalTime = 600;
const timerDisplay = document.getElementById('timer');
function startTimer() {
  const interval = setInterval(() => {
    if (totalTime <= 0) {
      clearInterval(interval);
      alert("Time's up!");
    } else {
      totalTime--;
      const minutes = String(Math.floor(totalTime / 60)).padStart(2, '0');
      const seconds = String(totalTime % 60).padStart(2, '0');
      timerDisplay.textContent = `Time: ${minutes}:${seconds}`;
    }
  }, 1000);
}

renderQuestion(currentQuestion);
updateNavStatus();
startTimer();
