let fileData = [
  { id: 1, name: "Zahid" },
  { id: 2, name: "Khan" },
  { id: 3, name: "Ali" },
  { id: 4, name: "Haider" },
  { id: 5, name: "Smart" },
];

fileData = fileData.filter(({ id }) => id !== 2);
console.log(fileData);
