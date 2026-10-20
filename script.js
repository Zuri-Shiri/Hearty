const intro = document.getElementById("intro");
const letterContainer = document.getElementById("letterContainer");
const bouquetContainer = document.getElementById("bouquetContainer");
const giftContainer = document.getElementById("giftContainer");
const confettiLayer = document.getElementById("confettiLayer");
const openHeart = document.getElementById("openHeart");
const openBouquet = document.getElementById("openBouquet");
const openGift = document.getElementById("openGift");
const closeLetter = document.getElementById("closeLetter");
const closeBouquet = document.getElementById("closeBouquet");
const closeGift = document.getElementById("closeGift");
const giftSteps = document.querySelectorAll(".gift-step");
const finishGift = document.getElementById("finishGift");
const letterSong = document.getElementById("letterSong");
const giftSong = document.getElementById("giftSong");
const flowerSong = document.getElementById("flowerSong");

function showGiftStep(stepNumber) {
    giftSteps.forEach(function (step) {
        const isCurrentStep = step.dataset.giftStep === String(stepNumber);
        step.hidden = !isCurrentStep;
        step.classList.toggle("show", isCurrentStep);
    });
}

function burstConfetti(origin) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    const bounds = origin.getBoundingClientRect();
    const colors = ["#ff5c8a", "#ffd166", "#80d8c3", "#9d8df1", "#ffffff"];
    const particleCount = 36;

    for (let index = 0; index < particleCount; index += 1) {
        const angle = (Math.PI * 2 * index) / particleCount;
        const distance = 70 + Math.random() * 150;
        const particle = document.createElement("span");
        particle.className = "confetti-piece";
        particle.style.left = bounds.left + bounds.width / 2 + "px";
        particle.style.top = bounds.top + bounds.height / 2 + "px";
        particle.style.backgroundColor = colors[index % colors.length];
        particle.style.setProperty("--confetti-x", Math.cos(angle) * distance + "px");
        particle.style.setProperty("--confetti-y", Math.sin(angle) * distance - 35 + "px");
        particle.style.setProperty("--confetti-rotation", (360 + Math.random() * 540) + "deg");
        particle.addEventListener("animationend", function () {
            particle.remove();
        }, { once: true });
        confettiLayer.appendChild(particle);
    }
}

// Open the love letter
openHeart.addEventListener("click", function () {
    intro.style.display = "none";
    letterContainer.classList.add("show");
    letterSong.volume = 0.5;
    letterSong.play().catch(function (error) {
        if (error.name !== "AbortError") {
            console.error("Could not start the message background music:", error);
        }
    });

    window.scrollTo(0, 0);
});

// Open the bouquet
openBouquet.addEventListener("click", function () {
    intro.style.display = "none";
    bouquetContainer.classList.add("show");
    flowerSong.volume = 0.5;
    flowerSong.play().catch(function (error) {
        if (error.name !== "AbortError") {
            console.error("Could not start the Flowers background music:", error);
        }
    });
    window.scrollTo(0, 0);
});

openGift.addEventListener("click", function () {
    intro.style.display = "none";
    showGiftStep(1);
    giftContainer.classList.add("show");
    giftSong.volume = 0.5;
    giftSong.play().catch(function (error) {
        if (error.name !== "AbortError") {
            console.error("Could not start the Gift background music:", error);
        }
    });
    window.scrollTo(0, 0);
});

giftContainer.addEventListener("click", function (event) {
    const nextButton = event.target.closest("[data-next-step]");
    if (nextButton) {
        if (nextButton.dataset.nextStep === "5") {
            burstConfetti(nextButton);
        }
        showGiftStep(Number(nextButton.dataset.nextStep));
    }
});

// Return to the opening screen
closeLetter.addEventListener("click", function () {
    letterContainer.classList.remove("show");
    letterSong.pause();
    letterSong.currentTime = 0;

    intro.style.display = "flex";

    window.scrollTo(0, 0);
});

closeBouquet.addEventListener("click", function () {
    bouquetContainer.classList.remove("show");
    flowerSong.pause();
    flowerSong.currentTime = 0;
    intro.style.display = "flex";
    window.scrollTo(0, 0);
});

closeGift.addEventListener("click", function () {
    giftContainer.classList.remove("show");
    giftSong.pause();
    giftSong.currentTime = 0;
    intro.style.display = "flex";
    window.scrollTo(0, 0);
});

finishGift.addEventListener("click", function () {
    giftContainer.classList.remove("show");
    giftSong.pause();
    giftSong.currentTime = 0;
    intro.style.display = "flex";
    window.scrollTo(0, 0);
});
