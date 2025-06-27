let solve = (equation) => {
  if (equation.length !== 3) {
    return console.error("WHY?");
  }
  const firstVal = parseFloat(equation[0]);
  const secondVal = parseFloat(equation[2]);
  const operator = equation[1];

  if (operator === "+") {
    return Math.round((firstVal + secondVal) * 1e12) / 1e12;
  } else if (operator === "-") {
    return Math.round((firstVal - secondVal) * 1e12) / 1e12;
  } else if (operator === "×") {
    return Math.round(firstVal * secondVal * 1e12) / 1e12;
  } else if (operator === "÷") {
    return Math.round((firstVal / secondVal) * 1e12) / 1e12;
  } else {
    return console.error("What the fuck");
  }
};

const screenTop = document.querySelector(".screen-top > div");
const screenBottom = document.querySelector(".screen-bottom > div");
const buttons = document.querySelectorAll("button");
const buttonList = [...buttons];

let currentInput = [];
let equation = [];
let currentAnswer = 0;
let canType = true;

// Button events
buttonList.map((button) => {
  button.addEventListener("click", (e) => {
    if (e.currentTarget.id === "delete") {
      currentInput.pop();
      updateUI();
      return;
    } else if (e.currentTarget.id === "clear") {
      currentInput = [];
      equation = [];
      currentAnswer = 0;
      canType = true;
      updateUI();
      return;
    }

    const value = e.currentTarget.dataset.value;
    if (value === "÷" || value === "×" || value === "-" || value === "+") {
      if (currentInput.length === 0) {
        return;
      }

      if (currentInput[0] === "C") {
        return;
      }

      // Parse float here if needed
      equation.push(currentInput.join(""));

      // If a equation is made
      if (equation.length === 3) {
        // Solve it
        currentAnswer = solve(equation);
        if (!isFinite(currentAnswer)) {
          currentInput = "Cannot divide by 0".split("");
          canType = false;
          equation = [];
          currentAnswer = 0;
        } else {
          // Add answer to current equation
          equation = [currentAnswer];
          equation.push(value);
          currentInput = [];
        }
      } else {
        equation.push(value);
        currentInput = [];
      }

      updateUI();
      return;
    } else if (value === "=") {
      // Equal sign task
      // If equation have just a number don't solve
      if (equation.length < 2) {
        return;
      }

      // If equation have the operator and number then join and solve
      if (equation.length === 2) {
        if (currentInput.length !== 0) {
          equation.push(currentInput.join(""));
        } else {
          return;
        }
      }

      // Solve only if equation is long enough
      if (equation.length === 3) {
        currentAnswer = solve(equation);
        equation = [];
        // Check infinity
        if (!isFinite(currentAnswer)) {
          currentInput = "Cannot divide by 0".split("");
        } else {
          currentInput = [currentAnswer];
        }
        canType = false;
      }
      updateUI();
      return;
    } else if (value === ".") {
      if (currentInput.includes(".")) return;
      currentInput.push(value);
      updateUI();
    } else {
      // Button tasks
      if (!canType) {
        currentInput = [];
        updateUI();
        canType = true;
      }
      currentInput.push(value);
      updateUI();
    }
  });
});

function updateUI() {
  screenTop.textContent = equation.join("");
  screenBottom.textContent = currentInput.join("");
}

console.log(buttonList);

// Keyboard event simulation
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "0":
      buttonList[15].click();
      break;
    case "1":
      buttonList[10].click();
      break;
    case "2":
      buttonList[11].click();
      break;
    case "3":
      buttonList[12].click();
      break;
    case "4":
      buttonList[6].click();
      break;
    case "5":
      buttonList[7].click();
      break;
    case "6":
      buttonList[8].click();
      break;
    case "7":
      buttonList[2].click();
      break;
    case "8":
      buttonList[3].click();
      break;
    case "9":
      buttonList[4].click();
      break;
    case ".":
      buttonList[14].click();
      break;
    case "/":
      buttonList[5].click();
      break;
    case "*":
      buttonList[9].click();
      break;
    case "+":
      buttonList[17].click();
      break;
    case "-":
      buttonList[13].click();
      break;
    case "=":
      buttonList[16].click();
      break;
    case "Enter":
      buttonList[16].click();
      break;
    case "Backspace":
      buttonList[1].click();
      break;
    case "Delete":
      buttonList[0].click();
      break;
    case "Escape":
      buttonList[0].click();
      break;
    default:
      // Ignore other keys
      break;
  }
});
