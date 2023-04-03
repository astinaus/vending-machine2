const deposit = document.getElementById("deposit");
const depositBtn = document.getElementById("deposit-btn");
const walletMoney = document.getElementById("wallet");
const pocketMoney = document.getElementById("pocket");
const rechargeBtn = document.getElementById("recharge");

let wallet = 50000;
let slot = 0;
let pocket = 0;
let recharge = 0;
let totalPrice = 0;

// 1000원 단위로 콤마(,)를 붙여주는 함수
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

window.onload = function () {
    walletMoney.insertAdjacentHTML(
        "beforeend",
        `<span id="wallet-value">${numberWithCommas(wallet)} 원</span>`
    );
    pocketMoney.insertAdjacentHTML(
        "beforeend",
        `<span id="pocket-value">${numberWithCommas(slot)} 원</span>`
    );
};

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
