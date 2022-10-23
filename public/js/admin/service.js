const getItemsService = () => axios.get("/api/items/");

const getItems = () => getItemsService()
  .then((res) => showItemsToDelete(res.data))
  .catch((err) => console.log(err));