const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/:isbs", (req, res) => {
  const isbs = req.params.isbs;
  if (req.query.review == null) {
    books[isbs].reviews = "Review to delete";
  } else {
    books[isbs].reviews = req.query.review;
  }

  res.send(books[isbs].reviews);
});

public_users.post("/register", (req, res) => {
  //Write your code here
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      let booksAll = JSON.stringify(books, null, "\t");
      resolve(booksAll);
    }, 1000);
  });
  myPromise.then((booksAll) => {
    res.send(booksAll);
  });
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const isbn = req.params.isbn;
      let book = books[isbn];
      resolve(book);
    }, 1000);
  });
  myPromise.then((book) => {
    res.send(book);
  });
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const author = req.params.author;
      let authordetail = [];
      for (let book in books) {
        if (books[book].author == author) {
          authordetail.push(books[book]);
        }
      }
      resolve(authordetail);
    }, 1000);
  });
  myPromise.then((author) => {
    res.send(author);
  });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const title = req.params.title;
      let titledetail = [];
      for (let book in books) {
        if (books[book].title == title) {
          titledetail.push(books[book]);
        }
      }
      resolve(titledetail);
    }, 1000);
  });
  myPromise.then((title) => {
    res.send(title);
  });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let book = books[isbn].reviews;

  res.send(book);
});

module.exports.general = public_users;
