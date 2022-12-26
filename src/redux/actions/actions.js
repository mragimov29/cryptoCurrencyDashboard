export function setAcc(value) {
  return {
    type: "SET_ACC",
    payload: {
      value: value,
    },
  };
}

export function addToFavorites(data) {
  return {
    type: "ADD_TO_FAVORITES",
    payload: {
      data: data,
    },
  };
}

export function removeFromFavorites(id) {
  return {
    type: "REMOVE_FROM_FAVORITES",
    payload: {
      id: id,
    },
  };
}

export function changePrice(id, price, buyOrSell) {
  return {
    type: "CHANGE_PRICE",
    payload: {
      id: id,
      price: price,
      buyOrSell: buyOrSell,
    },
  };
}
