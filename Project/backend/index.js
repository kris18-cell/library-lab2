import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const dataFile = path.resolve("books.json");

let books = JSON.parse(fs.readFileSync(dataFile));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Book_Schema",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/books", (req, res) => {
  const q = `
    SELECT b.id, b.title, b.desc, b.price, b.cover, b.author_id, a.name AS author_name
    FROM books b
    LEFT JOIN authors a ON b.author_id = a.id
  `;
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});


app.post("/books", (req, res) => {
  const q = "INSERT INTO books(`title`, `desc`, `price`, `cover`, `author_id`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
    req.body.author_id
  ];

  db.query(q, [values], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    return res.json(data);
  });
});


app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    return res.json(data);
  });
});


app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = `
    UPDATE books 
    SET title = ?, \`desc\` = ?, price = ?, cover = ?, author_id = ?
    WHERE id = ?
  `;

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
    req.body.author_id
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    return res.json(data);
  });
});


app.listen(8800, () => {
  console.log("Connected to backend.");
});
