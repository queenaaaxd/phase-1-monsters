let URL = "http://localhost:3000/monsters";
let pageCounter = 1;
let monsterContainer = document.getElementById("monster-container");
let monsterFormContainer = document.getElementById("create-monster");

const fetchMonsters = () => {
  fetch(URL + `/?_limit=50&_page=${pageCounter}`)
    .then((response) => response.json())
    .then((data) => renderMonsters(data));
};

function renderMonsters(monsters) {
  monsters.forEach((monster) => {
    let name = document.createElement("h2"); // h2 will be monster's name
    name.textContent = monster.name;

    let age = document.createElement("h4"); // h4 will be monster's age
    age.textContent = monster.age;

    let desc = document.createElement("p"); // p will be monster's description
    desc.textContent = monster.description;

    monsterContainer.append(name, age, desc);
  });
}

// create form on top for post request
let form = document.createElement("form");

let nameInput = document.createElement("input");
nameInput.type = "text";
nameInput.name = "name";
nameInput.placeholder = "name...";

let ageInput = document.createElement("input");
ageInput.type = "text";
ageInput.name = "age";
ageInput.placeholder = "age...";

let descInput = document.createElement("input");
descInput.type = "text";
descInput.name = "description";
descInput.placeholder = "description...";

let submit = document.createElement("submit");
submit.type = "submit";

// then you have to append it together with a submit button
form.append(nameInput, ageInput, descInput, submit);
monsterFormContainer.append(form);

// now you to add event when submit button is clicked
form.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent page from refreshing when clicked

  let monster = {
    // taking all the values from the input
    name: event.target.name.value,
    age: event.target.age.value,
    description: event.target.description.value,
  };

  // post request
  fetch("http://localhost:3000/monsters", {
    // sent to server
    method: "POST", // second arugment here, since it's a POST request
    headers: {
      // you also need to let ther server know what the format will be
      "content-type": "Application/json",
    },
    body: JSON.stringify(monster),
  })
    .then((response) => response.json())
    .then((data) => renderMonsters([data]));
});

// page back and next button
document.getElementById("forward").addEventListener("click", () => {
  // <button id="forward">=></button>
  pageCounter++; // every time we click, add one to page
  monsterContainer.innerHTML = "";
  fetchMonsters();
});

document.getElementById("back").addEventListener("click", () => {
  // <button id="back"><=</button>
  if (pageCounter === 0) {
    pageCounter = 1;
  } else {
    pageCounter--;
  }
  monsterContainer.innerHTML = "";
  fetchMonsters();
});
