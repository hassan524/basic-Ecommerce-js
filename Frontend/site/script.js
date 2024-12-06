// Import AOS and its styles

const toggle = document.querySelector(".toggle").addEventListener("click", () => {
    const menu = document.querySelector("#menu");
    menu.classList.remove("hidden");
});

document.querySelector(".rem-nav").addEventListener("click", () => {
    const menu = document.querySelector("#menu");
    menu.classList.add("hidden");
})

const username = localStorage.getItem('Username');

const typed1 = new Typed('.welc', {
    strings: [
        `Welcome to EStore <span class="highlight">${username}</span>`,
        `Get Whatever You Want`
    ],
    typeSpeed: 10,
    backSpeed: 20,
    backDelay: 1000,
    loop: true,
    loopCount: Infinity,
    showCursor: true,
    cursorChar: '|',
});
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 250,
        once: false,
        offset: 340,
        delay: 0,
    });
});

const btns = document.querySelectorAll(".btn")

btns.forEach(button => {
    button.addEventListener("click", () => {
        const identy = button.getAttribute("id");
        const product = document.querySelector(`.${identy}`);
        product.classList.remove("hidden")
        product.classList.add("fixed")
        document.body.classList.add("no-scroll")

    });

});
const remove = document.querySelectorAll(".remove")
remove.forEach(rem => {
    rem.addEventListener("click", () => {
        const main = rem.parentElement.parentElement;
        main.classList.add("hidden")
        main.classList.remove("fixed")
        document.body.classList.remove("no-scroll")

    })
})


// ==For Voucher== 

let voucherapplied = false

document.querySelectorAll(".voucher").forEach(vouch => {
    vouch.addEventListener("click", (event) => {
        const card = event.target.closest(".card");

        const priceElement = card.querySelector("h1");

        if (!voucherapplied) {
            const price = parseInt(priceElement.textContent);
            const finalprice = price / 2
            priceElement.textContent = finalprice
            voucherapplied = true
        }
        else {
            alert("You can only use one time")
        }

    });
});

// ==For Add to list== 
let ul = document.querySelector(".list");
let totaladded = false; // Move the flag outside the event listener to keep its state

document.querySelectorAll(".card").forEach(card => {
    let btn = Array.from(card.querySelectorAll("button")).find(button => !button.classList.contains("voucher"));

    if (btn) {
        btn.addEventListener("click", () => {
            btn.disabled = true;
            btn.style.transform = "scale(0.90)";

            const imageSrc = card.querySelector("img").src;
            const price = card.querySelector("h1").innerText;


            let newImg = document.createElement("img");
            newImg.setAttribute("width", "55px");
            newImg.src = imageSrc;

            let newPrice = document.createElement("span");
            newPrice.style.fontSize = "25px";
            newPrice.innerText = `$${price}`;

            let newRemove = document.createElement("i");
            newRemove.style.fontSize = '25px';
            newRemove.classList.add("bi", "bi-x-lg");
            newRemove.style.cursor = "pointer";

            let li = document.createElement("li");
            li.style.display = "flex";
            li.style.justifyContent = "space-between";
            li.style.alignItems = "center";
            li.style.background = "white";
            li.style.padding = "15px";
            li.style.borderRadius = "33px";
            li.append(newImg, newPrice, newRemove);

            let ul = document.querySelector(".list");
            if (ul) {
                ul.append(li);

                const totaldiv = document.querySelector(".total-div");

                // Only add total button once
                if (!totaladded) {
                    const totalbtn = document.createElement("button");

                    totalbtn.classList.add("bg-slate-400")
                    totalbtn.style.padding = "16px"
                    totalbtn.style.color = "white"
                    totalbtn.style.borderRadius = "2rem"

                    totalbtn.innerText = "TotalValue";
                    totaldiv.append(totalbtn);
                    totaladded = true;
                    totalbtn.addEventListener("click", () => {
                        const allListItems = document.querySelectorAll(".list li");
                        let total = 0; // Define total outside the loop to accumulate values

                        allListItems.forEach(li => {
                            const span = li.querySelector("span").innerText;
                            const value = parseInt(span.replace(/[^0-9]/g, '')); // Removes any non-numeric characters like $
                            total += value; // Add each product's price to total
                        });

                        localStorage.setItem("totalvalue", total)

                        let finalprice = `$${total}`;

                        let existingSpan = totaldiv.querySelector("span");

                        if (existingSpan) {
                            existingSpan.innerText = finalprice;
                        } else {
                            const span = document.createElement("span");
                            span.style.fontSize = "25px";
                            span.innerText = finalprice;
                            totaldiv.append(span);
                        }
                        const order = document.querySelector(".order-div")
                        order.classList.remove("hidden")
                        order.classList.add("flex")

                    });


                }
            } else {
                console.error("List container not found");
            }

            newRemove.addEventListener("click", () => {
                li.remove();
                btn.disabled = false;
            });
        });
    }
});
// ==For Add to list End== 

