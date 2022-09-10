const picture = document.getElementById("picture");
const dogName = document.getElementById("dog-name");
const predict = document.getElementById("predict");
//an error message that will appear when invalid name is passed by client
const error = document.getElementById("error");
error.style.display = "none";
//this var is to track the presence of error message or not
var state = false;
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

//this will
predict.onclick = () => {
  if (state) {
    state = false;
    error.style.display = "none";
  }
  let name = dogName.value;
  if (!regName.test(name)) {
    state = true;
    error.style.display = "block";
  }
};
