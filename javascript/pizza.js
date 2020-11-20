//pizza object
const addedToppingsId = document.getElementById("addedToppings");
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

// Pizza Object
let pizza = {
  size: "small",

  leftToppings: [],

  rightToppings: [],

  fullToppings: [],

  allToppings: [],

  price: 5,
};

// Size - Changes Pizza value per radio click

sizeBtnClass[0].addEventListener("click", () => {
  size(0, 6);
});

sizeBtnClass[1].addEventListener("click", () => {
  size(1, 5);
});

sizeBtnClass[2].addEventListener("click", () => {
  size(2, 4);
});

sizeBtnClass[3].addEventListener("click", () => {
  size(3, 3);
});

function size(btnNum, textSize) {
  if (sizeBtnClass[btnNum].checked) {
    pizza.size = sizeBtnClass[btnNum].classList[1];
    console.log(pizza.size);
    if (pizza.size === "extraLarge") {
      orderSizeId.innerHTML = `<h${textSize}>Extra Large Pizza<h${textSize}>`;
    } else {
      orderSizeId.innerHTML = `<h${textSize}>${pizza.size} Pizza<h${textSize}>`;
    }
  }
}

//Toppings

function toppings(toppingsClass, specificSide, imgSide, pizzaObject) {
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
      }
      pizzaToppingDisplayId.innerHTML = updatePizzaDisplay();
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
  let toppingList = "";
  pizza.allToppings.forEach((item) => {
    toppingList += `<li>${item}</li>`;
  });
  return toppingList;
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
  return imgs;
}

toppings(pepperoniClass, "left", "left", pizza.leftToppings);
toppings(pepperoniClass, "mid", "full", pizza.fullToppings);
toppings(pepperoniClass, "right", "right", pizza.rightToppings);

toppings(chickenClass, "left", "left", pizza.leftToppings);
toppings(chickenClass, "mid", "full", pizza.fullToppings);
toppings(chickenClass, "right", "right", pizza.rightToppings);

toppings(pineappleClass, "left", "left", pizza.leftToppings);
toppings(pineappleClass, "mid", "full", pizza.fullToppings);
toppings(pineappleClass, "right", "right", pizza.rightToppings);

toppings(beefClass, "left", "left", pizza.leftToppings);
toppings(beefClass, "mid", "full", pizza.fullToppings);
toppings(beefClass, "right", "right", pizza.rightToppings);

toppings(greenPeppersClass, "left", "left", pizza.leftToppings);
toppings(greenPeppersClass, "mid", "full", pizza.fullToppings);
toppings(greenPeppersClass, "right", "right", pizza.rightToppings);

toppings(jalapenosClass, "left", "left", pizza.leftToppings);
toppings(jalapenosClass, "mid", "full", pizza.fullToppings);
toppings(jalapenosClass, "right", "right", pizza.rightToppings);

toppings(sausageClass, "left", "left", pizza.leftToppings);
toppings(sausageClass, "mid", "full", pizza.fullToppings);
toppings(sausageClass, "right", "right", pizza.rightToppings);

toppings(steakClass, "left", "left", pizza.leftToppings);
toppings(steakClass, "mid", "full", pizza.fullToppings);
toppings(steakClass, "right", "right", pizza.rightToppings);

toppings(tomatoesClass, "left", "left", pizza.leftToppings);
toppings(tomatoesClass, "mid", "full", pizza.fullToppings);
toppings(tomatoesClass, "right", "right", pizza.rightToppings);

toppings(cornClass, "left", "left", pizza.leftToppings);
toppings(cornClass, "mid", "full", pizza.fullToppings);
toppings(cornClass, "right", "right", pizza.rightToppings);

bodyId.addEventListener("click", () => {
  filterAllToppings();
  addedToppingsId.innerHTML = displayToppings();
});
