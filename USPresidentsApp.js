const PRESIDENTS = [
  { name: "George Washington", term: "1789-1797", year: 1789, number: 1 },
  { name: "John Adams", term: "1797-1801", year: 1797, number: 2 },
  { name: "Thomas Jefferson", term: "1801-1809", year: 1801, number: 3 },
  { name: "James Madison", term: "1809-1817", year: 1809, number: 4 },
  { name: "James Monroe", term: "1817-1825", year: 1817, number: 5 },
  { name: "John Quincy Adams", term: "1825-1829", year: 1825, number: 6 },
  { name: "Andrew Jackson", term: "1829-1837", year: 1829, number: 7 },
  { name: "Martin Van Buren", term: "1837-1841", year: 1837, number: 8 },
  { name: "William Henry Harrison", term: "1841", year: 1841, number: 9, status: "died-in-office" },
  { name: "John Tyler", term: "1841-1845", year: 1841, number: 10 },
  { name: "James K. Polk", term: "1845-1849", year: 1845, number: 11 },
  { name: "Zachary Taylor", term: "1849-1850", year: 1849, number: 12, status: "died-in-office" },
  { name: "Millard Fillmore", term: "1850-1853", year: 1850, number: 13 },
  { name: "Franklin Pierce", term: "1853-1857", year: 1853, number: 14 },
  { name: "James Buchanan", term: "1857-1861", year: 1857, number: 15 },
  { name: "Abraham Lincoln", term: "1861-1865", year: 1861, number: 16, status: "assassinated" },
  { name: "Andrew Johnson", term: "1865-1869", year: 1865, number: 17, status: "impeached" },
  { name: "Ulysses S. Grant", term: "1869-1877", year: 1869, number: 18 },
  { name: "Rutherford B. Hayes", term: "1877-1881", year: 1877, number: 19 },
  { name: "James A. Garfield", term: "1881", year: 1881, number: 20, status: "assassinated" },
  { name: "Chester A. Arthur", term: "1881-1885", year: 1881, number: 21 },
  { name: "Grover Cleveland", term: "1885-1889", year: 1885, number: 22 },
  { name: "Benjamin Harrison", term: "1889-1893", year: 1889, number: 23 },
  { name: "Grover Cleveland", term: "1893-1897", year: 1893, number: 24 },
  { name: "William McKinley", term: "1897-1901", year: 1897, number: 25, status: "assassinated" },
  { name: "Theodore Roosevelt", term: "1901-1909", year: 1901, number: 26 },
  { name: "William Howard Taft", term: "1909-1913", year: 1909, number: 27  },
  { name: "Woodrow Wilson", term: "1913-1921", year: 1913, number: 28 },
  { name: "Warren G. Harding", term:   "1921-1923", year: 1921, number: 29, status: "died-in-office" },
  { name: "Calvin Coolidge", term: "1923-1929", year: 1923, number: 30 },
  { name: "Herbert Hoover", term: "1929-1933", year: 1929, number: 31 },
  { name: "Franklin D. Roosevelt", term: "1933-1945", year: 1933, number: 32, status: "died-in-office" },
  { name: "Harry S. Truman", term: "1945-1953", year: 1945, number: 33 },
  { name: "Dwight D. Eisenhower", term: "1953-1961", year: 1953, number: 34 },
  { name: "John F. Kennedy", term: "1961-1963", year: 1961, number: 35, status: "assassinated" },
  { name: "Lyndon B. Johnson", term: "1963-1969", year: 1963, number: 36 },
  { name: "Richard Nixon", term: "1969-1974", year: 1969, number: 37, status: "resigned" },
  { name: "Gerald Ford", term: "1974-1977", year: 1974, number: 38 },
  { name: "Jimmy Carter", term: "1977-1981", year: 1977, number: 39 },
  { name: "Ronald Reagan", term: "1981-1989", year: 1981, number: 40 },
  { name: "George H. W. Bush", term: "1989-1993", year: 1989, number: 41 },
  { name: "Bill Clinton", term: "1993-2001", year: 1993, number: 42, status: "impeached" },
  { name: "George W. Bush", term: "2001-2009", year: 2001, number: 43 },
  { name: "Barack Obama", term: "2009-2017", year: 2009, number: 44 },
  { name: "Donald Trump", term: "2017-2021", year: 2017, number: 45, status: "impeached" },
  { name: "Joe Biden", term: "2021-2025", year: 2021, number: 46 },
  { name: "Donald Trump", term: "2025-2029", year: 2025, number: 47 },
];

