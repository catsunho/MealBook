// 取得今天日期
const today = new Date();

const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long"
};

const todayText = today.toLocaleDateString("zh-TW", options);

// 顯示日期
document.getElementById("today").textContent = todayText;
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

    localStorage.setItem("mealbook", JSON.stringify(mealData));

    alert("✅ 今天的餐點已儲存！");
});


// ===== 讀取資料 =====

const savedData = localStorage.getItem("mealbook");

if(savedData){

    const mealData = JSON.parse(savedData);

    document.getElementById("breakfast").value = mealData.breakfast || "";

    document.getElementById("lunch").value = mealData.lunch || "";

    document.getElementById("dinner").value = mealData.dinner || "";

    document.getElementById("snack").value = mealData.snack || "";

    document.getElementById("note").value = mealData.note || "";

}
// ===== 花費 =====

let expenses =
    JSON.parse(localStorage.getItem("expenses")) || [];

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
    <span>${item.category} ${item.name}</span>
    <span>$${item.amount}</span>
</li>
`;

    });

    total.textContent=sum;
    localStorage.setItem("expenses", JSON.stringify(expenses));

}
renderExpenses();
