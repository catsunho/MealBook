// 取得今天日期
let currentDate = new Date();

const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long"
};

function updateDate(){

    const todayText =
        currentDate.toLocaleDateString("zh-TW", options);

    document.getElementById("today").textContent =
        todayText;

}   // ← updateDate 在這裡結束

function getDateKey(){

    const year = currentDate.getFullYear();

    const month = String(currentDate.getMonth() + 1).padStart(2, "0");

    const day = String(currentDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}
// ===== 儲存資料 =====
const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", () => {

    const mealData = {

        breakfast: document.getElementById("breakfast").value,

        lunch: document.getElementById("lunch").value,

        dinner: document.getElementById("dinner").value,

        snack: document.getElementById("snack").value,

        note: document.getElementById("note").value

    };

const mealKey = `mealbook-${getDateKey()}`;

localStorage.setItem(mealKey, JSON.stringify(mealData));

alert("✅ 今天的餐點已儲存！");
});


// ===== 讀取資料 =====

function loadMeals(){

    const mealKey = `mealbook-${getDateKey()}`;

    const savedData = localStorage.getItem(mealKey);

    if(savedData){

        const mealData = JSON.parse(savedData);

        document.getElementById("breakfast").value =
            mealData.breakfast || "";

        document.getElementById("lunch").value =
            mealData.lunch || "";

        document.getElementById("dinner").value =
            mealData.dinner || "";

        document.getElementById("snack").value =
            mealData.snack || "";

        document.getElementById("note").value =
            mealData.note || "";

    }else{

        document.getElementById("breakfast").value = "";

        document.getElementById("lunch").value = "";

        document.getElementById("dinner").value = "";

        document.getElementById("snack").value = "";

        document.getElementById("note").value = "";

    }

}
// ===== 花費 =====

let expenses = [];

function loadExpenses(){

    const expenseKey = `expenses-${getDateKey()}`;

    expenses =
        JSON.parse(localStorage.getItem(expenseKey)) || [];

    renderExpenses();

}

const expenseList = document.getElementById("expenseList");

const total = document.getElementById("total");

document.getElementById("addExpense").addEventListener("click", () => {

    const name = document.getElementById("expenseName").value;

    const amount = Number(document.getElementById("expenseAmount").value);

    if(name==="" || amount<=0){

        alert("請輸入品項與金額");

        return;

    }

const category =
    document.getElementById("expenseCategory").value;

expenses.push({
    id: Date.now(),
    category,
    name,
    amount
});

console.log(expenses);


    renderExpenses();

    document.getElementById("expenseName").value="";

    document.getElementById("expenseAmount").value="";

});

function renderExpenses(){

    expenseList.innerHTML="";

    let sum=0;

    expenses.forEach(item=>{

        sum += item.amount;

expenseList.innerHTML += `
<li>

    <span>
        ${item.category} ${item.name}
    </span>

    <span>

        $${item.amount}

        <button onclick="deleteExpense(${item.id})">
            🗑️
        </button>

    </span>

</li>
`;

    });

    total.textContent=sum;
    const expenseKey = `expenses-${getDateKey()}`;

localStorage.setItem(expenseKey, JSON.stringify(expenses));

}

function deleteExpense(id){

    expenses = expenses.filter(item => item.id !== id);

    renderExpenses();

}

updateDate();

loadMeals();

loadExpenses();

console.log(getDateKey());

document.getElementById("nextDay").addEventListener("click", () => {

    currentDate.setDate(currentDate.getDate() + 1);

    updateDate();

    loadMeals();

    loadExpenses();

});

document.getElementById("prevDay").addEventListener("click", () => {

    currentDate.setDate(currentDate.getDate() - 1);

    updateDate();

    loadMeals();

    loadExpenses();

});
