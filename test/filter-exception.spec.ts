import { PlatformTest } from "@tsed/common";
import { expect, assert } from "chai";
import SuperTest from "supertest";
import { Server } from "../src/Server";

describe("Rest", () => {
  // bootstrap your Server to load all endpoints before run your test
  let request: SuperTest.SuperTest<SuperTest.Test>;

  before(PlatformTest.bootstrap(Server));
  before(() => {
    request = SuperTest(PlatformTest.callback());
  });

  after(PlatformTest.reset);

  describe("Request params defined", () => {
    it("should return request params", async () => {
      const response = await request.post("/rest/noerror/errorId?queryId=something").send({bodyId: 'something'});

      expect(response.statusCode).equals(200);
      assert.deepEqual(response.body, {params: {errorId: "errorId"}, query: {queryId: 'something'}, body: {bodyId: 'something'}});
    });
  });
  describe("Request params undefined", () => {
    it("should return request params", async () => {
      const response = await request.post("/rest/error/errorId?queryId=something").send({bodyId: 'something'});

      expect(response.statusCode).equals(500);
      assert.deepEqual(response.body, {params: {}, query: {queryId: 'something'}, body: {bodyId: 'something'}});
    });
  });
});