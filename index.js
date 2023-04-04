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
let price = 0;

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

// 고른 콜라 개수
const productCount = new Map([
    ["Original_Cola", 0],
    ["Violet_Cola", 0],
    ["Yellow_Cola", 0],
    ["Cool_Cola", 0],
    ["Green_Cola", 0],
    ["Orange_Cola", 0],
]);

// 획득한 콜라 개수
const productGetCount = new Map([
    ["Original_Cola", 0],
    ["Violet_Cola", 0],
    ["Yellow_Cola", 0],
    ["Cool_Cola", 0],
    ["Green_Cola", 0],
    ["Orange_Cola", 0],
]);

// 소지금, 잔액 초기값 작성
walletMoney.insertAdjacentHTML(
    "beforeend",
    `<span id="wallet-value">${numberWithCommas(wallet)} 원</span>`
);
pocketMoney.insertAdjacentHTML(
    "beforeend",
    `<span id="pocket-value">${numberWithCommas(slot)} 원</span>`
);

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
        itemImg.setAttribute("alt", `${item.replace("_", " ")}`);
        itemPrice.setAttribute("class", "price");
        itemBtn.setAttribute("class", "item-btn product");
        itemBtn.setAttribute("id", `${item}`);
        itemBtn.setAttribute("type", "button");
        itemBtn.setAttribute("onclick", `shoppingProduct("${item}");`);
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
    itemsList.forEach((item) => {
        total = total + productGetCount.get(item) * 1000;
    });
    const totalValue = document.getElementById("total-price");
    totalValue.textContent = `총 금액 : ${numberWithCommas(total)} 원`;
    total = 0;
}

// 콜라 버튼 클릭시 리스트에 추가하는 함수
function shoppingProduct(item) {
    const bucket = document.getElementById("shopping-bucket");
    if (productStock.get(item) !== 0) {
        if (productCount.get(item) === 0) {
            productCount.set(item, 1);

            const itemBtn = document.createElement("button");
            const itemImg = document.createElement("img");
            const itemName = document.createElement("span");
            const itemCount = document.createElement("span");

            itemImg.setAttribute("src", "./img/" + productImg.get(item));
            itemImg.setAttribute("alt", `${item.replace("_", " ")}`);
            itemName.textContent = item;
            itemCount.textContent = productCount.get(item);
            itemCount.setAttribute("class", "get-count");
            itemBtn.setAttribute("type", "button");
            itemBtn.setAttribute("class", "item-btn get");
            itemBtn.setAttribute("id", `"${item}_bucket"`);
            itemBtn.setAttribute("onclick", `returnProduct("${item}");`);
            itemBtn.appendChild(itemImg);
            itemBtn.appendChild(itemName);
            itemBtn.appendChild(itemCount);
            bucket.appendChild(itemBtn);
        } else if (productCount.get(item) !== 0) {
            productCount.set(item, productCount.get(item) + 1);
            const itemBtn = document.getElementById(`"${item}_bucket"`);
            const itemCount = itemBtn.lastChild;
            itemCount.textContent = productCount.get(item);
        }
        price = price + 1000;
        productStock.set(item, productStock.get(item) - 1);
    } else if (productStock.get(item) === 0) {
        // 재고 없으면 품절버튼으로 바뀜.
        alert("재고가 없습니다!");
        const itemBtn = document.getElementById(item);
        itemBtn.setAttribute("disabled", "");
        itemBtn.insertAdjacentHTML(
            "beforeend",
            '<span class="sold-out"></span>'
        );
    }
}

// 획득 버튼 클릭시 쇼핑카트의 콜라 구매
// 획득한 음료 창으로 넘어감.
function getProduct() {
    const bucket = document.getElementById("shopping-bucket");
    if (bucket.children.length === 0) {
        // 장바구니가 비어있음을 알림
        alert("콜라를 선택해주세요!");
    } else if (bucket.children.length !== 0) {
        if (pocket === 0 || pocket - price < 0) {
            // 잔액이 없으면 구매가 안됨
            alert("잔액이 부족합니다!");
        } else if (pocket !== 0) {
            // 구매하면 bucket을 비워야함
            bucket.textContent = "";

            // 획득한 음료 박스에 음료가 추가됨.
            const getBox = document.getElementById("get-box");
            itemsList.forEach((item) => {
                if (
                    productCount.get(item) !== 0 &&
                    productGetCount.get(item) === 0
                ) {
                    const itemBtn = document.createElement("button");
                    const itemImg = document.createElement("img");
                    const itemName = document.createElement("span");
                    const itemCount = document.createElement("span");
                    itemImg.setAttribute(
                        "src",
                        "./img/" + productImg.get(item)
                    );
                    itemImg.setAttribute("alt", `${item.replace("_", " ")}`);
                    itemName.textContent = item;
                    itemCount.textContent = productCount.get(item);
                    itemCount.setAttribute("class", "get-count");
                    itemBtn.setAttribute("type", "button");
                    itemBtn.setAttribute("class", "item-btn get");
                    itemBtn.setAttribute("id", `${item}_get`);
                    itemBtn.appendChild(itemImg);
                    itemBtn.appendChild(itemName);
                    itemBtn.appendChild(itemCount);
                    getBox.appendChild(itemBtn);
                    productGetCount.set(item, productCount.get(item));
                    productCount.set(item, 0);
                } else if (productGetCount.get(item) !== 0) {
                    productGetCount.set(
                        item,
                        productGetCount.get(item) + productCount.get(item)
                    );
                    productCount.set(item, 0);
                    console.log(productGetCount.get(item));
                    const itemBtn = document.getElementById(`${item}_get`);
                    console.log(itemBtn.lastChild);
                    itemBtn.lastChild.textContent = productGetCount.get(item);
                }
            });
            alert("콜라가 구매되었습니다!");
            pocket = pocket - price;
            price = 0;
            const pocketValue = document.getElementById("pocket-value");
            pocketValue.textContent = `${numberWithCommas(pocket)} 원`;
            totalPrice();
        }
    }
}

// 목록에 있는 콜라를 누르면 갯수를 빼는 함수
function returnProduct(item) {
    const itemBtn = document.getElementById(`"${item}_bucket"`);
    const itemStock = document.getElementById(`${item}`);
    productCount.set(item, productCount.get(item) - 1);
    productStock.set(item, productStock.get(item) + 1);
    price = price - 1000;
    if (productCount.get(item) !== 0) {
        itemBtn.lastChild.textContent = productCount.get(item);
    } else if (productCount.get(item) === 0) {
        itemBtn.remove();
    }
    if (productStock.get(item) === 1) {
        itemStock.removeChild(itemStock.lastChild);
        itemStock.removeAttribute("disabled");
    }
}

createProducts();
totalPrice();

// 1000원 단위로 콤마(,)를 붙여주는 함수
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
        const pocketValue = document.getElementById("pocket-value");
        pocketValue.textContent = `${numberWithCommas(pocket)} 원`;
        const walletValue = document.getElementById("wallet-value");
        walletValue.textContent = `${numberWithCommas(wallet)} 원`;
        alert("거스름돈이 반환되었습니다!");
        recharge = 0;
    }
}
