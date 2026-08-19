const container = document.getElementById("extensions-container");
const filterButtons = document.querySelectorAll(".filter-button");
let allExtensions = [];

async function init_data()
{
    try{
        const response = await fetch("data.json");
        allExtensions = await response.json();
        console.log("Data Successfully Fetched",allExtensions);
    }
    catch(error){
        console.error("Error Fetching Data",error);
    }
}

function renderallCards(list)
{
    container.innerHTML = "";

    list.forEach((item , index)=>{
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <div class="card-top">
                <img src="${item.logo}" alt="${item.name}" class="card-logo">
                <div class="card-info">
                    <h3 class="card-name">${item.name}</h3>
                    <p class="card-desc">${item.description}</p>
                </div>
            </div>
            <div class="card-bottom">
                <button class="btn-remove" data-index="${index}">Remove</button>
                <label class="toggle-switch">
                    <input type="checkbox" class="status-toggle" data-index="${index}" ${item.isActive ? "checked" : ""}>
                    <span class="slider"></span>
                </label>
            </div>
        `;

        container.appendChild(card);
    });
}

filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filterType = btn.getAttribute("data-filter");

        if(filterType === "all"){
            renderallCards(allExtensions);
        }
        else if(filterType === "active"){
            const activeExtensions = allExtensions.filter((item) => item.isActive);
            renderallCards(activeExtensions);
        }
        else if(filterType === "inactive"){
            const inactiveExtensions = allExtensions.filter((item) => !item.isActive);
            renderallCards(inactiveExtensions);
        }
    })
});



init_data();