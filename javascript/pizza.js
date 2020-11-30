const addedToppingsId = document.getElementById("addedToppings");
const addedToppingsTwoId = document.getElementById("addedToppings2");
const totalPriceId = document.getElementById("totalPrice");
const pizzaToppingDisplayId = document.getElementById("pizzaToppingDisplay");
const sizeBtnClass = document.getElementsByClassName("sizeBtn");
const orderSizeId = document.getElementById("orderSize");
const pepperoniClass = document.querySelectorAll(".pepperoni");
const chickenClass = document.querySelectorAll(".chicken");
const pineappleClass = document.querySelectorAll(".pineapple");
const beefClass = document.querySelectorAll(".beef");
const greenPeppersClass = document.querySelectorAll(".greenpeppers");
const jalapenosClass = document.querySelectorAll(".jalapenos");
const sausageClass = document.querySelectorAll(".sausage");
const steakClass = document.querySelectorAll(".steak");
const tomatoesClass = document.querySelectorAll(".tomatoes");
const cornClass = document.querySelectorAll(".corn");
const bodyId = document.getElementById("body");
const prePepId = document.getElementById("prePep");
const preMeatId = document.getElementById("preMeat");
const preVeggieId = document.getElementById("preVeggie");
const preSupremeId = document.getElementById("preSupreme");
const preAllOutId = document.getElementById("preAll");
const doubleClass = document.getElementsByClassName("double");
const extraClass = document.getElementsByClassName("extra");
const thankYouIdTwo = document.getElementById("thank-you-message2");
const closeBtnClass = document.getElementsByClassName("closeButton");

// Pizza Object
let pizza = {
  size: "small",

  leftToppings: [],

  rightToppings: [],

  fullToppings: [],

  allToppings: [],

  price: 5,
};

// Size/Price - Changes Pizza size/price per radio click

sizeBtnClass[0].addEventListener("click", () => {
  size(0, 6, 10);
  pizza.price = 5;
});

sizeBtnClass[1].addEventListener("click", () => {
  size(1, 5, 12);
  pizza.price = 6;
});

sizeBtnClass[2].addEventListener("click", () => {
  size(2, 4, 14);
  pizza.price = 7;
});

sizeBtnClass[3].addEventListener("click", () => {
  size(3, 3, 16);
  pizza.price = 8;
});

function size(btnNum, textSize, inches) {
  if (sizeBtnClass[btnNum].checked) {
    pizza.size = sizeBtnClass[btnNum].classList[1];
    console.log(pizza.size);
    if (pizza.size === "extraLarge") {
      orderSizeId.innerHTML = `<h${textSize}>${inches}" Extra Large Pizza<h${textSize}>`;
    } else {
      orderSizeId.innerHTML = `<h${textSize}>${inches}" ${pizza.size} Pizza<h${textSize}>`;
    }
  }
}

//Toppings

function toppings(
  toppingsClass,
  specificSide,
  imgSide,
  pizzaObject,
  double,
  extra
) {
  toppingsClass.forEach((item) => {
    item.addEventListener("click", () => {
      const i = pizzaObject.indexOf(item.classList[0]);
      if (i > -1) {
        pizzaObject.splice(i, 1);
      }
      if (
        item.classList[1] === `${specificSide}` &&
        item.classList[3] !== "active"
      ) {
        defaultButtonSides(toppingsClass);
        item.classList.add("active");
        item.src = `images/${imgSide}active.png`;

        pizzaObject.push(item.classList[0]);
        pizza.allToppings.push(item.classList[0]);
        dblExEnable(double, extra);
      } else if (
        item.classList[1] === `${specificSide}` &&
        item.classList[3] === "active"
      ) {
        defaultButtonSides(toppingsClass);
        const index = pizzaObject.indexOf(item.classList[0]);
        const allIndex = pizza.allToppings.indexOf(item.classList[0]);
        if (index > -1) {
          pizzaObject.splice(index, 1);
        }
        if (allIndex > -1) {
          pizza.allToppings.splice(allIndex, 1);
        }
        filterExtra(pizza.allToppings);
        filterExtra(pizzaObject);
        dblExDisable(double, extra);
      }
    });
  });
}

