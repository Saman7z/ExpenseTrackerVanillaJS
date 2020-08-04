const checkHistorySection = () => {
  if (document.querySelector(".history-item-container").hasChildNodes()) {
    document.querySelector(".history-container").style.display = "block";
  } else {
    document.querySelector(".history-container").style.display = "none";
  }
};
const showItems = (data) => {
  let totalBalance = document.getElementById("balance-amount");
  let totalIncome = document.getElementById("plus-income-amount");
  let totalExpense = document.getElementById("negative-amount");
  let historyItems = document.querySelector(".history-item-container");

  totalBalance.innerText =
    "$" + data.reduce((acc, item) => acc + Number(item.amount), 0);
  let totalIncomeData = 0;
  let totalExpenseData = 0;
  data.map((item) => {
    if (Number(item.amount) > 0) {
      totalIncomeData += Number(item.amount);
    } else {
      totalExpenseData += Number(item.amount);
    }
  });
  totalIncome.innerText = "$" + totalIncomeData;
  totalExpense.innerText = "$" + totalExpenseData;
  historyItems.innerHTML = data
    .map(
      (item) =>
        `${
          Number(item.amount) > 0
            ? `<div id="item-history-plus" data-id=${item.id}>
  <h3>${item.title}</h3>
  <div id="plus-item">${item.amount}</div>
  <div class="x-mark" onclick="deleteSelectedItem(${item.id})">&times;</div>
</div>`
            : `<div id="item-history-negative" data-id=${item.id} >
  <h3>${item.title}</h3>
  <div id="negative-item">${item.amount}</div>
  <div class="x-mark" onclick="deleteSelectedItem(${item.id})">&times;</div>
</div>`
        }`
    )
    .join("");
};
const generateID = () => {
  let num = Math.floor(Math.random() * 1000);
  return num;
};
const getData = (loading = false) => {
  let data = JSON.parse(localStorage.getItem("item"));
  if (data != null) {
    showItems(data);
    checkHistorySection();
  }
  return data;
};
const saveData = (data) => {
  let stringifiedData = JSON.stringify(data);
  localStorage.setItem("item", stringifiedData);
  getData();
};
const addBtnClicked = () => {
  let title = document.getElementById("title").value;
  let amount = document.getElementById("amount").value;
  let data = getData();
  let newId = generateID();
  //console.log(data)
  if (title.trim() == "" || amount.trim() == "") {
    document.querySelector(".error-msg-container").style.display = " block";
    document.querySelector(".error-msg").innerText = "Please put Something in Expenditure Title and Amout Box below";
    setTimeout(()=> document.querySelector(".error-msg-container").style.display = " none", 4000)
  } else {
    if (data != null) {
      let newData = [...data, { id: newId, title: title, amount: amount }];
      data = newData;
      // console.log(data)
      saveData(data);
      checkHistorySection();
    } else {
      // set data for the first Time
      //console.log("set data for the first Time");
      data = [
        {
          id: newId,
          title: title,
          amount: amount,
        },
      ];
      //console.log(data);
      saveData(data);
      checkHistorySection();
    }
  }
};
const deleteSelectedItem = (id) => {
  //
  //let elementID = e.target.parentElement.getAttribute("data-id");
  let data = JSON.parse(localStorage.getItem("item"));
  if (id != undefined) {
    let newData = data.filter((x) => x.id != id);
    console.log("asli " + data);
    console.log("filter " + newData);
    saveData(newData);
    checkHistorySection();
  } else {
    // It 's not possible to come here or it shouldn't BE :)
  }
};
const closeErrorBox = () => {
  document.querySelector(".error-msg-container").style.display = "none";
}
document.querySelector(".error-box-close").addEventListener("click", closeErrorBox)
document.getElementById("add-btn").addEventListener("click", addBtnClicked);
window.addEventListener("load", getData());
// try {
//     document.querySelectorAll(".x-mark").addEventListener("click", deleteSelectedItem);
// } catch (error) {
//   console.log(error)
// }
