import InitialState from "../InitialState";

export function addToBasket(basketItem) {
  const bask = InitialState.basket;
  var exists = false;

  const newBask = bask.map(item => {
    if (item.id === basketItem.id) {
      exists = true;
      return {
        ...item,
        quantity: basketItem.quantity
      };
    } else {
      return item;
    }
  });

  if (exists) {
    InitialState.basket = newBask;
  } else {
    InitialState.basket.push(basketItem);
  }

  return InitialState.basket;
}

export function getBasket() {
  return InitialState.basket;
}

export function removeFromBasket(item) {
  const newList = [];
  for (i = 0; i < InitialState.basket.length; i++) {
    if (item.id !== InitialState.basket[i].id) {
      newList.push(InitialState.basket[i]);
    }
  }

  InitialState.basket = newList;
  return InitialState.basket;
}

export function removeAllBasket() {
  InitialState.basket = [];
}
