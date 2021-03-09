
const sha1 = require('js-sha1')

const characterAmountRange = document.getElementById("characterAmountRange");
const characterAmountNumber = document.getElementById("characterAmountNumber");

const form = document.getElementById("passwordGenerator");

// see if it checkbox is including this elements
const includeUppercaseEl = document.getElementById("includeUppercase");
const includeNumbersEl = document.getElementById("includeNumbers");
const includeSymbolsEl = document.getElementById("includeSymbols");
// display the password on box
const passwordDisplay = document.getElementById("passwordDisplay");
// control the amount of caracters to use( the are syncronize )
characterAmountNumber.addEventListener("input", syncCharacterAmount);
characterAmountRange.addEventListener("input", syncCharacterAmount);

// const that contain the uppercase
const UPPERCASE_CHAR_CODES = arrayFromHighToLow(65, 90);
const LOWERCASE_CHAR_CODES = arrayFromHighToLow(97, 122);
const NUMBER_CHAR_CODES = arrayFromHighToLow(48, 57);
const SYMBOL_CHAR_CODES = arrayFromHighToLow(33, 47).concat(arrayFromHighToLow(58, 64)).concat(arrayFromHighToLow(91, 96)).concat(arrayFromHighToLow(123, 126))

// listener for call the generate password
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // pass the values of the chackbok box into generete pass function
  const characterAmount = characterAmountNumber.value;
  const includeUppercase = includeUppercaseEl.checked;
  const includeNumers = includeNumbersEl.checked;
  const includeSymbols = includeSymbolsEl.checked;
  // crete the password
  const password = generetePassword(
    characterAmount,
    includeUppercase,
    includeNumers,
    includeSymbols
  );
  console.log("passowrd ", password);
  passwordDisplay.innerText = password;
});

// generete the password 
function generetePassword(
  characterAmount,
  includeUppercase,
  includeNumers,
  includeSymbols
) {
  let charCodes = LOWERCASE_CHAR_CODES;
  if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
  if (includeNumers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);
  if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);

  const passwordCharacters = [];
  for (let i = 0; i < characterAmount; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];

    passwordCharacters.push(String.fromCharCode(characterCode));
  }
  console.log("passwordCharacters ", passwordCharacters);

  
  hasher()

  return passwordCharacters.join("");
}

function arrayFromHighToLow(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

// to sync the value of the amount and range
function syncCharacterAmount(e) {
  const value = e.target.value;
  characterAmountNumber.value = value;
  characterAmountRange.value = value;
}

function hasher(passwordCharacters) {
  let passToHash = sha1(passwordCharacters);
  console.log("passToHash", passToHash);
  let hash = sha1.create();
  hash.uppdate(passToHash)
  console.log("hash", hash);

}