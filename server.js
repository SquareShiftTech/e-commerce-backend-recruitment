import express, { json } from "express";
const app = express();
import cors from "cors";
import { postal_codes, products } from "./data.js";
import { searchPostalCode, searchProduct } from "./helperFunctions.js";

import swaggerUI from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

app.use(json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product API",
      version: "1.0.0",
      description: "Backend API for products",
    },
    servers: [
      {
        url: "http://localhost:8080/",
      },
    ],
  },
  apis: ["./server.js"],
};
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const specs = swaggerJsdoc(options);
app.use(cors(corsOptions));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
/**
 * @swagger
 * components:
 *   schemas:
 *    Product:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *           description: The product name
 *         price:
 *           type: number
 *           description: The Product Price
 *         description:
 *           type: string
 *           description: The product description
 *         category:
 *           type: string
 *           description: The product category
 *         image:
 *           type: string
 *           description: The product image
 *         discount_percentage:
 *           type: number
 *           description: The product discount_percentage
 *         weight_in_grams:
 *           type: number
 *           description: The product weight_in_grams
 *       example:
 *         id: 1
 *         name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
 *         price: 109.95
 *         description: Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday
 *         category: men's clothing
 *         image:  https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg,
 *         discount_percentage: 3.2,
 *         weight_in_grams: 670,
 *    Warehouse:
 *        type: object
 *        required:
 *        properties:
 *         postal_code:
 *           type: number
 *         distance_in_kilometers:
 *           type: number
 *        example:
 *             postal_code: 465535
 *             distance_in_kilometers: 200.35
 *
 */

/**
 * @swagger
 * /warehouse/distance:
 *   get:
 *     summary: Returns distance from warehouse to delivery address
 *     tags: [Warehouse]
 *     parameters:
 *       - in: query
 *         name: postal_code
 *         schema:
 *           type: number
 *         required: true
 *         description: Delivery address postal code
 *     responses:
 *       200:
 *         description: Distance in KM
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Warehouse'
 *       400:
 *         description: Invalid postal code, valid ones are 465535 to 465545.
 */
app.get("/warehouse/distance", async (req, res) => {
  if (postal_codes.length > 0) {
    const result = searchPostalCode(postal_codes, req.query.postal_code);
    if (result.status === "error") res.status(400).send(result);
    else res.status(200).send(result);
  } else res.status(200).send("Invalid Postal Code");
});

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Returns product info
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product id
 *     responses:
 *       200:
 *         description: Product info
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid product id. Valid product id range is 100 to 110.
 */
app.get("/product/:id", async (req, res) => {
  if (products.length > 0) {
    const result = searchProduct(products, req.params.id);
    if (result.status === "error") res.status(400).send(result);
    else res.status(200).send(result);
  } else res.status(200).send("Product not available");
});
app.listen(8080);
