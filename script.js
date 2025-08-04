window.addEventListener("load", () => {
    const heading = document.getElementById("mainHeading");
    if (heading) {
        console.log("h1 ID:", heading.id);
    } else {
        console.warn("h1 element with ID 'mainHeading' not found.");
    }
});

const changeButton = document.getElementById("changeText");
const heading = document.getElementById("mainHeading");

const typeWriter = (text, element, speed = 100) => {
    if (!element) {
        console.warn("Target element for typewriter effect not found.");
        return;
    }
    element.style.opacity = "0";
    setTimeout(() => {
        element.textContent = "";
        element.style.opacity = "1";
        let index = 0;
        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        };
        type();
    }, 500);
};

const mysticPhrases = [
    "Awliya of the World",
    "Guardians of Divine Secrets",
    "Seekers of Eternal Truth",
    "Bearers of Celestial Light"
];
let phraseIndex = 0;

if (changeButton && heading) {
    changeButton.addEventListener("click", () => {
        typeWriter(mysticPhrases[phraseIndex], heading);
        phraseIndex = (phraseIndex + 1) % mysticPhrases.length;
    });
} else {
    console.warn("Change button or main heading not found.");
}

const sections = document.querySelectorAll(".header, .container, footer");
if (sections.length > 0) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    observer.unobserve(entry.target); // Unobserve after animation to improve performance
                }
            });
        },
        { threshold: 0.2 }
    );

    sections.forEach((section) => {
        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";
        section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        observer.observe(section);
    });
} else {
    console.warn("No sections found for intersection observer.");
}