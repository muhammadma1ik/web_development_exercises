// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get references to DOM elements
    const costPerLiterInput = document.getElementById('costPerLiter');
    const litersPurchasedInput = document.getElementById('litersPurchased');
    const calculateBtn = document.getElementById('calculateBtn');
    const totalCostDisplay = document.getElementById('totalCost');
  
    // Function to calculate total petrol cost
    function calculatePetrolCost() {
      const costPerLiter = parseFloat(costPerLiterInput.value);
      const litersPurchased = parseFloat(litersPurchasedInput.value);
      
      // Validates input values
      if (isNaN(costPerLiter) || isNaN(litersPurchased)) {
        totalCostDisplay.textContent = 'Please enter valid numbers.';
        return;
      }
  
      // Calculates the total cost
      const totalCost = costPerLiter * litersPurchased;
      
      // Displays the result in the totalCost paragraph
      totalCostDisplay.textContent = 'Total Cost: ' + totalCost.toFixed(2) + " aed";
    }
  
    // Adds event listener to the button for click events
    calculateBtn.addEventListener('click', calculatePetrolCost);
  });
  