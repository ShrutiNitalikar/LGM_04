// script.js
let currentInput = '';
let currentOperator = '';
let currentTotal = '';
let operationHistory = [{ expression: '' }];

function updateDisplay() {
  document.getElementById('display').value = operationHistory.length === 0 ? '0' : operationHistory[operationHistory.length - 1].expression;
}

function appendValue(value) {
  currentInput += value;
  operationHistory[operationHistory.length - 1].expression += value;
  updateDisplay();
}

function appendOperator(operator) {
  if (currentInput !== '') {
    currentOperator = operator;
    currentTotal = currentInput;
    currentInput = '';
    operationHistory[operationHistory.length - 1].expression += ` ${operator} `;
    updateDisplay();
  }
}

function appendBracket(bracket) {
  currentInput += bracket;
  operationHistory[operationHistory.length - 1].expression += bracket;
  updateDisplay();
}

function appendDecimal() {
  if (currentInput.indexOf('.') === -1) {
    currentInput += '.';
    operationHistory[operationHistory.length - 1].expression += '.';
    updateDisplay();
  }
}

function calculate() {
  if (currentInput !== '') {
    try {
      const result = eval(operationHistory[operationHistory.length - 1].expression);
      currentTotal = result.toString();
      currentInput = '';
      currentOperator = '';
      operationHistory.push({ expression: currentTotal });
      updateDisplay();
    } catch (error) {
      alert('Invalid expression');
      clearDisplay();
    }
  }
}

function clearDisplay() {
  currentInput = '';
  currentOperator = '';
  currentTotal = '';
  operationHistory = [{ expression: '' }];
  updateDisplay();
}

function showHistory() {
  const modal = document.getElementById('historyModal');
  const historyList = document.getElementById('historyList');

  // Clear previous entries
  historyList.innerHTML = '';

  // Display calculation history
  for (const entry of operationHistory) {
    const listItem = document.createElement('li');
    listItem.textContent = entry.expression;
    historyList.appendChild(listItem);
  }

  modal.style.display = 'block';
}

function closeHistoryModal() {
  const modal = document.getElementById('historyModal');
  modal.style.display = 'none';
}

updateDisplay();
