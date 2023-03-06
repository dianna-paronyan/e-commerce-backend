const express = require("express");
const sqlite = require("sqlite3").verbose();
const cors = require("cors");
const app = express();
const port = 3002;
app.use(cors());
app.use(express.json());

const db = new sqlite.Database("eCommerceDatabase.db");

app.get("/", (req, res) => {
  db.all("SELECT * FROM parfumes", [], (err, data) => {
    res.send(data);
  });
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  db.all("SELECT * FROM parfumes WHERE id=?", [id], (err, data) => {
    res.send(data);
  });
});

app.post("/createItem", (req, res) => {
  db.run(
    "INSERT INTO parfumes(image,name,price, description, quantity) VALUES(?,?,?,?,?)",
    [
      req.body.image,
      req.body.name,
      req.body.price,
      req.body.description,
      req.body.quantity,
    ],
    (err) => {
      res.send("success");
    }
  );
});

app.put("/:id", (req, res) => {
  db.run(
    "UPDATE parfumes SET image=?, name=?, price=?,description=?,quantity=? WHERE id=?",
    [
      req.body.image,
      req.body.name,
      req.body.price,
      req.body.description,
      req.body.quantity,
      req.params.id,
    ],
    (err) => {
      res.send("okkk");
    }
  );
});

app.delete("/del/:id", (req, res) => {
  db.run("DELETE FROM parfumes WHERE id=?", [req.params.id], (err) => {
    res.send("okk");
  });
});

//  shopping cart
app.get("/shoppingCart/cartProducts", (req, res) => {
  db.all("SELECT * FROM shoppingCart", [], (err, data) => {
    res.send(data);
  });
});

app.post("/createProduct", (req, res) => {
  let products = req.body;

  db.run(
    "INSERT INTO shoppingCart(product_id,image,name,price, description,quantity) VALUES(?,?,?,?,?,?)",
    [
      req.body.product_id,
      req.body.image,
      req.body.name,
      req.body.price,
      req.body.description,
      req.body.quantity,
    ],
    (err) => {
      return res.json(products);
    }
  );
});

app.put("/cart/:id", (req, res) => {
  db.run(
    "UPDATE shoppingCart SET product_id=?, image=?, name=?, price=?,description=?,quantity=? WHERE id=?",
    [
      req.body.product_id,
      req.body.image,
      req.body.name,
      req.body.price,
      req.body.description,
      req.body.quantity,
      req.params.id,
    ],
    (err) => {
      res.json(req.body);
    }
  );
});

app.delete("/delCartItem/:id", (req, res) => {
  db.run("DELETE FROM shoppingCart WHERE id=?", [req.params.id], (err) => {
    res.json(req.body);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