function filterExtra(pizzaObject) {
  let finalToppings = pizzaObject.filter((extra, index) => {
    return pizzaObject.indexOf(extra) === index;
  });
}

function filterAllToppings() {
  let allTops = [];
  pizza.allToppings.forEach((item) => {
    if (!allTops.includes(item)) {
      allTops.push(item);
    }
  });
  pizza.allToppings = allTops;
}

function defaultButtonSides(toppingsClass) {
  toppingsClass.forEach((item) => {
    item.classList.remove("active");
  });
  toppingsClass[0].src = "images/leftcircle.png";
  toppingsClass[1].src = "images/fullcircle.png";
  toppingsClass[2].src = "images/rightcircle.png";
}

function displayToppings() {
  let toppingList = "<li>cheese</li>";
  pizza.allToppings.forEach((item, index) => {
    if (index % 2 == 1) {
      toppingList += `<li>${item}</li>`;
    }
  });
  return toppingList;
}
function displayToppingsTwo() {
  let secondToppingList = "";
  pizza.allToppings.forEach((item, index) => {
    if (index % 2 == 0) {
      secondToppingList += `<li>${item}</li>`;
    }
  });
  return secondToppingList;
}

function updatePizzaDisplay() {
  let imgs = "";
  pizza.fullToppings.forEach((item) => {
    imgs += `<img src="full-topping-imgs/${item}.png" class="img-fluid toppings" alt="">`;
  });
  pizza.leftToppings.forEach((item) => {
    imgs += `<img src="left-topping-imgs/${item}.png" class="img-fluid toppings" alt="">`;
  });
  pizza.rightToppings.forEach((item) => {
    imgs += `<img src="right-topping-imgs/${item}.png" class="img-fluid toppings" alt="">`;
  });
  console.log(imgs);
  return imgs;
}