const about = document.querySelector("#about")
let typedInstance;

function startTypingAnimation() {
    if (typedInstance) {
        typedInstance.destroy();
    }
    typedInstance = new Typed(".abouthead", {
        strings: [
            'What About Me ?'
        ],
        typeSpeed: 0,
        showCursor: false,
    });
}
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startTypingAnimation();
        }
    });
});
const target = document.querySelector('.abouthead');
observer.observe(target);


function abouttype() {
    new Typed(".typed-output", {
        strings: [
            "Hey everyone! I just built this eCommerce page using Tailwind and JavaScript. It’s an ugly clone, I know, but it’s a start! I think I could add more features to improve it. For now, I’m keeping it simple, without using any JavaScript frameworks like React or Vue. My plan is to finish learning advanced JavaScript first, then move on to React and start building stronger projects for my portfolio. This eCommerce clone is just the beginning—I’m excited to take on more complex projects soon!<br>--Hassan--"
        ],
        typeSpeed: 1,
        showCursor: false,
        loop: false
    });
}

const aboutDetails = document.getElementById("aboutDetails");

aboutDetails.addEventListener("toggle", () => {
    if (aboutDetails.open) {
        abouttype();
    }
});

const ordercontainer = document.querySelector("#location");

function gotoadd() {
    setTimeout(() => {
        ordercontainer.classList.add("fixed");
        ordercontainer.classList.remove("hidden");
    }, 1000);
}

function gobackk() {
    ordercontainer.classList.add("hidden");
    ordercontainer.classList.remove("fixed");
}

document.querySelector(".order").addEventListener("click", gotoadd);
document.querySelector("#goback").addEventListener("click", gobackk);

// Initialize map
const map = L.map('map').setView([51.505, -0.09], 13);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Create a marker variable
let marker;

// Function to search for a location
document.getElementById('searchButton').addEventListener('click', () => {
    const location = document.getElementById('locationInput').value;

    const finalprice = localStorage.getItem("totalvalue")
    document.querySelector(".finaltotal").innerText = `Total Value =  $${finalprice}`

    if (location) {
        // Use Nominatim's API to get the latitude and longitude of the entered location
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    const { lat, lon, display_name } = data[0];

                    // Update map view
                    map.setView([lat, lon], 13);

                    // Add or update marker on the map
                    if (marker) {
                        marker.setLatLng([lat, lon]);
                    } else {
                        marker = L.marker([lat, lon]).addTo(map);
                    }

                    // Bind popup to the marker
                    marker.bindPopup(`<strong>${display_name}</strong>`).openPopup();

                    // Update the read-only input value
                    document.getElementById('readonlyInput').value = display_name;
                } else {
                    alert('Location not found!');
                }
            })
            .catch(error => console.error('Error:', error));
    } else {
        alert('Please enter a location!');
    }
});

document.querySelector("#finalorder").addEventListener("click", () => {
    setTimeout(() => {
        ordercontainer.classList.add("hidden");
        ordercontainer.classList.remove("fixed");
    }, 1000)

    setTimeout(() => {
        alert("Order Has Been Confirmed")
    }, 1000)

})
