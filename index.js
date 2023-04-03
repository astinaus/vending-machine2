const deposit = document.getElementById("deposit");
const depositBtn = document.getElementById("deposit-btn");
const walletMoney = document.getElementById("wallet");
const pocketMoney = document.getElementById("pocket");
const rechargeBtn = document.getElementById("recharge");
const getCont = document.getElementById("get-container");

let wallet = 50000;
let slot = 0;
let pocket = 0;
let recharge = 0;
let total = 0;
let count = 0;

// 콜라 이름
const itemsList = [
    "Original_Cola",
    "Violet_Cola",
    "Yellow_Cola",
    "Cool_Cola",
    "Green_Cola",
    "Orange_Cola",
];

// 콜라사진
const productImg = new Map([
    ["Original_Cola", "original.svg"],
    ["Violet_Cola", "violet.svg"],
    ["Yellow_Cola", "yellow.svg"],
    ["Cool_Cola", "cool.svg"],
    ["Green_Cola", "green.svg"],
    ["Orange_Cola", "orange.svg"],
]);

// 콜라재고
const productStock = new Map([
    ["Original_Cola", 20],
    ["Violet_Cola", 0],
    ["Yellow_Cola", 15],
    ["Cool_Cola", 20],
    ["Green_Cola", 10],
    ["Orange_Cola", 10],
]);

// 콜라 버튼 리스트 생성 함수
function createProducts() {
    const list = document.getElementById("item-list");

    itemsList.forEach((item) => {
        const items = document.createElement("li");
        const itemBtn = document.createElement("button");
        const itemImg = document.createElement("img");
        const itemName = document.createElement("p");
        const itemPrice = document.createElement("span");
        itemName.textContent = item;
        itemPrice.textContent = 1000 + "원";
        itemImg.setAttribute("src", "./img/" + productImg.get(item));
        itemPrice.setAttribute("class", "price");
        itemBtn.setAttribute("class", "item-btn product");
        itemBtn.appendChild(itemImg);
        itemBtn.appendChild(itemName);
        itemBtn.appendChild(itemPrice);
        if (productStock.get(item) === 0) {
            const soldOut = document.createElement("span");
            soldOut.setAttribute("class", "sold-out");
            itemBtn.setAttribute("disabled", "");
            itemBtn.appendChild(soldOut);
        }
        items.appendChild(itemBtn);
        list.appendChild(items);
    });
}
// 총금액 작성 함수
function totalPrice() {
    const totalValue = document.createElement("h3");
    totalValue.textContent = `총금액 : ${total} 원`;
    totalValue.setAttribute("id", "total-price");
    getCont.appendChild(totalValue);
}

createProducts();
totalPrice();

// 1000원 단위로 콤마(,)를 붙여주는 함수
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

walletMoney.insertAdjacentHTML(
    "beforeend",
    `<span id="wallet-value">${numberWithCommas(wallet)} 원</span>`
);
pocketMoney.insertAdjacentHTML(
    "beforeend",
    `<span id="pocket-value">${numberWithCommas(slot)} 원</span>`
);

// 입금버튼 클릭시 이벤트
depositBtn.addEventListener("click", () => {
    if (!deposit.value) {
        console.log("입금액 입력");
        alert("입금액을 입력해주세요!");
        return false;
    } else {
        slot += parseInt(deposit.value);
        pocket += slot;
        depositMoney();
        walletDeduction();
        deposit.value = null;
        slot = 0;
    }
});

// 거스름돈 반환버튼 클릭시 이벤트
rechargeBtn.addEventListener("click", () => {
    rechargeMoney();
});

// 입금 함수
function depositMoney() {
    if (slot > wallet) {
        alert("소지금이 부족합니다!");
        pocket -= slot;
    } else if (slot < 1000) {
        alert("입금은 1,000원부터 가능합니다!");
        pocket -= slot;
    } else if (slot >= 1000) {
        let pocketValue = document.getElementById("pocket-value");
        pocketValue.textContent = `${numberWithCommas(pocket)} 원`;
        alert("입금되었습니다!");
    }
}

// 소지금 차감 함수
function walletDeduction() {
    let walletValue = document.getElementById("wallet-value");
    if (wallet > 0 && !(slot < 1000)) {
        if (slot > wallet) {
            wallet = wallet;
        } else {
            wallet -= slot;
            walletValue.textContent = `${numberWithCommas(wallet)} 원`;
        }
    } else if (wallet < 0) {
        wallet += slot;
        walletValue.textContent = `${numberWithCommas(wallet)} 원`;
    }
}

// 거스름돈 반환 함수
function rechargeMoney() {
    if (pocket === 0) {
        alert("잔액이 없습니다!");
    } else {
        recharge += pocket;
        pocket -= recharge;
        wallet += recharge;
        let pocketValue = document.getElementById("pocket-value");
        pocketValue.textContent = `${numberWithCommas(pocket)} 원`;
        let walletValue = document.getElementById("wallet-value");
        walletValue.textContent = `${numberWithCommas(wallet)} 원`;
        alert("거스름돈이 반환되었습니다!");
        recharge = 0;
    }
}
