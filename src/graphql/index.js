const items = new Map();

let contador = 0;

export const getAll = () => Array.from(items.values())

export const getById = (args) => {
  const { id } = args;
  return items.get(id);
}

export const filter = (args) => {
  const { price } = args;
  const all = getAll();
  return all.filter(x => x.price > price);
}

export const modifyItem = (args) => {
  const { id, name, price } = args;
  const item = items.get(id);
  item.name = name;
  item.price = price;
  item.set(id, item);
  return item;
}

export const addItem = (args) => {
  const { name, price } = args;
  contador++;
  const id = contador;
  const item = { id, name, price };
  items.set(id, item);
  return item;
}