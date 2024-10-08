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
    //<select> name attribute is set to "options". the <option> element has a value attribute that will switch based on user's choice. value of #entryDropdown will be based on user's option choice.

    const targetId = '#' + entryDropdown.value; //this line adds the "#" to whatever option the user chooses between breakfast,lunch,dinner, snacks,and exercise.

    const targetInputContainer = document.querySelector(`#${entryDropdown} .input-container`); //this line adds "#" to the food/exercise that the user types in the fieldsets.

    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1; //prevents the count from starting 0, instead of 1, like it's supposed to.
    //this line will calculate how many entries have been added by the user so far
        
    const HTMLString = ` 
    <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
    <input type="text" placeholder="Name" id="${entryDropdown.value}-${entryNumber}-name">
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input type="number" min="0" placeholder="Calories" id="${entryDropdown.value}-${entryNumber}-calories">`;

    //this is the dynamic code that will update as the user populates the information.


    targetInputContainer.insertAdjacentHTML('beforeend', HTMLString); //this code appends a new label and input element into the form. 
  } 

  addEntryButton.addEventListener('click', addEntry);


    function calculateCalories(e) {
      e.preventDefault(); // this prevents the page from resetting after it submits
      isError = false; //resets the global error flag to false
      const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type=number]');
      const lunchNumberInputs = document.querySelectorAll("#lunch input[type='number']");
      const dinnerNumberInputs = document.querySelectorAll("#dinner input[type='number']");
      const snacksNumberInputs = document.querySelectorAll("#snacks input[type='number']");
      const exerciseNumberInputs = document.querySelectorAll("#exercise input[type='number']");
      const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
      const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
      const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
      const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
      const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
      const budgetCalories = getCaloriesFromInputs([budgetNumberInput]); //this parameter is passed within an array because the NodeList is necessary

      if (isError) {
        return //this will end the function if an invalid input is detected
      }
      const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
      const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
      const surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit"; // ternary operator will decide what surplusOrDeficit will be

      output.innerHTML = `<span class="${surplusOrDeficit.value.toLowerCase()};

      output.innerHTML = `<span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
      
      <hr>

      <p>${budgetCalories} Calories Budgeted</p>
      <p>${consumedCalories} Calories Consumed</p>
      <p>${exerciseCalories} Calories Burned</p>
  
      `;
      output.classList.remove('hide');
      }
      function getCaloriesFromInputs(list) {
    let calories = 0;
    for (const item of list) { //this loop will iterate thru the NodeList that will be returned once we pull the entries.
      const currVal = cleanInputString(item.value);
      const invalidInputMatch = isInvalidInput(currVal)
      //both of this variables are created to "clean" the user's input before we start utilizing for calculation. invalidInputMatch will contain the elements that are unnecessary by the user.
      if (invalidInputMatch) {
        alert(`Invalid Input: ${invalidInputMatch[0]}`);
        isError = true;
        return null;
      } 
      calories += Number(currVal); //the Number function converts a value to a number
    }
        return calories;
      
  }
addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener('submit', calculateCalories);

function clearForm() {
  const inputContainers = Array.from(document.querySelectorAll('.input-container')); //returns a array from the original NodeList that comes back from the elemental return of '.input-container'
}


