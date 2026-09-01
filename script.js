// ==========================================
// BUSINESS SETTINGS
// ==========================================

// Change these for each business.

const BUSINESS_NAME = "Shree Shivshakti Enterprises";
const BUSINESS_LOCATION = "Thane West";

// IMPORTANT:
// Replace this with your actual Google Maps
// review link.
const GOOGLE_REVIEW_URL = "YOUR_GOOGLE_REVIEW_LINK_HERE";


// ==========================================
// STAR RATING
// ==========================================

const starButtons = document.querySelectorAll("#stars button");
const ratingInput = document.getElementById("rating");

starButtons.forEach(button => {

    button.addEventListener("click", () => {

        const rating = Number(button.dataset.rating);

        ratingInput.value = rating;

        starButtons.forEach(star => {

            const starRating = Number(star.dataset.rating);

            if (starRating <= rating) {
                star.classList.add("active");
            } else {
                star.classList.remove("active");
            }

        });

    });

});


// Default 5 stars

starButtons.forEach(star => {
    star.classList.add("active");
});


// ==========================================
// GENERATE REVIEW
// ==========================================

const generateBtn = document.getElementById("generateBtn");

generateBtn.addEventListener("click", () => {

    const rating = Number(ratingInput.value);

    const product =
        document.getElementById("product").value.trim();

    const experience =
        document.getElementById("experience").value.trim();

    const service =
        document.getElementById("service").value.trim();


    // Validation

    if (!product) {
        alert("Please enter what you purchased.");
        return;
    }

    if (!experience) {
        alert("Please tell us what you liked.");
        return;
    }


    // Generate review

    const review = createReview(
        rating,
        product,
        experience,
        service
    );


    // Display

    document.getElementById("reviewText").value = review;

    document.getElementById("reviewRating").textContent =
        "★".repeat(rating) + "☆".repeat(5 - rating);

    document.getElementById("result").classList.add("show");

    // Scroll to result

    document.getElementById("result").scrollIntoView({
        behavior: "smooth"
    });

});


// ==========================================
// REVIEW GENERATOR
// ==========================================

function createReview(rating, product, experience, service) {

    let opening = "";
    let ending = "";

    if (rating === 5) {

        opening =
            `I recently purchased ${product} from ${BUSINESS_NAME} in ${BUSINESS_LOCATION}.`;

        ending =
            "Overall, I had a great experience and would definitely recommend this business.";

    } else if (rating === 4) {

        opening =
            `I recently purchased ${product} from ${BUSINESS_NAME} in ${BUSINESS_LOCATION}.`;

        ending =
            "Overall, it was a good experience and I would recommend this business.";

    } else if (rating === 3) {

        opening =
            `I purchased ${product} from ${BUSINESS_NAME} in ${BUSINESS_LOCATION}.`;

        ending =
            "Overall, it was a decent experience.";

    } else if (rating === 2) {

        opening =
            `I recently purchased ${product} from ${BUSINESS_NAME} in ${BUSINESS_LOCATION}.`;

        ending =
            "There is some room for improvement in the overall experience.";

    } else {

        opening =
            `I recently purchased ${product} from ${BUSINESS_NAME} in ${BUSINESS_LOCATION}.`;

        ending =
            "I hope the experience improves in the future.";

    }


    let review = opening + " ";

    review += experience + " ";


    if (service) {
        review += service + " ";
    }

    review += ending;


    return review;

}


// ==========================================
// COPY REVIEW
// ==========================================

const copyBtn = document.getElementById("copyBtn");

copyBtn.addEventListener("click", async () => {

    const reviewText =
        document.getElementById("reviewText").value;

    try {

        await navigator.clipboard.writeText(reviewText);

        copyBtn.textContent = "✓ Copied!";

        setTimeout(() => {
            copyBtn.textContent = "📋 Copy Review";
        }, 2000);

    } catch (error) {

        alert("Please select and copy the review manually.");

    }

});


// ==========================================
// GOOGLE REVIEW BUTTON
// ==========================================

const googleBtn = document.getElementById("googleBtn");

googleBtn.addEventListener("click", () => {

    if (
        !GOOGLE_REVIEW_URL ||
        GOOGLE_REVIEW_URL === "YOUR_GOOGLE_REVIEW_LINK_HERE"
    ) {

        alert(
            "Google Review link has not been configured yet."
        );

        return;
    }


    // Open Google review page

    window.open(
        GOOGLE_REVIEW_URL,
        "_blank"
    );

});
