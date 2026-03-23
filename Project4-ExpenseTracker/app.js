const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const descriptionListEl = document.getElementById("description");
const transactionFormEl = document.getElementById("transaction-form");
const amountEl = document.getElementById("amount");



let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionFormEl.addEventListener("submit" , addTransaction);
updateTransactionList();
updateSummary();

function addTransaction(e){
    e.preventDefault();

    //get form values

    const descriptionValue = descriptionListEl.value.trim();
    const amountValue = parseFloat(amountEl.value);

    transactions.push({
        id:Date.now(),
        descriptionValue,
        amountValue
    });


    localStorage.setItem("transactions",JSON.stringify(transactions));

    updateTransactionList();
    updateSummary();

    transactionFormEl.reset();


}

function updateTransactionList(){
    transactionListEl.innerHTML = "";

    const sortedTransactions = [...transactions].reverse();  

    sortedTransactions.forEach((transaction) => {
       const transactionElement = createTransactionElement(transaction);
       transactionListEl.appendChild(transactionElement);
    });
}

function createTransactionElement(transaction){
    
    const li = document.createElement("li");
    li.classList.add("transaction");
    li.classList.add(transaction.amountValue > 0 ? "income" : "expense");

    li.innerHTML = `
        <span>${transaction.descriptionValue}</span>
        <span>${formatCurrency(transaction.amountValue)}
            <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>
        </span>
    `;

    return li;
}

function updateSummary(){
    let totalBalance = 0 ;
    let incomeBalance = 0 ;
    let expenseBalance = 0;

    //const balance = transactions.reduce((acc,transaction) => acc + transaction.amountValue, 0 );
    //const income = transactions.filter(transaction => transaction.amountValue > 0).reduce((acc,transaction) => acc + transaction.amountValue,0);
    //const expense = transactions.filter(transaction => transaction.amountValue < 0).reduce((acc,transaction) => acc + transaction.amountValue,0);

    transactions.forEach((t) =>{
        totalBalance = totalBalance + t.amountValue;

        if(t.amountValue < 0){
            expenseBalance = expenseBalance + t.amountValue;
        }
        else{
            incomeBalance = incomeBalance + t.amountValue;
        }

    });

    

    balanceEl.textContent = formatCurrency(totalBalance) ;
    incomeAmountEl.textContent = formatCurrency(incomeBalance);
    expenseAmountEl.textContent = formatCurrency(expenseBalance);

}


function removeTransaction(id){

    if(confirm("Are you sure?"));
    transactions = transactions.filter(transactions => transactions.id !== id);

    localStorage.setItem("transactions",JSON.stringify(transactions));

    updateTransactionList();
    updateSummary();
}

function formatCurrency(number){
    return new Intl.NumberFormat("en-US",{
        style:"currency",
        currency:"USD",
    }).format(number);

    
}




