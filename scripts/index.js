//the purpose of these three variables is store their value globally
//and use it among the execution
var age;
var gender;
var nationality;
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

//this function will generate the biography of the dog
//by calling three apis age , gender and, nationality
async function generate_story(name) {
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
