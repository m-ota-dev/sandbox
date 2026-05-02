alert("JavaScriptが読み込まれました。")
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById( 'header-placeholder').innerHTML = data;
    });

 const questions = [
  { id: 1, a: 3, b: 4, correct: 7 },
  { id: 2, a: 5, b: 2, correct: 7 },
  { id: 3, a: 9, b: 1, correct: 10 },
  { id: 4, a: 6, b: 3, correct: 9 }
];

function shuffle(array) {
  return array
    .map(v => ({ v, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ v }) => v);
}

function generateChoices(correct) {
  const choices = [correct];

  while (choices.length < 4) {
    const delta = Math.floor(Math.random() * 5) - 2; // -2〜+2
    const candidate = correct + delta;

    if (candidate > 0 && !choices.includes(candidate)) {
      choices.push(candidate);
    }
  }

  return shuffle(choices);
}

const quizDiv = document.getElementById("quiz");
const startTimes = {};

function showQuestions() {
  quizDiv.innerHTML = ""; // 初期化

  questions.forEach((q, index) => {
    startTimes[q.id] = Date.now(); // 各問題の開始時刻

    const div = document.createElement("div");
    div.className = "question-block";

    const choices = generateChoices(q.correct);

    div.innerHTML = `
      <h3>問題 ${index + 1}: ${q.a} + ${q.b} = ?</h3>
      ${choices
        .map(
          c => `
        <button class="choice" data-qid="${q.id}" data-value="${c}">
          ${c}
        </button>
      `
        )
        .join("")}
    `;

    quizDiv.appendChild(div);
  });

  setupChoiceHandlers();
}


const results = [];

function setupChoiceHandlers() {
  document.querySelectorAll(".choice").forEach(btn => {
    btn.addEventListener("click", () => {
      const qid = Number(btn.dataset.qid);
      const value = Number(btn.dataset.value);

      const end = Date.now();
      const elapsed = (end - startTimes[qid]) / 1000;

      const question = questions.find(q => q.id === qid);
      const isCorrect = value === question.correct;

      results.push({
        id: qid,
        a: question.a,
        b: question.b,
        correctAnswer: question.correct,
        selected: value,
        correct: isCorrect,
        timeSec: elapsed
      });

      // 同じ問題のボタンを無効化
      btn.closest(".question-block")
         .querySelectorAll("button")
         .forEach(b => (b.disabled = true));
    });
  });
}

let testStart = null;

document.getElementById("start").addEventListener("click", () => {
  testStart = Date.now();
  showQuestions();
});

document.getElementById("finish").addEventListener("click", () => {
    alert;("送信されました！")
  const testEnd = Date.now();
  const totalTimeSec = (testEnd - testStart) / 1000;

  const totalCorrect = results.filter(r => r.correct).length;

  const payload = {
    participantId: "A001",
    condition: "digital_learn_digital_answer",
    totalTimeSec,
    totalCorrect,
    questions: results,
    timestamp: new Date().toISOString()
  };

fetch("https://sandbox-production-0a80.up.railway.app/submit", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    message: "Codespaces から送ったよ！",
    time: Date.now()
  })
})
.then(res => res.json())
.then(data => console.log("サーバーからの返事:", data))
.catch(err => console.error("エラー:", err))})