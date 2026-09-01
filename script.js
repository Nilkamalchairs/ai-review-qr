// ==========================================
// BUSINESS SETTINGS
// ==========================================

const BUSINESS_NAME =
    "Shree Shivshakti Enterprises";

const BUSINESS_LOCATION =
    "Thane West";


// ==========================================
// GOOGLE REVIEW LINK
// ==========================================
//
// Replace this with your actual Google
// review link.
//

const GOOGLE_REVIEW_URL =
    "YOUR_GOOGLE_REVIEW_LINK_HERE";


// ==========================================
// PRODUCT REVIEWS
// ==========================================

const productReviews = {

    chair: {
        product: "Nilkamal Chair",

        review:
            `I recently purchased a Nilkamal Chair from ${BUSINESS_NAME} in ${BUSINESS_LOCATION}. The chair has excellent quality, a strong and durable build, and a comfortable design. The overall buying experience was smooth and the staff was helpful. I am happy with my purchase and would recommend this store for quality furniture in Thane.`
    },


    table: {
        product: "Nilkamal Table",

        review:
            `I recently purchased a Nilkamal Table from ${BUSINESS_NAME} in ${BUSINESS_LOCATION}. The table has a strong build and good quality, and I really liked the design and finish. The staff was helpful and the buying experience was smooth. Overall, I am happy with my purchase and would recommend this store.`
    },


    cupboard: {
        product: "Nilkamal Cupboard",

        review:
            `I recently purchased a Nilkamal Cupboard from ${BUSINESS_NAME} in ${BUSINESS_LOCATION}. The cupboard has good quality, a strong build and a practical design. The staff was helpful and the overall shopping experience was smooth. I am satisfied with my purchase and would recommend this store for furniture in Thane.`
    },


    furniture: {
        product: "Furniture",

        review:
            `I recently purchased furniture from ${BUSINESS_NAME} in ${BUSINESS_LOCATION}. I was happy with the product quality, design and overall buying experience. The staff was helpful and the service was smooth. Overall, I had a good experience and would recommend this furniture store in Thane.`
    }

};


// ==========================================
// ELEMENTS
// ==========================================

const productScreen =
    document.getElementById("productScreen");

const loadingScreen =
    document.getElementById("loadingScreen");

const reviewScreen =
    document.getElementById("reviewScreen");

const reviewText =
    document.getElementById("reviewText");

const copyBtn =
    document.getElementById("copyBtn");

const googleBtn =
    document.getElementById("googleBtn");

const backBtn =
    document.getElementById("backBtn");


// ==========================================
// PRODUCT CLICK
// ==========================================

const productButtons =
    document.querySelectorAll(".product");


productButtons.forEach(button => {

    button.addEventListener("click", () => {

        const productKey =
            button.dataset.key;

        createReview(productKey);

    });

});


// ==========================================
// CREATE REVIEW
// ==========================================

function createReview(productKey) {

    const product =
        productReviews[productKey];


    if (!product) {

        alert("Product not found.");

        return;

    }


    // Hide product screen

    productScreen.style.display = "none";


    // Show loading

    loadingScreen.classList.add("show");


    // Simulate AI generation

    setTimeout(() => {

        loadingScreen.classList.remove("show");


        reviewText.textContent =
            product.review;


        reviewScreen.classList.add("show");


        reviewScreen.scrollIntoView({
            behavior: "smooth"
        });


    }, 1200);

}


// ==========================================
// COPY REVIEW
// ==========================================

copyBtn.addEventListener("click", async () => {

    const text =
        reviewText.textContent;


    try {

        await navigator.clipboard.writeText(text);

        copyBtn.textContent =
            "✓ Review Copied!";


        setTimeout(() => {

            copyBtn.textContent =
                "📋 Copy Review";

        }, 2000);


    } catch (error) {

        alert(
            "Please select and copy the review manually."
        );

    }

});


// ==========================================
// GOOGLE REVIEW
// ==========================================

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


// ==========================================
// BACK
// ==========================================

backBtn.addEventListener("click", () => {

    reviewScreen.classList.remove("show");

    productScreen.style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
