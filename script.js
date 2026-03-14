// Tab Switching logic
function openTab(evt, tabName) {
    const contents = document.getElementsByClassName("tab-content");
    for (let content of contents) content.classList.remove("active");

    const links = document.getElementsByClassName("tab-link");
    for (let link of links) link.classList.remove("active");

    document.getElementById(tabName).classList.add("active");
    if (evt) evt.currentTarget.classList.add("active");
}

// Live Roblox Player Count via RoProxy
async function updatePlayerCount() {
    const placeId = "91624914286158";
    const countElement = document.getElementById("hangout-players");

    try {
        const universeRes = await fetch(`https://apis.roproxy.com/universes/v1/places/${placeId}/universe`);
        const universeData = await universeRes.json();
        const universeId = universeData.universeId;

        const gameRes = await fetch(`https://games.roproxy.com/v1/games?universeIds=${universeId}`);
        const gameData = await gameRes.json();
        
        const count = gameData.data[0].playing;
        countElement.innerText = count.toLocaleString();
    } catch (error) {
        console.error("Roblox API unreachable", error);
        countElement.innerText = "0"; 
    }
}

// Toggle between Login and Sign Up
function toggleAuth() {
    const title = document.getElementById("auth-title");
    title.innerText = (title.innerText === "Login") ? "Sign Up" : "Login";
}

// Simulated Login
function mockAuth() {
    alert("Authentication system is in demo mode. Connection to database pending!");
}

// Init
updatePlayerCount();
setInterval(updatePlayerCount, 30000); // Refresh every 30s