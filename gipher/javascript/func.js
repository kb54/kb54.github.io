// Get the Input from the DOM
const go = document.querySelector('.gobutton');
const txt = document.querySelector('#search');
const container = document.querySelector('.output-container');
const lucky = document.querySelector('.lucky');
const loading = document.getElementById("loading");

go.addEventListener('click', sendData);
txt.addEventListener('keydown', sendDataOnEnter);
lucky.addEventListener('click', noData);


function sendData(event) {
    let val = txt.value;
    // Alerting the user if the input is empty.
    if(val === '') {
        alert("You forgot SOMETHING! :)");
        return;
    }
    request(val);
} 

function sendDataOnEnter(event) {
    if(event.which === 13) {
        let val = txt.value;
        // Alerting the user if the input is empty.
        if(val === '') {
            alert("You forgot SOMETHING! :)");
            return;
        }
        request(val);
    }
}

function noData(event) {
    txt.value = '';
    request('');
}

// Request and Response via XMLHTTPRequest

function request(name) {
    name = name.split(' ').join('+');
    let httpRequest = new XMLHttpRequest();
    let search = "search";
    if(name == '') {
        search = "trending";  
    }
    let url = "https://api.giphy.com/v1/gifs/"+search+"?api_key=jIm6p8ZJU7xZ0pjVH26UG8bWUPMUJ1fK&q="+name;
    console.log(url);
    loading.innerHTML = "<img src = javascript/icon.gif>";
    httpRequest.open('GET', url);
    httpRequest.send();

    httpRequest.addEventListener('load', function(event) {
        let data = event.target.response;

        //Before modifying page clear the previous result
        container.innerHTML = null;

        modifyPage(data);
    });
}

// Modify the Web Page without reloding
function modifyPage(url) {
    let data = JSON.parse(url);
    data = data.data;
    loading.innerHTML = null;
    data.forEach(element => {
        var url = element.images.fixed_height.url;
        container.innerHTML += ("<img src =" + url + "/>");
    });
}