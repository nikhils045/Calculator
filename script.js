// Get all the buttons and input field
const buttons = document.querySelectorAll(".number, .operator, .special-operator");
const inputField = document.querySelector('input[name="result"]');

// Add click event listeners to all buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => handleButtonClick(button.textContent));
});

// Function to handle button clicks
function handleButtonClick(buttonText) {
  // Check if the input field is empty and the clicked button is '0'
  if (inputField.value === "" && buttonText === "0") {
    // Do not allow '0' at the beginning
    return;
  }
  // Replace "×" with "*" and "÷" with "/"
  const sanitizedText = buttonText.replace("×", "*").replace("÷", "/");

  // Handle AC button
  if (sanitizedText === "AC") {
    inputField.value = "";
  }
  // Handle +/- button
  else if (sanitizedText === "+/-") {
    inputField.value = eval(inputField.value) * -1;
  }
  // Handle % button
  else if (sanitizedText === "%") {
    inputField.value = eval(inputField.value) / 100;
  }
  // Handle = button
  else if (sanitizedText === "=") {
    try {
      const result = eval(inputField.value);
      inputField.value = parseFloat(result.toFixed(5)).toString();
    } catch (error) {
      inputField.value = "Error";
    }
  }
  // Handle other operators and numbers
  else {
    // Get the last character in the input field
    const lastChar = inputField.value.slice(-1);

    // Check if the last character is an operator and the clicked button is also an operator
    if (/[\+\-\*\/]/.test(lastChar) && /[\+\-\*\/]/.test(sanitizedText)) {
      // Replace the last operator with the new operator
      inputField.value = inputField.value.slice(0, -1) + sanitizedText;
    } else {
      // Append the clicked button text to the input field
      inputField.value += sanitizedText;
    }
  }
}

// Add keyboard event listener
document.addEventListener("keydown", (event) => {
  event.preventDefault(); // Prevent default behavior of the keydown event
  const keyPressed = event.key;

  // Handle backspace key
  if (keyPressed === "Backspace") {
    inputField.value = inputField.value.slice(0, -1); // Remove the last character
  }

  // Check if the pressed key is a number, operator, or special character
  if (/[\d\+\-\*\/%]/.test(keyPressed)) {
    handleButtonClick(keyPressed);
  } else if (keyPressed === "." && !inputField.value.endsWith(".")) {
    handleButtonClick(keyPressed);
  } else if (keyPressed === "=" || keyPressed === "Enter") {
    handleButtonClick("=");
  } else if (keyPressed === "Escape") {
    handleButtonClick("AC");
  }
});
