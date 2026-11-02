const dialog = document.querySelector("#project-dialog");
const title = document.querySelector("#dialog-title");
const description = document.querySelector("#dialog-text");
const dialogHeading = document.querySelector("#dialog-heading");
function showPreview(heading, text, displayHeading = "you got an idea?") {
    title.textContent = heading;
    description.innerHTML = text;
    dialogHeading.textContent = displayHeading;
    dialog.showModal();
}
document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
        document.querySelectorAll("[data-filter]").forEach((item) => {
            item.classList.toggle("active", item === button);
            item.setAttribute("aria-pressed", String(item === button));
        });
        document.querySelectorAll(".project[data-category]").forEach((project) => {
            project.hidden = button.dataset.filter !== "all" && project.dataset.category !== button.dataset.filter;
        });
        const count = document.querySelector("#project-count");
        if (count) {
            const total = document.querySelectorAll(".project[data-category]:not([hidden])").length;
            count.textContent = total + (total === 1 ? " project" : " projects");
        }
    });
});
document.querySelectorAll("[data-project]").forEach((project) => {
    project.addEventListener("click", () => {
        if (project.dataset.kind === "theme") {
            showPreview(
                "my-vscode-theme.json",
                `please visit my works here:
                <a href="https://marketplace.visualstudio.com/search?term=elle-ybas22&target=VSCode&category=All%20categories&sortBy=Relevance" target="_blank" rel="noopener noreferrer" class="pop-up-link">VS Code Marketplace (Elle Ybas)</a>`,
                "a little get-to-know-me :>",
            );
        } else {
            showPreview("mobile-app-0" + project.dataset.project + ".txt", "This mobile app is a preview placeholder. Its case study will show real screenshots, the problem it solves, key features, my role, the tools used in this particular app, and any available demo or source link.", "A little app. A story to share.");
        }
    });
});
document.querySelector("#contact-button")?.addEventListener("click", () => showPreview("a-little-hello.txt", 'a little chat may do :> <br> feel free to email me at: <a href="mailto:elleybas@gmail.com" class="email-link">elleybas@gmail.com</a>'));
document.querySelector("#close-dialog").addEventListener("click", () => dialog.close());
document.querySelector("#dialog-done").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
        const bounds = dialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    }
});
