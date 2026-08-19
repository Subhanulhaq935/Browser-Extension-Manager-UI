const container = document.getElementById("extensions-container");
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

init_data();