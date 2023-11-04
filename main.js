const projectForm = document.getElementById('project-form');
const monthlyProgressPaymentDiv = document.getElementById('monthly-progress-payment');

projectForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get the project data from the form.
  const projectName = projectForm.querySelector('input[name="project-name"]').value;
  const contractAmount = projectForm.querySelector('input[name="contract-amount"]').value;
  const startDate = projectForm.querySelector('input[name="start-date"]').value;
  const endDate = projectForm.querySelector('input[name="end-date"]').value;

  // Calculate the monthly progress payment.
  const monthlyProgressPayment = calculateMonthlyProgressPayment(projectName, contractAmount, startDate, endDate);

  // Display the monthly progress payment.
  monthlyProgressPaymentDiv.textContent = `Monthly Progress Payment: $${monthlyProgressPayment}`;
});

// Calculates the monthly progress payment.
function calculateMonthlyProgressPayment(projectName, contractAmount, startDate, endDate) {
  // TODO: Implement this function.
}
