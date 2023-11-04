const projectForm = document.getElementById('project-form');
const itemsTbody = document.getElementById('items-tbody');
const monthlyProgressPaymentDiv = document.getElementById('monthly-progress-payment');

// Add an event listener to the Add Item button.
document.getElementById('add-item-button').addEventListener('click', function() {
  // Create a new item row.
  const itemRow = document.createElement('tr');
  itemRow.classList.add('border-b');

  // Create the item name cell.
  const itemNameCell = document.createElement('td');
  itemNameCell.classList.add('px-4 py-2');

  // Create the quantity cell.
  const quantityCell = document.createElement('td');
  quantityCell.classList.add('px-4 py-2');

  // Create the unit price cell.
  const unitPriceCell = document.createElement('td');
  unitPriceCell.classList.add('px-4 py-2');

  // Create the previous quantity cell.
  const previousQuantityCell = document.createElement('td');
  previousQuantityCell.classList.add('px-4 py-2');

  // Append the cells to the item row.
  itemRow.appendChild(itemNameCell);
  itemRow.appendChild(quantityCell);
  itemRow.appendChild(unitPriceCell);
  itemRow.appendChild(previousQuantityCell);

  // Append the item row to the table body.
  itemsTbody.appendChild(itemRow);
});

// Handle the form submission.
projectForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get the project data from the form.
  const projectName = projectForm.querySelector('input[name="project-name"]').value;
  const contractAmount = projectForm.querySelector('input[name="contract-amount"]').value;
  const startDate = projectForm.querySelector('input[name="start-date"]').value;
  const endDate = projectForm.querySelector('input[name="end-date"]').value;

  // Get the item data from the table.
  const items = [];
  for (const row of itemsTbody.querySelectorAll('tr')) {
    const item = {
      name: row.querySelector('td:nth-child(1)').textContent,
      quantity: Number(row.querySelector('td:nth-child(2)').textContent),
      unitPrice: Number(row.querySelector('td:nth-child(3)').textContent),
      previousQuantity: Number(row.querySelector('td:nth-child(4)').textContent),
    };

    items.push(item);
  }

  // Calculate the monthly progress payment.
  const monthlyProgressPayment = calculateMonthlyProgressPayment(projectName, contractAmount, startDate, endDate, items);

  // Display the monthly progress payment.
  monthlyProgressPaymentDiv.textContent = `Monthly Progress Payment: $${monthlyProgressPayment}`;
});

// Calculates the monthly progress payment.
function calculateMonthlyProgressPayment(projectName, contractAmount, startDate, endDate, items) {
  // TODO: Implement this function.
}
