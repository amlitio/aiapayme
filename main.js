const projectForm = document.getElementById('project-form');
const itemsTbody = document.getElementById('items-tbody');
const monthlyProgressPaymentDiv = document.getElementById('monthly-progress-payment');
const filterInput = document.querySelector('.filter-input');
const totalProgressDiv = document.querySelector('.total-progress');

// Add an event listener to the Add Item button.
document.getElementById('add-item-button').addEventListener('click', function() {
  // Create a new item row.
  const itemRow = document.createElement('tr');

  // Add the item row to the table body.
  itemsTbody.appendChild(itemRow);
});

// Add an event listener to the Filter button.
document.querySelector('.filter-btn').addEventListener('click', function() {
  // Get the filter value.
  const filterValue = filterInput.value;

  // Filter the items in the table.
  filterItems(itemsTbody, filterValue);
});

// Handle the form submission.
projectForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Validate the form data.
  if (!validateForm()) {
    return;
  }

  // Get the project data from the form.
  const projectName = projectForm.querySelector('input[name="project-name"]').value;
  const contractAmount = parseFloat(projectForm.querySelector('input[name="contract-amount"]').value);
  const startDate = new Date(projectForm.querySelector('input[name="start-date"]').value);
  const endDate = new Date(projectForm.querySelector('input[name="end-date"]').value);

  // Get the item data from the table.
  const items = [];
  for (const row of itemsTbody.querySelectorAll('tr')) {
    const item = {
      name: row.querySelector('td:nth-child(1)').textContent,
      quantity: parseFloat(row.querySelector('td:nth-child(2)').textContent),
      unitPrice: parseFloat(row.querySelector('td:nth-child(3)').textContent),
      previousQuantity: parseFloat(row.querySelector('td:nth-child(4)').textContent),
    };

    items.push(item);
  }

  // Calculate the monthly progress payment.
  const monthlyProgressPayment = calculateMonthlyProgressPayment(projectName, contractAmount, startDate, endDate, items);

  // Display the monthly progress payment and the total progress.
  monthlyProgressPaymentDiv.textContent = `Monthly Progress Payment: $${monthlyProgressPayment.toFixed(2)}`;
  totalProgressDiv.textContent = `Total Progress: $${calculateTotalProgress(items).toFixed(2)}`;
});

// Calculates the monthly progress payment.
function calculateMonthlyProgressPayment(projectName, contractAmount, startDate, endDate, items) {
  let totalProgress = 0;
  const daysInMonth = 30; // Assuming an average month length

  for (const item of items) {
    const currentQuantity = item.quantity;
    const previousQuantity = item.previousQuantity;

    const progress = (currentQuantity - previousQuantity) * item.unitPrice;
    totalProgress += progress;
  }

  const projectDuration = (endDate - startDate) / (1000 * 60 * 60 * 24); // Convert milliseconds to days
  const monthlyProgressPayment = (totalProgress / contractAmount) * (daysInMonth / projectDuration);

  return monthlyProgressPayment;
}

// Calculates the total progress.
function calculateTotalProgress(items) {
  let totalProgress = 0;

  for (const item of items) {
    const currentQuantity = item.quantity;
    const previousQuantity = item.previousQuantity;

    const progress = (currentQuantity - previousQuantity) * item.unitPrice;
    totalProgress += progress;
  }

  return totalProgress;
}

// Validates the form data.
function validateForm() {
  // Get the input values from the form
  const projectNameInput = projectForm.querySelector('input[name="project-name"]');
  const contractAmountInput = projectForm.querySelector('input[name="contract-amount"]');
  const startDateInput = projectForm.querySelector('input[name="start-date"]');
  const endDateInput = projectForm.querySelector('input[name="end-date']');

  // Define a validation flag
  let isValid = true;

  // Example validation (you can add more specific validations)
  if (!projectNameInput.value) {
    alert('Project Name is required');
    isValid = false;
  }

  if (isNaN(parseFloat(contractAmountInput.value))) {
    alert('Contract Amount must be a number');
    isValid = false;
  }

  if (isNaN(Date.parse(startDateInput.value))) {
    alert('Start Date is not a valid date');
    isValid = false;
  }

  if (isNaN(Date.parse(endDateInput.value))) {
    alert('End Date is not a valid date');
    isValid = false;
  }

  return isValid;
}

// Filters the items in the table.
function filterItems(tableBody, filterValue) {
  const items = tableBody.querySelectorAll('tr');

  for (const item of items) {
    const name = item.querySelector('td:nth-child(1)').textContent;

    if (name.toLowerCase().includes(filterValue.toLowerCase())) {
      item.style.display = 'table-row';
    } else {
      item.style.display = 'none';
    }
  }
}
