// ==========================================
// BUSINESS SETTINGS
// ==========================================

const BUSINESS_NAME =
    "SHREE SHIVSHAKTI ENTERPRISES";

const BUSINESS_LOCATION =
    "Manpada - Thane West";


// ==========================================
// GOOGLE REVIEW LINK
// ==========================================

// Replace this with your actual Google Review URL

const GOOGLE_REVIEW_URL =
    "YOUR_GOOGLE_REVIEW_LINK_HERE";


// ==========================================
// ELEMENTS
// ==========================================

const product =
    document.getElementById("product");

const review =
    document.getElementById("review");

const rewriteBtn =
    document.getElementById("rewriteBtn");

const submitBtn =
    document.getElementById("submitBtn");

const message =
    document.getElementById("message");


// ==========================================
// PRODUCT SELECT
// ==========================================

product.addEventListener("change", () => {

    const selectedProduct =
        product.value;


    if (!selectedProduct) {

        review.value = "";

        message.textContent = "";

        return;

    }


    // Automatically generate review

    generateReview(selectedProduct);

});


// ==========================================
// GENERATE REVIEW
// ==========================================

function generateReview(selectedProduct) {

    message.textContent =
        "✨ Writing your review...";

    rewriteBtn.disabled = true;

    submitBtn.disabled = true;


    // Small delay for AI-like experience

    setTimeout(() => {

        const reviews = [

            `I recently purchased a ${selectedProduct} from ${BUSINESS_NAME} in ${BUSINESS_LOCATION}. I was impressed with the product quality and overall buying experience. The staff was helpful and the service was smooth. I am happy with my purchase and would recommend this store for quality furniture in Thane.`,

            `Had a good experience purchasing a ${selectedProduct} from ${BUSINESS_NAME}. The product quality is good and the overall service was smooth. The staff was helpful and made the buying process easy. Would recommend this furniture store in Thane.`,

            `I purchased a ${selectedProduct} from ${BUSINESS_NAME}, Thane West. The product has good quality and a strong build. I also found the staff helpful and the buying experience convenient. Overall, I am satisfied with my purchase.`

        ];


        const randomReview =
            reviews[
                Math.floor(
                    Math.random() * reviews.length
                )
            ];


        review.value =
            randomReview;


        message.textContent =
            "✓ Review generated";


        rewriteBtn.disabled = false;

        submitBtn.disabled = false;


    }, 700);

}


// ==========================================
// REWRITE
// ==========================================

rewriteBtn.addEventListener("click", () => {

    const selectedProduct =
        product.value;


    if (!selectedProduct) {

        message.textContent =
            "Please select a product first.";

        return;

    }


    generateReview(selectedProduct);

});


// ==========================================
// SUBMIT
// ==========================================

submitBtn.addEventListener("click", () => {

    const selectedProduct =
        product.value;

    const reviewText =
        review.value.trim();


    if (!selectedProduct) {

        message.textContent =
            "Please select a product.";

        return;

    }


    if (!reviewText) {

        message.textContent =
            "Please generate a review first.";

        return;

    }


    if (
        GOOGLE_REVIEW_URL ===
        "YOUR_GOOGLE_REVIEW_LINK_HERE"
    ) {

        message.textContent =
            "Google Review link is not configured yet.";

        return;

    }


    // Copy review first

    navigator.clipboard
        .writeText(reviewText)
        .catch(() => {});


    // Open Google

    window.open(
        GOOGLE_REVIEW_URL,
        "_blank"
    );

});
