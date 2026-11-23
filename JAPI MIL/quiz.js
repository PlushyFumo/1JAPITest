// MIL quiz: each item has a question, options, index of the correct option, and an explanation
const questions = [
  { q: "What does MIL stand for?", o: ["Mass Information Learning", "Media and Information Literacy", "Modern Internet Literacy", "Media and Internet Law"], a: 1, e: "MIL means Media and Information Literacy." },
  { q: "Which best describes Media and Information Literacy?", o: ["Memorizing news headlines", "Skills to access, evaluate, use, create and share information and media critically and ethically", "Knowing how to build a website", "Reading only printed books"], a: 1, e: "MIL is a set of competencies for handling information and media critically, ethically and effectively." },
  { q: "In the communication process, who creates and sends the message?", o: ["Receiver", "Channel", "Sender", "Feedback"], a: 2, e: "The sender encodes and sends the message." },
  { q: "The response a receiver gives back to the sender is called…", o: ["Noise", "Feedback", "Channel", "Encoding"], a: 1, e: "Feedback shows how the message was understood." },
  { q: "Which is one of the key questions of media literacy?", o: ["How many followers does the creator have?", "Who created this message and why?", "What color is the logo?", "How long is the video?"], a: 1, e: "Asking who made a message and why is central to media literacy." },
  { q: "Which type of literacy focuses on locating, evaluating and citing information?", o: ["Media literacy", "Technology literacy", "Information literacy", "Radio literacy"], a: 2, e: "Information literacy covers finding, evaluating, using and citing information." },
  { q: "Spotting bias in a news report is mainly an example of…", o: ["Technology literacy", "Media literacy", "Hardware repair", "Typing skill"], a: 1, e: "Analyzing media messages for bias is media literacy." },
  { q: "Using software, apps and devices effectively and responsibly is…", o: ["Technology literacy", "Information literacy", "Oral tradition", "Plagiarism"], a: 0, e: "That is technology literacy." },
  { q: "In the SIFT method, what does the “I” stand for?", o: ["Ignore the post", "Investigate the source", "Install a tool", "Imitate the author"], a: 1, e: "SIFT: Stop, Investigate the source, Find better coverage, Trace claims." },
  { q: "Copying someone’s work and presenting it as your own is called…", o: ["Citation", "Plagiarism", "Fair use", "Netiquette"], a: 1, e: "That is plagiarism. Always credit your sources." },
  { q: "What should you do before sharing information online?", o: ["Verify it and consider its effect on others", "Share quickly so you’re first", "Delete the source", "Add more details from memory"], a: 0, e: "Responsible users verify first and think about the impact." },
  { q: "Which era of media is known for speech, gestures and cave paintings?", o: ["Industrial age", "Electronic age", "Pre-historic age", "Information age"], a: 2, e: "Early humans relied on speech, gestures, symbols and cave art." },
  { q: "What is hieroglyphics?", o: ["An early writing system used in ancient Egypt", "A printing press from Europe", "A digital search engine", "A type of modern newspaper"], a: 0, e: "Hieroglyphics were an early writing system used in ancient Egypt." },
  { q: "Who introduced movable-type printing in Europe around 1440?", o: ["Samuel Morse", "Johannes Gutenberg", "Alexander Graham Bell", "Marconi"], a: 1, e: "Gutenberg’s press made books cheaper and more widespread." },
  { q: "Which was a major invention of the Industrial Age?", o: ["Telegraph", "Cave painting", "Smartphone", "Social media"], a: 0, e: "The telegraph (1830s–40s) is an Industrial Age media invention." },
  { q: "Radio, television and satellites belong to which age?", o: ["Pre-industrial age", "Electronic age", "Pre-historic age", "Industrial age"], a: 1, e: "These are hallmark technologies of the Electronic Age." },
  { q: "Which age is marked by the Internet, mobile devices and social media?", o: ["Information age", "Industrial age", "Pre-industrial age", "Pre-historic age"], a: 0, e: "The Information Age is the digital era we live in." },
  { q: "Tim Berners-Lee founded which organization to guide web standards?", o: ["W3C (World Wide Web Consortium)", "NASA", "UNESCO", "ARPANET"], a: 0, e: "He founded the W3C in 1994." },
  { q: "Which is a key difference between traditional and new media?", o: ["Traditional media is usually one-way; new media allows two-way interaction", "New media cannot be edited", "Traditional media is always faster", "New media has no audience"], a: 0, e: "New media lets audiences respond, share and create." },
  { q: "Which of these is an example of traditional media?", o: ["Newspaper", "Podcast app", "Blog", "Instagram"], a: 0, e: "Newspapers, TV and radio are traditional media." }
];

let current = 0, score = 0, missed = [];
const app = document.getElementById('quiz-app');

function start() {
  current = 0; score = 0; missed = [];
  app.innerHTML = `
    <div class="card"><h2>Ready to test yourself?</h2>
    <p>${questions.length} multiple-choice questions covering both lessons. You’ll see the answer after each question.</p>
    <button class="btn" id="go">Start quiz</button></div>`;
  document.getElementById('go').addEventListener('click', showQuestion);
}

function showQuestion() {
  const item = questions[current];
  app.innerHTML = `
    <div class="qmeta"><span>Question ${current + 1} of ${questions.length}</span><span>Score: ${score}</span></div>
    <div class="qbar" role="progressbar" aria-valuemin="0" aria-valuemax="${questions.length}" aria-valuenow="${current}"><div style="width:${(current / questions.length) * 100}%"></div></div>
    <div class="card">
      <h2>${item.q}</h2>
      <ul class="opts">${item.o.map((t, i) => `<li><button class="opt" data-i="${i}">${t}</button></li>`).join('')}</ul>
      <div id="fb" aria-live="polite"></div>
    </div>`;
  app.querySelectorAll('.opt').forEach(b => b.addEventListener('click', () => answer(+b.dataset.i)));
}

function answer(i) {
  const item = questions[current];
  const buttons = app.querySelectorAll('.opt');
  buttons.forEach((b, idx) => {
    b.disabled = true;
    if (idx === item.a) b.classList.add('right');
  });
  if (i === item.a) { score++; } else { buttons[i].classList.add('wrong'); missed.push(item); }
  const last = current === questions.length - 1;
  document.getElementById('fb').innerHTML = `
    <div class="fb"><strong>${i === item.a ? 'Correct.' : 'Not quite.'}</strong> ${item.e}</div>
    <button class="btn" id="next">${last ? 'See results' : 'Next question'}</button>`;
  document.getElementById('next').focus();
  document.getElementById('next').addEventListener('click', () => {
    current++;
    last ? showResults() : showQuestion();
  });
}

function showResults() {
  const pct = Math.round((score / questions.length) * 100);
  const msg = pct >= 90 ? 'Excellent. You’re MIL-ready.' : pct >= 70 ? 'Good work. Review the topics you missed.' : 'Keep going. Revisit the lessons and try again.';
  app.innerHTML = `
    <div class="card">
      <p class="score">${score}/${questions.length}</p>
      <h2>${pct}% — ${msg}</h2>
      ${missed.length ? `<h3>Review these</h3><ul class="review">${missed.map(m => `<li><strong>${m.q}</strong><br>${m.e}</li>`).join('')}</ul>` : '<p>You answered everything correctly.</p>'}
      <div class="pager">
        <button class="btn" id="retry">Retake quiz</button>
        <a class="btn ghost" href="index.html">Review Lesson 1</a>
        <a class="btn ghost" href="lesson2.html">Review Lesson 2</a>
      </div>
    </div>`;
  document.getElementById('retry').addEventListener('click', start);
}

start();
