// ==========================================
// BUSINESS SETTINGS
// ==========================================

const BUSINESS_NAME = "Shree Shivshakti Enterprises";

const BUSINESS_LOCATION = "Thane West";

// Put your actual Google Review link here
const GOOGLE_REVIEW_URL = "YOUR_GOOGLE_REVIEW_LINK_HERE";


// ==========================================
// VARIABLES
// ==========================================

let rating = 5;

let selectedProduct = "";

let selectedExperience = [];

let selectedService = "";


// ==========================================
// RATING
// ==========================================

const stars = document.querySelectorAll("#stars button");

const ratingText = document.getElementById("ratingText");


stars.forEach(star => {

    star.addEventListener("click", () => {

        rating = Number(star.dataset.rating);

        updateStars();

        updateRatingText();

    });

});


function updateStars() {

    stars.forEach(star => {

        const value = Number(star.dataset.rating);

        if (value <= rating) {

            star.classList.add("active");

        } else {

            star.classList.remove("active");

        }

    });

}


function updateRatingText() {

    const text = {

        1: "Poor",

        2: "Needs Improvement",

        3: "Good",

        4: "Very Good",

        5: "Excellent"

    };

    ratingText.textContent = text[rating];

}


updateStars();


// ==========================================
// PRODUCT SELECTION
// ==========================================

const productButtons =
    document.querySelectorAll("#productOptions button");


productButtons.forEach(button => {

    button.addEventListener("click", () => {

        productButtons.forEach(btn => {

            btn.classList.remove("selected");

        });

        button.classList.add("selected");

        selectedProduct = button.dataset.value;

    });

});


// ==========================================
// EXPERIENCE MULTI SELECTION
// ==========================================

const experienceButtons =
    document.querySelectorAll("#experienceOptions button");


experienceButtons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.dataset.value;


        if (selectedExperience.includes(value)) {

            selectedExperience =
                selectedExperience.filter(item => item !== value);

            button.classList.remove("selected");

        } else {

            selectedExperience.push(value);

            button.classList.add("selected");

        }

    });

});


// ==========================================
// SERVICE
// ==========================================

const serviceButtons =
    document.querySelectorAll("#serviceOptions button");


serviceButtons.forEach(button => {

    button.addEventListener("click", () => {

        serviceButtons.forEach(btn => {

            btn.classList.remove("selected");

        });

        button.classList.add("selected");

        selectedService = button.dataset.value;

    });

});


// ==========================================
// GENERATE REVIEW
// ==========================================

const generateBtn =
    document.getElementById("generateBtn");


generateBtn.addEventListener("click", () => {


    if (!selectedProduct) {

        alert("Please select what you purchased.");

        return;

    }


    if (selectedExperience.length === 0) {

        alert("Please select at least one thing you liked.");

        return;

    }


    if (!selectedService) {

        alert("Please select your service experience.");

        return;

    }


    const review =
        generateReview();


    document.getElementById("reviewText").textContent =
        review;


    document.getElementById("reviewStars").textContent =
        "★".repeat(rating) +
        "☆".repeat(5 - rating);


    document.getElementById("result").classList.add("show");


    document.getElementById("result").scrollIntoView({

        behavior: "smooth"

    });

});


// ==========================================
// REVIEW CREATOR
// ==========================================

function generateReview() {

    let review = "";


    // Opening

    if (rating >= 4) {

        review =
            `I recently purchased ${selectedProduct} from ${BUSINESS_NAME} in ${BUSINESS_LOCATION}. `;

    } else {

        review =
            `I recently purchased ${selectedProduct} from ${BUSINESS_NAME}. `;

    }


    // Experience

    if (selectedExperience.length === 1) {

        review +=
            `I really liked ${selectedExperience[0]}. `;

    } else {

        const last =
            selectedExperience[selectedExperience.length - 1];

        const first =
            selectedExperience.slice(0, -1).join(", ");

        review +=
            `I really liked ${first} and ${last}. `;

    }


    // Service

    review +=
        `The ${selectedService} made the overall experience pleasant. `;


    // Ending

    if (rating === 5) {

        review +=
            `Overall, I had an excellent experience and would highly recommend ${BUSINESS_NAME} to others.`;

    } else if (rating === 4) {

        review +=
            `Overall, I had a very good experience and would recommend this store.`;

    } else if (rating === 3) {

        review +=
            `Overall, it was a good experience.`;

    } else if (rating === 2) {

        review +=
            `Overall, the experience was okay, but there is room for improvement.`;

    } else {

        review +=
            `I hope the overall experience improves in the future.`;

    }


    return review;

}


// ==========================================
// COPY
// ==========================================

const copyBtn =
    document.getElementById("copyBtn");


copyBtn.addEventListener("click", async () => {

    const text =
        document.getElementById("reviewText").textContent;


    try {

        await navigator.clipboard.writeText(text);

        copyBtn.textContent = "✓ Review Copied!";


        setTimeout(() => {

            copyBtn.textContent = "📋 Copy Review";

        }, 2000);


    } catch {

        alert("Please copy the review manually.");

    }

});


// ==========================================
// GOOGLE REVIEW
// ==========================================

const googleBtn =
    document.getElementById("googleBtn");


googleBtn.addEventListener("click", () => {

    if (
        GOOGLE_REVIEW_URL ===
        "YOUR_GOOGLE_REVIEW_LINK_HERE"
    ) {

        alert(
            "Please add your Google Review link in script.js"
        );

        return;

    }


    window.open(
        GOOGLE_REVIEW_URL,
        "_blank"
    );

});
