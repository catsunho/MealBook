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
