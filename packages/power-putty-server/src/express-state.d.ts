declare module "express-state" {
  import express from "express";
  export function extend(app: express.Express): void;
}
