
const form = document.getElementById("shorten-form");
const urlInput = document.getElementById("url-input");
const result = document.getElementById("result");
const shortUrl = document.getElementById("short-url");
const errorMessage = document.getElementById("error-message");
const copyButton = document.getElementById("copy-btn");
const shortenButton = document.getElementById("shorten-btn");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const originalUrl = urlInput.value;

    errorMessage.textContent = "";
    result.classList.add("hidden");

    shortenButton.disabled = true;
    shortenButton.textContent = "Shortening...";

    try {

        const response = await fetch("/api/shorten", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                url: originalUrl
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong");
        }

        result.classList.remove("hidden");

        shortUrl.textContent = data.shortUrl;
        shortUrl.href = data.shortUrl;

    } catch (error) {

        errorMessage.textContent = error.message;

    } finally {

        shortenButton.disabled = false;
        shortenButton.textContent = "Shorten URL";

    }

});

copyButton.addEventListener("click", async () => {

    try {

        await navigator.clipboard.writeText(shortUrl.href);
        copyButton.textContent = "Copied!";

    } catch (error) {

        errorMessage.textContent = "Unable to copy URL";

    }

});
