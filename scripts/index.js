//the purpose of these three variables is store their value globally
//and use it among the execution
var age;
var gender;
var nationalities = [];
const picture = document.getElementById("picture");
const dogName = document.getElementById("dog-name");
const predict = document.getElementById("predict");
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
async function get_nationalities(name) {
  // age api
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

//this function will generate the biography of the dog
//by calling three apis age , gender and, nationality
function generate_story(name) {
  //get the age by age api
  get_age(name);

  //get the gender by gender api
  get_gender(name);

  //get nationalities by nationalities api
  get_nationalities(name);
}
