const search = document.getElementById("search");
const searchInput = document.getElementById("search");
let debounceTimeout;
let isRequestPending = false;
var erudaScript;


window.addEventListener("DOMContentLoaded", () => {
	const link = btoa(window.location.hash.slice(1));
	if (link) go(link);

	// info stuff
	function updateText() {
		const creationInfo = document.getElementById("creation-info");
		const facts = [
			"Equinox hates lgbt minorities.",
			"You don't have a purpose.",
			"People are dying frequently.",
			"Sad browsing.",
			"Experienced downtime? ok.",
			"https://discord.gg/example.com",
			"Customize your noose.",
			"You suck.",
			"Have you ever played Monkey Mart? It's so fun!",
			"Equinox was made by wrnd."
		];
		const randomFact = facts[Math.floor(Math.random() * facts.length)];
		creationInfo.textContent = randomFact;
	}
	updateText();
	setInterval(updateText, 10000);

	// on start
	console.log(`
		███████╗░██████╗░██╗░░░██╗██╗███╗░░██╗░█████╗░██╗░░██╗
		██╔════╝██╔═══██╗██║░░░██║██║████╗░██║██╔══██╗╚██╗██╔╝
		█████╗░░██║██╗██║██║░░░██║██║██╔██╗██║██║░░██║░╚███╔╝░
		██╔══╝░░╚██████╔╝██║░░░██║██║██║╚████║██║░░██║░██╔██╗░
		███████╗░╚═██╔═╝░╚██████╔╝██║██║░╚███║╚█████╔╝██╔╝╚██╗
		╚══════╝░░░╚═╝░░░░╚═════╝░╚═╝╚═╝░░╚══╝░╚════╝░╚═╝░░╚═╝ IS A FAGGOT\n
							Version 1.35`);
});

document.getElementById("form").addEventListener("submit", (event) => {
	event.preventDefault();
	go(search.value);
});

const gameContainers = document.querySelectorAll(".game-container");


gameContainers.forEach(container => {
    container.addEventListener("click", (event) => {
        event.preventDefault();
        const link = container.getAttribute("data-href");
        go(link);
		searchInput.placeholder = link;
    });
});

async function fetchResults(searchText) {
	try {
		const response = await bare.fetch(`https://duckduckgo.com/ac/?q=${encodeURIComponent(searchText)}`);
		const data = await response.json();
		isRequestPending = false;
		if (!Array.isArray(data)) {
			console.log(`Error: Invalid response format. Expected Array (got ${typeof data})`);
			return;
		}
		const suggestions = document.getElementById("suggestions");
		suggestions.innerHTML = "";
		for (const result of (data.map(r => r.phrase))) {
			const suggestionItem = document.createElement("div");
			const suggestionLink = document.createElement("a");
			suggestionItem.classList = ["suggestions"];

			const boldText = result.includes(searchText) ? `<strong>${searchText}</strong>` : searchText;
			suggestionLink.innerHTML = result.replace(searchText, boldText);

			suggestionLink.addEventListener("click", (event) => {
				event.preventDefault();
				searchurl(result);
			});
			suggestionItem.appendChild(suggestionLink);
			suggestions.appendChild(suggestionItem);
		}
	} catch (e) {
		isRequestPending = false;
		console.error(e);
	}
}


const form = document.getElementById("form");

searchInput.addEventListener("input", (event) => {
	const searchText = event.target.value;

	if (searchText.trim().length > 0) {
		form.focus();
	}
});

function erudaToggle() {
	var elem = document.getElementById("ifr");

	if (erudaScript) {
		elem.contentWindow.eruda.destroy();
		elem.removeChild(erudaScript);
		erudaScript = undefined;
	} else {
		erudaScript = document.createElement("script");
		erudaScript.src = "https://cdn.jsdelivr.net/npm/eruda";
		elem.contentDocument.body.appendChild(erudaScript);
		erudaScript.onload = function () {
			elem.contentWindow.eruda.init();
			elem.contentWindow.eruda.show();
		};
	}
}
