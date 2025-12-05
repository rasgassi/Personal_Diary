const analyzeBtn = document.getElementById("analyzeBtn");
const textInput = document.getElementById("textInput");
const resultDiv = document.getElementById("result");
const historyList = document.getElementById("history");

analyzeBtn.addEventListener("click", async () => {
  const text = textInput.value.trim();
  if (!text) {
    resultDiv.textContent = "Введите текст!";
    return;
  }

  resultDiv.textContent = "⏳ Анализируем...";
  try {
    const res = await fetch("http://localhost:3000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();

    if (res.ok) {
      resultDiv.textContent = `🪄 Настроение: ${data.data.mood}`;
      textInput.value = "";
      loadHistory();
    } else {
      resultDiv.textContent = "Ошибка: " + data.error;
    }
  } catch (err) {
    console.error(err);
    resultDiv.textContent = "Ошибка соединения с сервером";
  }
});

async function loadHistory() {
  try {
    const res = await fetch("http://localhost:3000/history");
    const data = await res.json();

    historyList.innerHTML = "";
    if (data.history && data.history.length > 0) {
      data.history.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `[${item.date}] ${item.message} — ${item.mood}`;
        historyList.appendChild(li);
      });
    }
  } catch (err) {
    console.error(err);
    historyList.innerHTML = "<li>Не удалось загрузить историю</li>";
  }
}

loadHistory();
