const googleButton = document.getElementById("google");
const githubButton = document.getElementById("github");
const logoutButton = document.getElementById("logout");
const meContainer = document.getElementById("me");

googleButton.addEventListener("click", async () => {
    const response = await fetch("/api/auth/sign-in/social", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ provider: "google", callbackURL: "/"})
    });

    const data = await response.json();
    window.location.href = data.url;
});

githubButton.addEventListener("click", async () => {
    const response = await fetch("/api/auth/sign-in/social", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ provider: "github", callbackURL: "/"})
    });

    const data = await response.json();
    await renderMe();
    window.location.href = data.url;
});

logoutButton.addEventListener("click", async () => {
    await fetch("/api/auth/sign-in/logout", {
        method: "POST",
    });
    await renderMe();
    window.location.reload();
})

const renderMe = async () => {
    const response = await fetch("/api/me");
    meContainer.textContent = `${response.status}\n${JSON.stringify(await response.json(), null, 2)}`;
}