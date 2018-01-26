/*  -------------- Formulas ------------- */
// Calculate Monthly: MP = (P+FC) / N
    //P = Amount borrowed
    //FC = Total interest (P x R x T)
    //N = Number of months the loan is for

    // Example: You borrow $10,000 at 8% for 4 years
       // FC = 10,000 x 8% x 4 = $3,200
       // MP = (10,000 + 3,200) / 48
       // = $275

// Calculate Total Payment: Monthly payment x total months
// Calculate Total Interest: Total Payment - Amount borrowed

/* ------------ Steps ------------ */
// 1.) One event handler for loanForm
   //event handler sends input values into calculation functions
// 2.) create function for each calculation
// 3.) functions pass args with results to each other to determine all results



// Variable Declaration
const loanAmountInput = document.getElementById('amount');
const interestInput = document.getElementById('interest');
const yearsInput = document.getElementById('years');
const calcBtn = document.querySelector('input.btn');
const loanForm = document.getElementById('loan-form');

const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');

const container = document.querySelector('.card-body');
const resultsContainer = document.getElementById('results');

const loader = document.getElementById('loading');

resultsContainer.style.display = "none";
loader.style.display = "none";


// Event Handler
loanForm.addEventListener("submit", calculateResults);



function calculateResults(event){
	event.preventDefault();

	//get input values
	let loanAmount = loanAmountInput.value;
	let interestAmount = interestInput.value;
	let yearsAmount = yearsInput.value;

	if(loanAmount == '' || interestAmount == '' || yearsAmount == ''){
		showError();
	} else{
     // Insert function returns into input values
      loader.style.display="block";
      resultsContainer.style.display = "none";

     window.setTimeout(function(){
     let monthly = getMonthly(loanAmount, interestAmount, yearsAmount);
	 monthlyPayment.value = monthly.toFixed(2);
	 resultsContainer.style.display = "block";
	 loader.style.display = "none";
	},2000);
	}
	
}


/* --------- Calculation Functions ---------- */

// Get monthly Payment
function getMonthly(loanAmount, interestAmount, years){

let totalInterest = loanAmount * (interestAmount/100) * years;
let months = years*12;
let total = (parseFloat(loanAmount) + parseFloat(totalInterest)) / months;

getTotal(total, months, loanAmount);
return total;

}

// Get total Payment
function getTotal(monthly, totalMonths, loanAmount){

let total = monthly * totalMonths;
totalPayment.value = total.toFixed(2);
getTotalInterest(total, loanAmount);

}

// Get total Interest Payment
function getTotalInterest(total, loanAmount){
let interest = total - loanAmount;
totalInterest.value = interest.toFixed(2);

}

//Show error
function showError(){
	var errorMessage = document.createElement('div');
	errorMessage.innerHTML = "<p> Check Input Fields </p>";
	errorMessage.style.width = '100%';
	errorMessage.style.height = '70px';
	errorMessage.style.backgroundColor = 'rgb(0,0,0)';
	errorMessage.style.color = "orange";
	errorMessage.style.paddingTop = "20px";
	errorMessage.style.position = "absolute";
	errorMessage.style.top = "0";
	errorMessage.style.left = "0";
	errorMessage.style.display = "none";

    container.appendChild(errorMessage);

	//Show message
    errorMessage.style.display = "block";
	
     window.setTimeout(function(){
       errorMessage.style.display = "none";
     },4000);

}





