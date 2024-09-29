//variables

const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let isError = false;


//functions

function cleanInputString(str) {
    //using regular expression to find inputs that include "+" or "-" also the \s will remove whitespace. The brackets [] creates a character class that will match any of those items in any order. The 'g' flag will look for these characters globally.
  const regex = /[+-\s]/g;
  return str.replace(regex, "");
}

function isInvalidInput(str) {
    //using the "i" flag will enable it to be case-insensitive. It will allow for more flexibility and look for e, E, etc. The [0-9] flag on either side will enable the regex to match any number either before or after the "e". The "+" modifier allows to match a pattern one or more times, so here, i'm allowing it to find that character class more than once. The "\d" is a shorthand character class for [0-9]. Here, both are displayed for reference.
    const regex = /[0-9]+e\d+/i;
    // here, i only want to match and return instances of these invalid inputs
    return str.match(regex);

}

function addEntry() {
    const targetId = '#' + entryDropdown.value;
    const targetInputContainer = document.querySelector(`#${entryDropdown} .input-container`);
    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length;
    console.log(entryNumber);
    const HTMLString = ` 
    <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
    <input type="text" placeholder="Name" id="${entryDropdown.value}-${entryNumber}-name">
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input type="number" min="0" placeholder="Calories" id="${entryDropdown.value}-${entryNumber}-calories">`;
  }