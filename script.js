const WORKER_URL =
    "https://ai-review-generator.mr-amanshrivastav.workers.dev/";

const GOOGLE_REVIEW_URL =
    "https://g.page/r/CRJUwtLhjq6gEBM/review";

const GOOGLE_MAP_URL =
    "https://maps.app.goo.gl/tiEruQ4SLro3ExLU6";


const productSelect =
    document.getElementById("product");

const reviewsContainer =
    document.getElementById("reviewsContainer");

const message =
    document.getElementById("message");


// ========================================
// GENERATE 5 REVIEWS
// ========================================

async function generateReviews() {

    const product =
        productSelect.value.trim();


    reviewsContainer.innerHTML = "";


    if (!product) {

        message.textContent = "";

        return;

    }


    message.textContent =
        "✨ Generating 5 different reviews...";


    // Show loading cards

    for (let i = 1; i <= 5; i++) {

        createLoadingCard(i);

    }


    try {

        // Generate 5 different variations

        const requests = Array.from(
            { length: 5 },
            (_, index) =>
                generateSingleReview(
                    product,
                    index + 1
                )
        );


        const reviews =
            await Promise.all(requests);


        reviewsContainer.innerHTML = "";


        // Remove duplicates

        const uniqueReviews =
            [...new Set(
                reviews
                    .map(review =>
                        String(review).trim()
                    )
                    .filter(review =>
                        review.length > 0
                    )
            )];


        if (
            uniqueReviews.length === 0
        ) {

            throw new Error(
                "No reviews generated."
            );

        }


        uniqueReviews.forEach(
            (review, index) => {

                createReviewCard(
                    review,
                    index + 1
                );

            }
        );


        message.textContent =
            `✨ ${uniqueReviews.length} reviews generated. Choose the one that matches your genuine experience.`;


    } catch (error) {

        console.error(
            "Review generation error:",
            error
        );


        reviewsContainer.innerHTML = "";


        message.textContent =
            "❌ Failed to generate reviews. Please try again.";

    }

}



// ========================================
// GENERATE SINGLE REVIEW
// ========================================

async function generateSingleReview(
    product,
    variation
) {

    const response =
        await fetch(
            WORKER_URL,
            {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    product: product,

                    variation: variation

                })

            }
        );


    let data;


    try {

        data =
            await response.json();

    } catch (error) {

        throw new Error(
            "Worker returned an invalid response."
        );

    }


    if (
        !response.ok ||
        !data.success
    ) {

        throw new Error(
            data.error ||
            `Worker error: ${response.status}`
        );

    }


    return String(
        data.review || ""
    ).trim();

}



// ========================================
// CREATE LOADING CARD
// ========================================

function createLoadingCard(number) {

    const card =
        document.createElement("div");


    card.className =
        "review-card loading-card";


    card.innerHTML = `

        <div class="review-card-header">

            <span class="review-number">
                Review ${number}
            </span>

            <span class="stars">
                ★★★★★
            </span>

        </div>


        <div class="loading-text">
            ✨ Writing review...
        </div>


        <div class="loading-line"></div>

        <div class="loading-line short"></div>

    `;


    reviewsContainer.appendChild(card);

}



// ========================================
// CREATE REVIEW CARD
// ========================================

function createReviewCard(
    review,
    number
) {

    const card =
        document.createElement("div");


    card.className =
        "review-card";


    card.innerHTML = `

        <div class="review-card-header">

            <span class="review-number">
                Review ${number}
            </span>

            <span class="stars">
                ★★★★★
            </span>

        </div>


        <textarea
            class="review-text"
            aria-label="Review ${number}"
        ></textarea>


        <div class="review-buttons">

            <button
                type="button"
                class="submit-review-btn"
            >
                ⭐ Submit Review
            </button>


            <button
                type="button"
                class="google-map-btn"
            >
                📍 Google Map
            </button>

        </div>

    `;


    const textarea =
        card.querySelector(
            ".review-text"
        );


    textarea.value =
        review;



    // ====================================
    // SUBMIT REVIEW BUTTON
    // ====================================

    const submitButton =
        card.querySelector(
            ".submit-review-btn"
        );


    submitButton.addEventListener(
        "click",
        async function () {

            const currentReview =
                textarea.value.trim();


            if (!currentReview) {

                message.textContent =
                    "⚠️ Please write a review first.";

                return;

            }


            submitButton.disabled =
                true;


            const copied =
                await copyText(
                    currentReview
                );


            if (copied) {

                message.textContent =
                    "✅ Review copied! Opening Google Reviews...";


                setTimeout(
                    function () {

                        window.location.href =
                            GOOGLE_REVIEW_URL;

                    },
                    700
                );


            } else {

                message.textContent =
                    "⚠️ Please copy the review manually. Opening Google Reviews...";


                setTimeout(
                    function () {

                        window.location.href =
                            GOOGLE_REVIEW_URL;

                    },
                    1200
                );

            }

        }
    );



    // ====================================
    // GOOGLE MAP BUTTON
    // ====================================

    const mapButton =
        card.querySelector(
            ".google-map-btn"
        );


    mapButton.addEventListener(
        "click",
        async function () {

            const currentReview =
                textarea.value.trim();


            if (!currentReview) {

                message.textContent =
                    "⚠️ Please write a review first.";

                return;

            }


            mapButton.disabled =
                true;


            const copied =
                await copyText(
                    currentReview
                );


            if (copied) {

                message.textContent =
                    "✅ Review copied! Opening Google Maps...";


                setTimeout(
                    function () {

                        window.location.href =
                            GOOGLE_MAP_URL;

                    },
                    700
                );


            } else {

                message.textContent =
                    "⚠️ Please copy the review manually. Opening Google Maps...";


                setTimeout(
                    function () {

                        window.location.href =
                            GOOGLE_MAP_URL;

                    },
                    1200
                );

            }

        }
    );


    reviewsContainer.appendChild(
        card
    );

}



// ========================================
// COPY TEXT
// ========================================

async function copyText(text) {

    // Modern Clipboard API

    try {

        await navigator.clipboard.writeText(
            text
        );

        return true;

    } catch (error) {

        console.warn(
            "Clipboard API failed. Using fallback."
        );

    }


    // Fallback method

    try {

        const textarea =
            document.createElement(
                "textarea"
            );


        textarea.value =
            text;


        textarea.style.position =
            "fixed";

        textarea.style.left =
            "-9999px";

        textarea.style.top =
            "0";

        textarea.style.opacity =
            "0";


        document.body.appendChild(
            textarea
        );


        textarea.focus();

        textarea.select();


        const copied =
            document.execCommand(
                "copy"
            );


        textarea.remove();


        return copied;

    } catch (error) {

        console.error(
            "Copy failed:",
            error
        );


        return false;

    }

}



// ========================================
// PRODUCT CHANGE
// ========================================

productSelect.addEventListener(
    "change",
    function () {

        generateReviews();

    }
);