function start() {
  toppings(
    pepperoniClass,
    "left",
    "left",
    pizza.leftToppings,
    doubleClass[0],
    extraClass[0]
  );
  toppings(
    pepperoniClass,
    "mid",
    "full",
    pizza.fullToppings,
    doubleClass[0],
    extraClass[0]
  );
  toppings(
    pepperoniClass,
    "right",
    "right",
    pizza.rightToppings,
    doubleClass[0],
    extraClass[0]
  );

  toppings(
    chickenClass,
    "left",
    "left",
    pizza.leftToppings,
    doubleClass[1],
    extraClass[1]
  );
  toppings(
    chickenClass,
    "mid",
    "full",
    pizza.fullToppings,
    doubleClass[1],
    extraClass[1]
  );
  toppings(
    chickenClass,
    "right",
    "right",
    pizza.rightToppings,
    doubleClass[1],
    extraClass[1]
  );

  toppings(
    beefClass,
    "left",
    "left",
    pizza.leftToppings,
    doubleClass[2],
    extraClass[2]
  );
  toppings(
    beefClass,
    "mid",
    "full",
    pizza.fullToppings,
    doubleClass[2],
    extraClass[2]
  );
  toppings(
    beefClass,
    "right",
    "right",
    pizza.rightToppings,
    doubleClass[2],
    extraClass[2]
  );

  toppings(
    sausageClass,
    "left",
    "left",
    pizza.leftToppings,
    doubleClass[3],
    extraClass[3]
  );
  toppings(
    sausageClass,
    "mid",
    "full",
    pizza.fullToppings,
    doubleClass[3],
    extraClass[3]
  );
  toppings(
    sausageClass,
    "right",
    "right",
    pizza.rightToppings,
    doubleClass[3],
    extraClass[3]
  );

  toppings(
    steakClass,
    "left",
    "left",
    pizza.leftToppings,
    doubleClass[4],
    extraClass[4]
  );
  toppings(
    steakClass,
    "mid",
    "full",
    pizza.fullToppings,
    doubleClass[4],
    extraClass[4]
  );
  toppings(
    steakClass,
    "right",
    "right",
    pizza.rightToppings,
    doubleClass[4],
    extraClass[4]
  );

  toppings(
    greenPeppersClass,
    "left",
    "left",
    pizza.leftToppings,
    doubleClass[5],
    extraClass[5]
  );
  toppings(
    greenPeppersClass,
    "mid",
    "full",
    pizza.fullToppings,
    doubleClass[5],
    extraClass[5]
  );
  toppings(
    greenPeppersClass,
    "right",
    "right",
    pizza.rightToppings,
    doubleClass[5],
    extraClass[5]
  );

  toppings(
    cornClass,
    "left",
    "left",
    pizza.leftToppings,
    doubleClass[6],
    extraClass[6]
  );
  toppings(
    cornClass,
    "mid",
    "full",
    pizza.fullToppings,
    doubleClass[6],
    extraClass[6]
  );
  toppings(
    cornClass,
    "right",
    "right",
    pizza.rightToppings,
    doubleClass[6],
    extraClass[6]
  );

  toppings(
    jalapenosClass,
    "left",
    "left",
    pizza.leftToppings,
    doubleClass[7],
    extraClass[7]
  );
  toppings(
    jalapenosClass,
    "mid",
    "full",
    pizza.fullToppings,
    doubleClass[7],
    extraClass[7]
  );
  toppings(
    jalapenosClass,
    "right",
    "right",
    pizza.rightToppings,
    doubleClass[7],
    extraClass[7]
  );

  toppings(
    tomatoesClass,
    "left",
    "left",
    pizza.leftToppings,
    doubleClass[8],
    extraClass[8]
  );
  toppings(
    tomatoesClass,
    "mid",
    "full",
    pizza.fullToppings,
    doubleClass[8],
    extraClass[8]
  );
  toppings(
    tomatoesClass,
    "right",
    "right",
    pizza.rightToppings,
    doubleClass[8],
    extraClass[8]
  );

  toppings(
    pineappleClass,
    "left",
    "left",
    pizza.leftToppings,
    doubleClass[9],
    extraClass[9]
  );
  toppings(
    pineappleClass,
    "mid",
    "full",
    pizza.fullToppings,
    doubleClass[9],
    extraClass[9]
  );
  toppings(
    pineappleClass,
    "right",
    "right",
    pizza.rightToppings,
    doubleClass[9],
    extraClass[9]
  );
}

//Pre-built Pizzas

prePepId.addEventListener("click", () => {
  preBuiltPizza(pepperoniClass[1]);
  dblExEnable(doubleClass[0], extraClass[0]);
});

preMeatId.addEventListener("click", () => {
  preBuiltPizza(sausageClass[1]);
  preBuiltPizza(chickenClass[1]);
  preBuiltPizza(pepperoniClass[1]);
  preBuiltPizza(steakClass[1]);
  preBuiltPizza(beefClass[1]);
  dblExEnable(doubleClass[0], extraClass[0]);
  dblExEnable(doubleClass[1], extraClass[1]);
  dblExEnable(doubleClass[2], extraClass[2]);
  dblExEnable(doubleClass[3], extraClass[3]);
  dblExEnable(doubleClass[4], extraClass[4]);
});

preVeggieId.addEventListener("click", () => {
  preBuiltPizza(tomatoesClass[1]);
  preBuiltPizza(greenPeppersClass[1]);
  preBuiltPizza(cornClass[1]);
  dblExEnable(doubleClass[5], extraClass[5]);
  dblExEnable(doubleClass[6], extraClass[6]);
  dblExEnable(doubleClass[8], extraClass[8]);
});

