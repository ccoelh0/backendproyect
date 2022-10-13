import { expect } from "chai";
import supertest from "supertest";
import { describe, it } from "mocha";

const request = supertest("http://localhost:8080/");

describe("TEST API/CART:", () => {
  describe("Get all carts:", () => {
    it("Res equals to 200", async () => {
      const res = await request.get("api/cart/");
      expect(res.status).to.eql(200);
    });

    it("Res should be an array of carts", async () => {
      const res = await request.get("api/items/");
      expect(res.body).to.be.a("array");
    });

    it("Res should be an 400", async () => {
      const res = await request.post("api/cart/");
      expect(res.status).to.eql(400);
    });
  });
});
