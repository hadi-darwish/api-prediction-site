//the purpose of these three variables is store their value globally
//and use it among the execution
var age;
var gender;
var nationalities = [];
//elements that are needed for controlling the page
const picture = document.getElementById("picture");
const dogName = document.getElementById("dog-name");
const predict = document.getElementById("predict");
const display_name = document.getElementById("name");
const display_age_gender = document.getElementById("age-gender");
const display_nationalities = document.getElementById("nationalities");
const find = document.getElementById("find");
//an error message that will appear when invalid name is passed by client
const error = document.getElementById("error");
error.style.display = "none";
//this var is to track the presence of error message or not
var state = false;
//this regx is only for letters characters  no spaces
const regName = /^[a-zA-Z]+$/;
// this code will call the dog pic api
//and get a random dog image from there
fetch("https://dog.ceo/api/breeds/image/random")
  .then((res) => res.text())
  .then((data) => {
    //data is a string so parse it to be an object and extract the url from it
    //where data_obj will be data_obj = {
    //     message : "image url",
    //     status : "success or fail"
    // }
    let data_obj = {};
    data_obj = JSON.parse(data);
    console.log(data_obj);
    picture.innerHTML = `<img src="${data_obj.message}"/>`;
  });
//this will listen the click of the predict button
//and it will check for the validity of the name by regex
//and if it passes it will call the function of generating the story
predict.onclick = () => {
  //this will reset previous session if the client want to try new names
  resetText();
  if (state) {
    state = false;
    error.style.display = "none";
  }
  let name = dogName.value;
  if (!regName.test(name)) {
    state = true;
    error.style.display = "block";
    return;
  }
  generate_story(name);
};

//this function will generate age of the dog by an api
async function get_age(name) {
  // age api
  await fetch("https://api.agify.io/?name=" + name)
    .then((res) => res.text())
    .then((data) => {
      let data_obj = {};
      data_obj = JSON.parse(data);
      age = data_obj.age;
      console.log(data_obj);
    });
}
//this function will generate gender of the dog by an api
async function get_gender(name) {
  // gender api
  await fetch("https://api.genderize.io/?name=" + name)
    .then((res) => res.text())
    .then((data) => {
      let data_obj = {};
      data_obj = JSON.parse(data);
      gender = data_obj.gender;
      console.log(data_obj);
    });
}

//this function will generate nationalities of the dog by an api
async function get_nationalities(name) {
  // nationalities api
  await fetch("https://api.nationalize.io/?name=" + name)
    .then((res) => res.text())
    .then((data) => {
      let data_obj = {};
      data_obj = JSON.parse(data);
      for (let index = 0; index < data_obj.country.length; index++) {
        const element = data_obj.country[index];
        nationalities[index] = element.country_id;
        console.log(element.country_id);
      }
    });
}

//this function will delete all components of each element
function resetText() {
  display_name.innerHTML = "";
  display_age_gender.innerHTML = "";
  find.innerHTML = "";
  let e = display_nationalities;
  let child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
}

//this function will generate the biography of the dog
//by calling three apis age , gender and, nationality
async function generate_story(name) {
  //get the age by age api
  await get_age(name);

  //get the gender by gender api
  await get_gender(name);

  //get nationalities by nationalities api
  await get_nationalities(name);
  //adding text and html for targeted elements to create story of the dog
  display_name.innerHTML = `🐶Woof🐶<br> Hello My name is <i>${name}</i> !`;
  display_age_gender.innerHTML = `I am a  <i>${age}</i> years old  <i>${gender} !</i> `;
  find.innerHTML = `I love Dogs and taking them on a walk🐕‍🦺🐕<br>My nationalities are 🗺️`;
  for (let index = 0; index < nationalities.length; index++) {
    display_nationalities.insertAdjacentHTML(
      "afterbegin",
      `<li>${new Intl.DisplayNames(["en"], { type: "region" }).of(
        nationalities[index]
      )}</li>`
    );
  }
}
