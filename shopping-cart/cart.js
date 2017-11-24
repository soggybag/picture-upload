const shoppingCart = [];

module.exports.getCart = () => {
  return [...shoppingCart]; // shallow copy
}

module.exports.newItem = (name, price, qty = 1) => {
  return { name, price, qty};
}

module.exports.addItem = (item) => {
  for(index in shoppingCart){
    if(shoppingCart[index].name === item.name){
      shoppingCart[index].qty++;
      return;
    };
  };
  shoppingCart.push(item);
};

module.exports.getQty = ()=>{
  return shoppingCart.reduce((acc, item)=>{
    return acc + item.qty;
  }, 0);
};