const PRE_1900 = PRESIDENTS.filter((president) => president.year < 1897);
const MODERN = PRESIDENTS.filter((president) => president.year >= 1897);
const filledRows = new Set();
const pre1900Table = document.getElementById("pre1900-table");
const modernTable = document.getElementById("modern-table");
const guessInput = document.getElementById("guess-input");
const guessForm = document.getElementById("guess-form");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset-btn");
const scoreEl = document.getElementById("score");
const giveUpBtn = document.getElementById("give-up-btn");
const endScreen = document.getElementById("end-screen");
const playAgainBtn = document.getElementById("play-again-btn");
const exitBtn = document.getElementById("exit-btn");
const timerEl = document.getElementById("timer");
const endTitle = document.getElementById("end-title");
const endScore = document.getElementById("end-score");

let timeRemaining = 10 * 60;
let timerId = null;
let giveUpMode = false;

function exitEndScreen() {
  endScreen.classList.add("hidden");
}

function updateTimer() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  timerEl.textContent = `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {
  clearInterval(timerId);
  timeRemaining = 10 * 60;
  updateTimer();

  timerId = setInterval(() => {
    timeRemaining -= 1;
    updateTimer();

    if (timeRemaining <= 0) {
      finishGame("Time's up!");
    }
  }, 1000);
}

function normalizeName(name) {
  return String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function renderColumn(tableBody, presidentList) {
  tableBody.innerHTML = "";

  presidentList.forEach((president, index) => {
    const row = document.createElement("tr");
    const termCell = document.createElement("td");
    const nameCell = document.createElement("td");
    const originalIndex = PRESIDENTS.indexOf(president);
    
    if (president.status) {
      row.classList.add(`status-${president.status}`);
    }

    termCell.textContent = president.term;
    
    if (filledRows.has(originalIndex)) {
      nameCell.textContent = president.name;
    } else if (giveUpMode) {
      nameCell.textContent = president.name;
      nameCell.classList.add("revealed-name");
    } else {
      nameCell.textContent = "";
    }

    row.append(termCell, nameCell);
    tableBody.appendChild(row);
  });
}

function updateScore() {
  scoreEl.textContent = `${filledRows.size} / ${PRESIDENTS.length}`;
}

function renderTables() {
  renderColumn(pre1900Table, PRE_1900);
  renderColumn(modernTable, MODERN);
}

function setMessage(text, isError = false) {
  if (!message) return;
  message.textContent = text;
  message.style.color = isError ? "#b91c1c" : "#53657b";
}

function getLastName(name) {
  return String(name).trim().split(/\s+/).pop();
}

function matchesPresident(guessNormalized, president, index) {
  if (filledRows.has(index)) return false;

  const fullName = normalizeName(president.name);
  const lastName = normalizeName(getLastName(president.name));

  return fullName === guessNormalized || lastName === guessNormalized;
}

function clearGuessInput() {
  guessInput.value = "";
  guessInput.focus();
}

function handleGuess(event) {
  event.preventDefault();

  const guess = guessInput.value.trim();

  if (!guess) {
    setMessage("Please type a president's name.", true);
    return;
  }

  const normalizedGuess = normalizeName(guess);

  const matchIndex = PRESIDENTS.findIndex(
    (president, index) => !filledRows.has(index) && matchesPresident(normalizedGuess, president, index)
  );

  if (matchIndex === -1) {
    const alreadyExists = PRESIDENTS.some(
      (president, index) => filledRows.has(index) && matchesPresident(normalizedGuess, president, index)
    );

    setMessage(
      alreadyExists ? "That president is already filled in." : "That name does not match a president.",
      true
    );
    clearGuessInput();
    return;
  }

  filledRows.add(matchIndex);
  renderTables();
  updateScore();
  checkWin();
  setMessage(`Great job! ${PRESIDENTS[matchIndex].name} was added.`);
  clearGuessInput();
}

function resetBoard() {
  filledRows.clear();
  giveUpMode = false;
  endScreen.classList.add("hidden");
  guessInput.disabled = false;
  guessInput.value = "";
  renderTables();
  updateScore();
  setMessage("Fill in each president in any order.");
  startTimer();
  guessInput.focus();
}

function finishGame(title) {
  clearInterval(timerId);
  endTitle.textContent = title;
  endScore.textContent = `Score: ${filledRows.size} / ${PRESIDENTS.length}`;
  endScreen.classList.remove("hidden");
  guessInput.disabled = true;
  setMessage(title, false);
  renderTables();
}

function checkWin() {
  if (filledRows.size === PRESIDENTS.length) {
    finishGame("You got them all!");
  }
}

function giveUp() {
  giveUpMode = true;
  finishGame("Game over");
}

guessForm.addEventListener("submit", handleGuess);
resetButton.addEventListener("click", resetBoard);
giveUpBtn.addEventListener("click", giveUp);
playAgainBtn.addEventListener("click", resetBoard);
exitBtn.addEventListener("click", exitEndScreen);

renderTables();
updateScore();
startTimer();
