const picture = document.getElementById("picture");
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
