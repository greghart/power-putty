import { expect } from "power-putty-test";
import { DataSource } from "./index.js";

describe("DataSource", () => {
  it("should construct safely", () => {
    expect(() => new DataSource("test", "data")).not.to.throw;
  });
});
