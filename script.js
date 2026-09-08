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


    // Show 5 loading cards

    for (let i = 1; i <= 5; i++) {

        createLoadingCard(i);

    }


    try {

        /*
         * Send 5 requests simultaneously.
         */

        const requests = Array.from(
            { length: 5 },
            () => generateSingleReview(product)
        );


        const reviews =
            await Promise.all(requests);


        reviewsContainer.innerHTML = "";


        // Remove exact duplicates

        const uniqueReviews =
            [...new Set(
                reviews
                    .map(review => review.trim())
                    .filter(review => review.length > 0)
            )];


        if (uniqueReviews.length === 0) {

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

async function generateSingleReview(product) {

    const response =
        await fetch(WORKER_URL, {

            method: "POST",

            headers: {

                "Content-Type":
                    "application/json"

            },

            body: JSON.stringify({

                product: product

            })

        });


    const data =
        await response.json();


    if (
        !response.ok ||
        !data.success
    ) {

        throw new Error(
            data.error ||
            "Unable to generate review"
        );

    }


    return data.review.trim();

}



// ========================================
// LOADING CARD
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
        card.querySelector(".review-text");


    textarea.value =
        review;



    // ====================================
    // SUBMIT REVIEW
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


                setTimeout(function () {

                    window.location.href =
                        GOOGLE_REVIEW_URL;

                }, 700);


            } else {

                message.textContent =
                    "⚠️ Please copy the review manually. Opening Google Reviews...";


                setTimeout(function () {

                    window.location.href =
                        GOOGLE_REVIEW_URL;

                }, 1200);

            }

        }
    );



    // ====================================
    // GOOGLE MAP
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


                setTimeout(function () {

                    window.location.href =
                        GOOGLE_MAP_URL;

                }, 700);


            } else {

                message.textContent =
                    "⚠️ Please copy the review manually. Opening Google Maps...";


                setTimeout(function () {

                    window.location.href =
                        GOOGLE_MAP_URL;

                }, 1200);

            }

        }
    );


    reviewsContainer.appendChild(card);

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


    // Fallback

    try {

        const textarea =
            document.createElement("textarea");


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

        textarea.setSelectionRange(
            0,
            textarea.value.length
        );


        const copied =
            document.execCommand("copy");


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
    generateReviews
);
