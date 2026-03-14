// --- TAB SWITCHING LOGIC ---
function openTab(evt, tabName) {
    const contents = document.getElementsByClassName("tab-content");
    for (let content of contents) content.classList.remove("active");

    const links = document.getElementsByClassName("tab-link");
    for (let link of links) link.classList.remove("active");

    document.getElementById(tabName).classList.add("active");
    if (evt) evt.currentTarget.classList.add("active");
}

// --- ACTUAL AUTH SYSTEM (LocalStorage) ---
function handleAuth() {
    const title = document.getElementById("auth-title").innerText;
    const user = document.getElementById("username-input").value;
    const pass = document.getElementById("password-input").value;

    if (!user || !pass) {
        alert("Please fill in all fields.");
        return;
    }

    // Get existing users or create empty list
    let users = JSON.parse(localStorage.getItem("tk_users") || "[]");

    if (title === "Sign Up") {
        // SIGN UP LOGIC
        const userExists = users.find(u => u.username === user);
        if (userExists) {
            alert("Username already taken!");
        } else {
            users.push({ username: user, password: pass });
            localStorage.setItem("tk_users", JSON.stringify(users));
            alert("Account created successfully! You can now log in.");
            toggleAuth(); // Switch to login view
        }
    } else {
        // LOGIN LOGIC
        const validUser = users.find(u => u.username === user && u.password === pass);
        if (validUser) {
            alert("Welcome back, " + user + "!");
            openTab(null, 'home'); // Send them home
        } else {
            alert("Invalid username or password.");
        }
    }
}

function toggleAuth() {
    const title = document.getElementById("auth-title");
    const btnText = document.querySelector("#auth .glass-btn");
    const toggleLink = document.querySelector(".toggle-text span");

    if (title.innerText === "Login") {
        title.innerText = "Sign Up";
        btnText.innerText = "Create Account";
        toggleLink.innerText = "Login";
    } else {
        title.innerText = "Login";
        btnText.innerText = "Submit";
        toggleLink.innerText = "Sign Up";
    }
}

// --- ROBLOX LIVE PLAYER COUNT ---
async function updateRobloxCount() {
    const placeId = "91624914286158";
    const display = document.getElementById("hangout-players");
    try {
        const universeRes = await fetch(`https://apis.roproxy.com/universes/v1/places/${placeId}/universe`);
        const universeData = await universeRes.json();
        const gameRes = await fetch(`https://games.roproxy.com/v1/games?universeIds=${universeData.universeId}`);
        const gameData = await gameRes.json();
        display.innerText = gameData.data[0].playing.toLocaleString();
    } catch (e) {
        display.innerText = "Offline"; 
    }
}

updateRobloxCount();
setInterval(updateRobloxCount, 30000);
