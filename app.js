let UZLASTIRMA_UCRETI = 0;
let BILIRKISI_UCRETI = 0;
let ADLI_TIP_RAPOR_UCRETI = 0;

function getDaysBetweenDates(startDate, endDate) {
    let dates = [];
    let currentDate = new Date(startDate.split("/").reverse().join("-"));
    let end = new Date(endDate.split("/").reverse().join("-"));
    while (currentDate <= end) {
        let day = currentDate.getDate().toString().padStart(2, '0');
        let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        let year = currentDate.getFullYear();
        dates.push(`${day}/${month}/${year}`);
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
}

let dateRanges = [
    { startDate: "25/06/2006", endDate: "09/01/2008", value: 4 },
    { startDate: "10/01/2008", endDate: "09/08/2009", value: 4.5 },
    { startDate: "10/08/2009", endDate: "31/12/2010", value: 5 },
    { startDate: "01/01/2011", endDate: "31/12/2011", value: 6 },
    { startDate: "01/01/2012", endDate: "31/12/2012", value: 7 },
    { startDate: "01/01/2013", endDate: "31/12/2013", value: 8 },
    { startDate: "01/01/2014", endDate: "04/05/2014", value: 8 },
    { startDate: "05/05/2014", endDate: "01/02/2015", value: 9 },
    { startDate: "02/02/2015", endDate: "01/05/2016", value: 9 },
    { startDate: "02/05/2016", endDate: "10/07/2016", value: 10 },
    { startDate: "11/07/2016", endDate: "30/07/2017", value: 11 },
    { startDate: "31/07/2017", endDate: "01/01/2018", value: 12.5 },
    { startDate: "02/01/2018", endDate: "20/05/2019", value: 14 },
    { startDate: "20/05/2019", endDate: "31/10/2019", value: 16.2 },
    { startDate: "01/11/2019", endDate: "31/10/2021", value: 19 },
    { startDate: "01/11/2021", endDate: "06/02/2022", value: 26 },
    { startDate: "07/02/2022", endDate: "14/08/2022", value: 31 },
    { startDate: "15/08/2022", endDate: "31/01/2023", value: 42 },
    { startDate: "01/02/2023", endDate: "26/05/2023", value: 58 }
];

let dateValues = {};

dateRanges.forEach(range => {
    let dates = getDaysBetweenDates(range.startDate, range.endDate);
    dates.forEach(date => {
        dateValues[date] = range.value;
    });
});

let dateInputsContainer = document.querySelector("#dateInputsContainer");
let feeInput = document.querySelector("#feeInput");
let bilirkisiInput = document.querySelector("#bilirkisiInput");
let adliTıpRaporInput = document.querySelector("#adliTıpRaporInput");
let output = document.querySelector("#output");
let totalOutput = document.querySelector("#totalOutput");

addDateInput();

document.querySelector("#addButton").addEventListener("click", addDateInput);

feeInput.addEventListener("input", updateOutput);
bilirkisiInput.addEventListener("input", updateOutput);
adliTıpRaporInput.addEventListener("input", updateOutput);

function addDateInput() {
    let container = document.createElement("div");
    let dateInput = document.createElement("input");
    dateInput.type = "text";
    dateInput.placeholder = "Enter a date (dd/MM/yyyy)";
    dateInput.addEventListener("input", updateOutput);
    container.appendChild(dateInput);
    let quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.min = "1";
    quantityInput.value = "1";
    quantityInput.addEventListener("input", updateOutput);
    container.appendChild(quantityInput);
    dateInputsContainer.appendChild(container);
}

function updateOutput() {
    UZLASTIRMA_UCRETI = parseInt(feeInput.value) || 0;
    BILIRKISI_UCRETI = parseInt(bilirkisiInput.value) || 0;
    ADLI_TIP_RAPOR_UCRETI = parseInt(adliTıpRaporInput.value) || 0;
    let containers = Array.from(dateInputsContainer.querySelectorAll("div"));
    let totalValue = 0;
    containers.forEach(container => {
        let dateInput = container.querySelector("input[type=text]");
        let quantityInput = container.querySelector("input[type=number]");
        let date = dateInput.value;
        let quantity = parseInt(quantityInput.value) || 1;
        if (dateValues.hasOwnProperty(date)) {
            totalValue += (dateValues[date] + UZLASTIRMA_UCRETI) * quantity;
        }
    });
    output.innerHTML =
`Uzlaştırma Ücreti: ${UZLASTIRMA_UCRETI} TL<br>Bilirkişi ücreti: ${BILIRKISI_UCRETI} TL<br>Adli tıp rapor ücreti: ${ADLI_TIP_RAPOR_UCRETI} TL<br>Tarih Ücretleri: ${totalValue} TL`;
totalOutput.textContent =
`Total Value: ${totalValue + BILIRKISI_UCRETI + ADLI_TIP_RAPOR_UCRETI} TL`;
}