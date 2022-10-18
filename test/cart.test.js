import { expect } from "chai";
import supertest from "supertest";
import { describe, it } from "mocha";

const request = supertest("http://localhost:8080/");
const url = "api/cart/";

const cart = "6348e46fd3efc20d0ccec017";
const item = "632bdce12f1a50794f3a996b";
const error = "aaa";

describe("TEST API/CART:", () => {
  describe("Create new cart", () => {
    it("Res equals to 400 because bad request", async () => {
      const res = await request.post(url).send();
      expect(res.status).to.eql(400);
    });
  });

  describe("Get all carts:", () => {
    it("Res equals to 200", async () => {
      const res = await request.get(url);
      expect(res.status).to.eql(200);
    });

    it("Res should be an array of carts", async () => {
      const res = await request.get(url);
      expect(res.body).to.be.a("array");
    });

    it("Res equals to 400", async () => {
      const res = await request.get(url + "1111sds");
      expect(res.status).to.eql(400);
    });
  });

  describe("Get items from cart", async () => {
    it("Res should be error", async () => {
      const res = await request.get(url + error + "/items");
      expect(res.status).to.eql(400);
    });
  });

  describe("Delete cart and items", async () => {
    it("Res should be not found", async () => {
      const res = await request.delete(url + "63488eed8d52e4c3df8b6eb5");
      expect(res.status).to.eql(400);
    });
  });

  describe("Add items to cart:", () => {
    it("Res equals to 400", async () => {
      const res = await request.post(
        url + cart + "/items/" + item + "ffdfdfdj"
      );
      expect(res.status).to.eql(400);
    });

    it("Res equals to 200", async () => {
      const res = await request.post(url + cart + "/items/" + item);
      expect(res.status).to.eql(200);
    });
  });

  describe("Purchase cart:", () => {
    it("Res equals to 400", async () => {
      const res = await request.post(url + "/buy-cart/" + error);
      expect(res.status).to.eql(400);
    });
  });
});
