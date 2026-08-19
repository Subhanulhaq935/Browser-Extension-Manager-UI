const container = document.getElementById("extensions-container");
const filterButtons = document.querySelectorAll(".filter-button");
let allExtensions = [];

async function init_data() {
    try {
        const response = await fetch("data.json");
        allExtensions = await response.json();
        console.log("Data Successfully Fetched", allExtensions);

        renderallCards(allExtensions);
    }
    catch (error) {
        console.error("Error Fetching Data", error);
    }
}

function renderallCards(list) {
    container.innerHTML = "";

    list.forEach((item, index) => {
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
                <button class="btn-remove" data-name="${item.name}">Remove</button>
                <label class="toggle-switch">
                    <input type="checkbox" class="status-toggle" data-name="${item.name}" ${item.isActive ? "checked" : ""}>
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

        if (filterType === "all") {
            renderallCards(allExtensions);
        }
        else if (filterType === "active") {
            const activeExtensions = allExtensions.filter((item) => item.isActive);
            renderallCards(activeExtensions);
        }
        else if (filterType === "inactive") {
            const inactiveExtensions = allExtensions.filter((item) => !item.isActive);
            renderallCards(inactiveExtensions);
        }
    });
});

container.addEventListener("change", (e) => {
    if (e.target.classList.contains("status-toggle")) {
        const name = e.target.getAttribute("data-name");
        const item = allExtensions.find((item) => item.name === name);

        if (item) {
            item.isActive = e.target.checked;
        }

        // Get currently active filter
        const activeBtn = document.querySelector(".filter-button.active");
        const currentFilter = activeBtn ? activeBtn.getAttribute("data-filter") : "all";

        // If filtered view no longer matches the card's new status, remove only this card from DOM
        const card = e.target.closest(".card");
        if (currentFilter === "active" && !item.isActive) {
            card?.remove();
        } else if (currentFilter === "inactive" && item.isActive) {
            card?.remove();
        }
        // If currentFilter is "all", do nothing — checkbox is already toggled smoothly!
    }
});

container.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-remove")) {
        const name = e.target.getAttribute("data-name");
        const index = allExtensions.findIndex((item) => item.name === name);

        // Remove from data array
        if (index !== -1) {
            allExtensions.splice(index, 1);
        }

        // Remove only this card from DOM without redrawing everything
        const card = e.target.closest(".card");
        card?.remove();
    }
});



init_data();