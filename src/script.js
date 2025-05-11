// Get references to DOM elements for user input, result display, and buttons
const input = document.getElementById("user-input"); // Input field for the user to enter a phone number
const result = document.getElementById("results-div"); // Div to display validation results
const btnCheck = document.getElementById("check-btn"); // Button to trigger validation
const btnClear = document.getElementById("clear-btn"); // Button to clear input and results

// Define a regular expression to validate phone numbers
// This regex supports optional country codes (1 for US, 44 for UK), optional spaces, dashes, or parentheses
// It also allows for different formats of phone numbers, such as (123) 456-7890 or 123-456-7890
const regexFirstModelNumber =
  /^\+?(1|44)?\s?(\d{3}|\(\d{3}\)|\d{4}?)[- ]?(\d{3}|\d{6})[- ]?(\d{4}|\d{6})?$/;

// Store the regex in a list to allow for future extensibility
// Additional regex patterns can be added to this list to support more formats
const regexList = [regexFirstModelNumber];

// Function to determine if the input is a valid phone number
// It first checks for specific patterns of 7-digit or 11-digit numbers
// If those patterns are not matched, it tests the input against the regex list
const isFailedInput = (str) => {
  // Check if the input is exactly 7 or 11 digits (common formats for phone numbers)
  if (/^\d{7}$/.test(str) || /^\d{11}$/.test(str)) {
    return false; // Valid input
  }
  // Test the input against all regex patterns in the list
  return regexList.some((regex) => regex.test(str));
};

// Function to handle the submission of the phone number for validation
const submit = () => {
  // Check if the input is valid or invalid
  const isFailed = isFailedInput(input.value);

  // If the input field is empty, alert the user to provide a phone number
  if (input.value === "") return alert("Please provide a phone number");

  // Reset the result div's classes to remove any previous validation states
  result.classList.remove("hidden", "validate", "invalidate");

  // Add appropriate class based on validation result
  // 'validate' class is added for valid numbers, 'invalidate' for invalid numbers
  isFailed
    ? result.classList.add("validate")
    : result.classList.add("invalidate");

  // Update the result div's text content to display the validation result
  result.textContent = isFailed
    ? `Valid US number: ${input.value}` // Message for valid numbers
    : `Invalid US number: ${input.value}`; // Message for invalid numbers
};

// Function to clear the input field and result display
const clear = () => {
  result.textContent = ""; // Clear the result text
  input.value = ""; // Clear the input field
  result.classList.add("hidden"); // Hide the result div
};

// Add event listeners to the buttons for user interaction
btnCheck.addEventListener("click", submit); // Trigger validation on 'Check' button click
btnClear.addEventListener("click", clear); // Clear input and results on 'Clear' button click

// Add an event listener to the input field to allow submission with the Enter key
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") submit(); // Trigger validation when Enter is pressed
});
