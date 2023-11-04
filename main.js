document.addEventListener("DOMContentLoaded", function () {
    const projectForm = document.getElementById("project-form");
    const itemsTbody = document.getElementById("items-tbody");
    const monthlyProgressPaymentDiv = document.getElementById("monthly-progress-payment");
    const filterInput = document.querySelector(".filter-input");
    const totalProgressDiv = document.querySelector(".total-progress");

    // Add an event listener to the Add Item button.
    document.getElementById("add-item-button").addEventListener("click", function () {
        // Create a new item row.
        const itemRow = document.createElement("tr");

        // Add input fields for item details.
        itemRow.innerHTML = `
            <td><input type="text" class="input-field" name="item-name" placeholder="Item Name" required></td>
            <td><input type="number" class="input-field" name="quantity" required></td>
            <td><input type="number" class="input-field" name="unit-price" required></td>
            <td><input type="number" class="input-field" name="previous-quantity" required></td>
        `;

        // Add the item row to the table body.
        itemsTbody.appendChild(itemRow);
    });

    // Add an event listener to the Filter button.
    document.querySelector(".filter-btn").addEventListener("click", function () {
        // Get the filter value.
        const filterValue = filterInput.value;

        // Filter the items in the table.
        filterItems(itemsTbody, filterValue);
    });

    // Handle the form submission.
    projectForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get the project data from the form.
        const projectName = projectForm.querySelector('input[name="project-name"]').value;
        const contractAmount = parseFloat(projectForm.querySelector('input[name="contract-amount"]').value);
        const startDate = new Date(projectForm.querySelector('input[name="start-date"]').value);
        const endDate = new Date(projectForm.querySelector('input[name="end-date"]').value);

        // Get the item data from the table.
        const items = [];
        for (const row of itemsTbody.querySelectorAll('tr')) {
            const itemName = row.querySelector('input[name="item-name"]').value;
            const quantity = parseFloat(row.querySelector('input[name="quantity"]').value);
            const unitPrice = parseFloat(row.querySelector('input[name="unit-price"]').value);
            const previousQuantity = parseFloat(row.querySelector('input[name="previous-quantity"]').value);

            if (itemName && !isNaN(quantity) && !isNaN(unitPrice) && !isNaN(previousQuantity)) {
                const item = {
                    name: itemName,
                    quantity: quantity,
                    unitPrice: unitPrice,
                    previousQuantity: previousQuantity,
                };

                items.push(item);
            }
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

    // Filters the items in the table.
    function filterItems(tableBody, filterValue) {
        const items = tableBody.querySelectorAll('tr');

        for (const item of items) {
            const name = item.querySelector('input[name="item-name"]').value;

            if (name.toLowerCase().includes(filterValue.toLowerCase())) {
                item.style.display = 'table-row';
            } else {
                item.style.display = 'none';
            }
        }
    }
});