preSupremeId.addEventListener("click", () => {
  preBuiltPizza(pepperoniClass[1]);
  preBuiltPizza(tomatoesClass[1]);
  preBuiltPizza(greenPeppersClass[1]);
  preBuiltPizza(beefClass[1]);
  dblExEnable(doubleClass[5], extraClass[5]);
  dblExEnable(doubleClass[0], extraClass[0]);
  dblExEnable(doubleClass[8], extraClass[8]);
  dblExEnable(doubleClass[2], extraClass[2]);
});

preAllOutId.addEventListener("click", () => {
  preBuiltPizza(pepperoniClass[1]);
  preBuiltPizza(sausageClass[1]);
  preBuiltPizza(tomatoesClass[1]);
  preBuiltPizza(jalapenosClass[1]);
  preBuiltPizza(chickenClass[1]);
  preBuiltPizza(pineappleClass[1]);
  preBuiltPizza(beefClass[1]);
  preBuiltPizza(greenPeppersClass[1]);
  preBuiltPizza(steakClass[1]);
  preBuiltPizza(cornClass[1]);
  dblExEnable(doubleClass[0], extraClass[0]);
  dblExEnable(doubleClass[1], extraClass[1]);
  dblExEnable(doubleClass[2], extraClass[2]);
  dblExEnable(doubleClass[3], extraClass[3]);
  dblExEnable(doubleClass[4], extraClass[4]);
  dblExEnable(doubleClass[5], extraClass[5]);
  dblExEnable(doubleClass[6], extraClass[6]);
  dblExEnable(doubleClass[7], extraClass[7]);
  dblExEnable(doubleClass[8], extraClass[8]);
  dblExEnable(doubleClass[9], extraClass[9]);
});

function preBuiltPizza(firstTopping) {
  firstTopping.classList.add("active");
  pizza.fullToppings.push(firstTopping.classList[0]);
  pizza.allToppings.push(firstTopping.classList[0]);
  firstTopping.src = `images/fullactive.png`;
}

//Updates Price On Bottom Left

function priceOfToppings(toppingPrice, totalToppings) {
  toppingPrice += totalToppings;

  if (totalToppings > 0) {
    toppingPrice -= 1;
  }
  if (totalToppings > 4) {
    toppingPrice -= 1;
    totalPriceId.innerHTML =
      "<b>SPECIAL DEAL!</b><br>Total: $" + toppingPrice + ".00";
  } else {
    totalPriceId.innerHTML = "Total: $" + toppingPrice + ".00";
  }
  thankYouIdTwo.innerHTML = "<h4>Your Total is $" + toppingPrice + ".00</h4>";
}

//Extra/Double
function dblExEnable(toppingDbl, toppingExtra) {
  toppingDbl.removeAttribute("disabled");
  toppingExtra.removeAttribute("disabled");

  toppingDbl.addEventListener("click", () => {
    if (toppingDbl.checked) {
      toppingExtra.checked = false;
    }
  });

  toppingExtra.addEventListener("click", () => {
    if (toppingExtra.checked) {
      toppingDbl.checked = false;
    }
  });
}

function dblExDisable(toppingDbl, toppingExtra) {
  toppingDbl.setAttribute("disabled", "disabled");
  toppingExtra.setAttribute("disabled", "disabled");
  toppingDbl.setAttribute("checked", "checked");
  toppingExtra.setAttribute("checked", "checked");
  toppingDbl.checked = false;
  toppingExtra.checked = false;
}

function doubleExtraPrice(double, extra) {
  let total = 0;
  for (item of double) {
    if (item.checked) {
      total += 1;
    }
  }
  for (item of extra) {
    if (item.checked) {
      total += 1;
    }
  }
  return total;
}

dblExDisable(doubleClass[0], extraClass[0]);
dblExDisable(doubleClass[1], extraClass[1]);
dblExDisable(doubleClass[2], extraClass[2]);
dblExDisable(doubleClass[3], extraClass[3]);
dblExDisable(doubleClass[4], extraClass[4]);
dblExDisable(doubleClass[5], extraClass[5]);
dblExDisable(doubleClass[6], extraClass[6]);
dblExDisable(doubleClass[7], extraClass[7]);
dblExDisable(doubleClass[8], extraClass[8]);
dblExDisable(doubleClass[9], extraClass[9]);

