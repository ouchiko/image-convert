window.isfound = false;

function createImage(type) {
    let container = document.createElement("div");
    container.classList.add("imagecontainer");
    let image = document.createElement("img");
    image.setAttribute("src", "/assets/processed/"+window.imageid+"-"+type+".png");
    image.classList.add("imagecontainer--item");
    container.appendChild(image);
    image.addEventListener("click", function() {
        location.href = this.getAttribute("src");
    });
    return container;
}

window.addEventListener("load", function() {
    let wait = setInterval(function() {
        if (window.imageid) {
            fetch("../"+window.imageid+"/isloaded", {
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                method: "GET"
            }).then(function(response) {
                return response.json();
            }).then(function(data) {
                if (data.found == 'yes') {
                    clearInterval(wait);
                    setTimeout(function(){
                        let containerImage = document.querySelector(".container--image");
                        let containerWait = document.querySelector(".container--wait");

                        containerImage.classList.toggle("container--image__hide");
                        containerWait.classList.toggle("container--wait__hide");

                        containerImage.appendChild(createImage('trans'));
                        containerImage.appendChild(createImage('white'));
                        containerImage.appendChild(createImage('black'));
                    }, 2000);
                }
            })
            .catch(function(error) {
                console.log(error);
            });
        }
    }, 500);
})
