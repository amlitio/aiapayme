document.addEventListener("DOMContentLoaded", function () {
    const prevMonthInput = document.getElementById("prevMonth");
    const currMonthInput = document.getElementById("currMonth");
    const calculateBtn = document.getElementById("calculateBtn");
    const result = document.getElementById("result");
    const saveBtn = document.getElementById("saveBtn");
    const exportBtn = document.getElementById("exportBtn");

    calculateBtn.addEventListener("click", function () {
        const prevMonthAmount = parseFloat(prevMonthInput.value);
        const currMonthAmount = parseFloat(currMonthInput.value);

        if (isNaN(prevMonthAmount) || isNaN(currMonthAmount) || prevMonthAmount < 0 || currMonthAmount < 0) {
            result.textContent = "Please enter valid positive numbers.";
        } else {
            const payment = currMonthAmount - prevMonthAmount;
            result.textContent = `Monthly Payment: $${payment.toFixed(2)}`;
        }
    });

    saveBtn.addEventListener("click", function () {
        const prevMonthAmount = parseFloat(prevMonthInput.value);
        const currMonthAmount = parseFloat(currMonthInput.value);

        if (!isNaN(prevMonthAmount) && !isNaN(currMonthAmount) && prevMonthAmount >= 0 && currMonthAmount >= 0) {
            const data = {
                prevMonthAmount,
                currMonthAmount
            };
            localStorage.setItem("projectData", JSON.stringify(data));
            result.textContent = "Data saved.";
        } else {
            result.textContent = "Please enter valid positive numbers before saving.";
        }
    });

    exportBtn.addEventListener("click", function () {
        const savedData = localStorage.getItem("projectData");
        if (savedData) {
            const data = JSON.parse(savedData);
            const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "project_data.json";
            a.click();
        } else {
            result.textContent = "No data to export. Please save data first.";
        }
    });
});
