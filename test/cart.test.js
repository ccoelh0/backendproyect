import { expect } from "chai";
import supertest from "supertest";
import { describe, it } from "mocha";

const request = supertest("http://localhost:8080/");
const url = "api/cart/";

describe("TEST API/CART:", () => {
  describe("Get all carts:", () => {
    it("Res equals to 200", async () => {
      const res = await request.get(url);
      expect(res.status).to.eql(200);
    });

    it("Res should be an array of carts", async () => {
      const res = await request.get(url);
      expect(res.body.data).to.be.a("array");
    });

    it("Res should be an 400", async () => {
      const res = await request.post(url);
      expect(res.status).to.eql(400);
    });
  });

  describe("Add items to cart:", () => {
    it("Res equals to 400", async () => {
      const res = await request.post(
        url + "63488eed52e4c3df8b6eb5/items/632bae78614b9cf26c19826a"
      );
      expect(res.status).to.eql(400);
    });

    it("Res equals to 200", async () => {
      const res = await request.post(
        url + "63488eed8d52e4c3df8b6eb5/items/632bae78614b9cf26c19826a"
      );
      expect(res.status).to.eql(200);
    });

    it("Res equals to 200", async () => {
      const res = await request.post(
        url + "63488eed8d52e4c3df8b6eb5/items/632bae78614b9cf26c19826a"
      );
      expect(res.body.data).to.eql("item add!");
    });
  });
});
