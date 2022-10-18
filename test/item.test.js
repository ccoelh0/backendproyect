import { expect } from "chai";
import supertest from "supertest";
import { describe, it } from "mocha";

const request = supertest("http://localhost:8080/");
const url = "api/items/";

const item = "632bdce12f1a50794f3a996b";
const notFoundItem = "111";
const itemErrorToSave = {
  name: "Attack on Titans - Vol0",
  price: 1000,
  image:
    "https://tap-multimedia-1172.nyc3.digitaloceanspaces.com/productimage/9346/9789877242324.jpg",
  stock: 20,
};
const itemToSave = {
  name: "Attack on Titans - Vol",
  price: 1000,
  image:
    "https://tap-multimedia-1172.nyc3.digitaloceanspaces.com/productimage/9346/9789877242324.jpg",
  stock: 20,
  timestamp: "2020/12/02",
  description: "lala",
};
const update = { price: 500 };
const updateError = { price: 'ddd500' };

describe("TEST API/ITEMS:", () => {
  describe("Get item", () => {
    it("Response status is equal to 200", async () => {
      const response = await request.get(url + item);
      expect(response.status).to.eql(200);
    });

    it("Response is status 400", async () => {
      const response = await request.get(url + notFoundItem);
      expect(response.status).to.eql(400);
    });

    it("Response is an object", async () => {
      const response = await request.get(url + item);
      expect(response._body).to.be.a("object");
    });

    it("Response is an array of items", async () => {
      const response = await request.get(url);
      expect(response._body).to.be.a("array");
    });
  });

  describe("Save item", () => {
    it("Response is 400 because item to save is failed", async () => {
      const response = await request.post(url).send(itemErrorToSave);
      expect(response.status).to.eql(400);
    });

    it("Response is 200 because item is correct", async () => {
      const response = await request.post(url).send(itemToSave);
      expect(response.status).to.eql(200);
    });
  });

  describe("Update an item", () => {
    it("Update price has status 200", async () => {
      const response = await request.put(url + item).send(update)
      expect(response.status).to.eql(200);
    });

    it("Update error price has status 400", async () => {
      const response = await request.put(url + item).send(updateError)
      expect(response.status).to.eql(400);
    });
  });

  describe("Delete an item", () => {
    it("Delete item not found has status 400", async () => {
      const response = await request.delete(url + notFoundItem)
      expect(response.status).to.eql(400);
    });
  });
});