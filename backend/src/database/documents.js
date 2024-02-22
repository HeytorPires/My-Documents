const { v4: uuidv4 } = require("uuid");

const documents = [
  {
    id: uuidv4(),
    author: "Heytor",
    userEmail: "",
    updated_at: new Date("2023-08-26"),
    approved: "",
    title: "Joker",
  },
  {
    id: uuidv4(),
    author: "Jhonatan",
    userEmail: "",
    updated_at: new Date("2021-10-07"),
    approved: "",
    title: "Batman",
  },
  {
    id: uuidv4(),
    author: "Rafael",
    userEmail: "",
    updated_at: new Date("2021-02-28"),
    approved: "",
    title: "Super Homen",
  },
  {
    id: uuidv4(),
    author: "Eduardo",
    userEmail: "",
    updated_at: new Date("2022-01-05"),
    approved: "",
    title: "Mulher Maravilha",
  },
  {
    id: uuidv4(),
    author: "Bruno",
    userEmail: "",
    updated_at: new Date("2024-01-24"),
    approved: "",
    title: "Chuck Norris",
  },
];

module.exports = documents;