//BodyClicker - Updates Pizza and Displays

bodyId.addEventListener("click", () => {
  filterAllToppings();
  addedToppingsId.innerHTML = displayToppings();
  addedToppingsTwoId.innerHTML = displayToppingsTwo();
  pizzaToppingDisplayId.innerHTML = updatePizzaDisplay();
  priceOfToppings(
    pizza.price,
    pizza.allToppings.length + doubleExtraPrice(doubleClass, extraClass)
  );
  doubleExtraPrice(doubleClass, extraClass);

  console.log(pizza.leftToppings);
  console.log(pizza.fullToppings);
  console.log(pizza.rightToppings);
});

//Display Thank You
const thankYouId = document.getElementById("thank-you-message");
let today = new Date();
let hours = today.getHours();
let minutes = today.getMinutes() + 30;
let am = "AM";
let time = `${hours}:${minutes} ${am}`;

function displayThankYou() {
  console.log(minutes);
  if (minutes > 59) {
    updateTime();
  }
  if (hours > 11) {
    updateMilitaryTime();
  }
  if (hours > 12) {
    updateMilitaryTimePt2();
  }
  console.log(minutes);
  thankYouId.innerHTML = `<h6>Your order will be available for pick up at:<br>
      ${time}</h6> `;
}

function updateTime() {
  minutes = minutes - 60;
  hours = hours + 1;
  if (minutes < 10) {
    time = `${hours}:0${minutes} ${am}`;
  } else {
    time = `${hours}:${minutes} ${am}`;
  }
}

function updateMilitaryTime() {
  am = "PM";
  if (minutes < 10) {
    time = `${hours}:0${minutes} ${am}`;
  } else {
    time = `${hours}:${minutes} ${am}`;
  }
}

function updateMilitaryTimePt2() {
  hours = hours - 12;
  if (minutes < 10) {
    time = `${hours}:0${minutes} ${am}`;
  } else {
    time = `${hours}:${minutes} ${am}`;
  }
}

displayThankYou();

//Submit/Close - Resets all of pizza
closeBtnClass[0].addEventListener("click", () => {
  fullReset();
});

closeBtnClass[1].addEventListener("click", () => {
  fullReset();
});

closeBtnClass[2].addEventListener("click", () => {
  fullReset();
});

function fullReset() {
  defaultButtonSides(pepperoniClass);
  defaultButtonSides(chickenClass);
  defaultButtonSides(beefClass);
  defaultButtonSides(sausageClass);
  defaultButtonSides(steakClass);
  defaultButtonSides(greenPeppersClass);
  defaultButtonSides(cornClass);
  defaultButtonSides(jalapenosClass);
  defaultButtonSides(tomatoesClass);
  defaultButtonSides(pineappleClass);
  sizeBtnClass[0].checked = true;
  orderSizeId.innerHTML = `<h6>10" Small Pizza<h6>`;
  pizza.size = "small";
  pizza.price = 5;
  pizza.leftToppings.splice(0, pizza.leftToppings.length);
  pizza.fullToppings.splice(0, pizza.fullToppings.length);
  pizza.rightToppings.splice(0, pizza.rightToppings.length);
  pizza.allToppings.splice(0, pizza.allToppings.length);
  dblExDisable(doubleClass[0], extraClass[0]);
  dblExDisable(doubleClass[1], extraClass[1]);
  dblExDisable(doubleClass[2], extraClass[2]);
  dblExDisable(doubleClass[3], extraClass[3]);
  dblExDisable(doubleClass[4], extraClass[4]);
  dblExDisable(doubleClass[5], extraClass[5]);
  dblExDisable(doubleClass[6], extraClass[6]);
  dblExDisable(doubleClass[7], extraClass[7]);
  dblExDisable(doubleClass[8], extraClass[8]);
  dblExDisable(doubleClass[9], extraClass[9]);
}

start();
