const WORKER_URL =
  "https://ai-review-generator.mr-amanshrivastav.workers.dev/";

const GOOGLE_REVIEW_URL =
  "https://g.page/r/CRJUwtLhjq6gEBM/review";

const GOOGLE_MAP_URL =
  "https://maps.app.goo.gl/tiEruQ4SLro3ExLU6";


// ========================================
// ELEMENTS
// ========================================

const productSelect =
  document.getElementById("product");

const reviewBox =
  document.getElementById("review");

const rewriteBtn =
  document.getElementById("rewriteBtn");

const submitBtn =
  document.getElementById("submitBtn");

const googleMapBtn =
  document.getElementById("googleMapBtn");

const message =
  document.getElementById("message");


// ========================================
// PRODUCT LIST
// ========================================

const products = [
  "Nilkamal Chair",
  "Nilkamal Cabinet",
  "Nilkamal Product",
  "Nilkamal Shoe Rack",
  "Steel Sofacumbed",
  "Steel Cupboard",
  "Washing Machine Stand",
  "Wooden Mandir",
  "Plastic Heavy Quality Table",
  "Wooden Folding Table",
  "Plastic Folding Table",
  "Study Table"
];


// ========================================
// GENERATE AI REVIEW
// ========================================

async function generateReview() {

  const product =
    productSelect.value.trim();


  // Check product
  if (!product) {

    reviewBox.value = "";

    message.textContent = "";

    return;
  }


  // Check product is valid
  if (!products.includes(product)) {

    message.textContent =
      "⚠️ Please select a valid product.";

    return;
  }


  // Clear previous review
  reviewBox.value = "";

  message.textContent =
    "✨ Generating review...";


  rewriteBtn.disabled = true;


  try {

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


    // Put AI review into textarea
    reviewBox.value =
      data.review.trim();


    message.textContent =
      "✅ Review generated. You can edit it before submitting.";


  } catch (error) {

    console.error(
      "Review generation error:",
      error
    );


    message.textContent =
      "❌ Failed to generate review. Please try again.";

  }


  rewriteBtn.disabled = false;

}



// ========================================
// PRODUCT CHANGE
// ========================================

productSelect.addEventListener(
  "change",
  generateReview
);



// ========================================
// REWRITE REVIEW
// ========================================

rewriteBtn.addEventListener(
  "click",
  generateReview
);



// ========================================
// COPY REVIEW
// ========================================

async function copyReview() {

  const review =
    reviewBox.value.trim();


  // No review
  if (!review) {

    return false;

  }


  // ======================================
  // MODERN CLIPBOARD
  // ======================================

  try {

    await navigator.clipboard.writeText(
      review
    );

    return true;

  } catch (error) {

    console.warn(
      "Clipboard API failed. Using fallback."
    );

  }


  // ======================================
  // FALLBACK COPY
  // ======================================

  try {

    const textarea =
      document.createElement("textarea");


    textarea.value =
      review;


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
// SUBMIT REVIEW
// ========================================

submitBtn.addEventListener(
  "click",
  async function () {

    const review =
      reviewBox.value.trim();


    if (!review) {

      message.textContent =
        "⚠️ Please generate a review first.";

      return;

    }


    submitBtn.disabled = true;


    const copied =
      await copyReview();


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



// ========================================
// GOOGLE MAP
// COPY REVIEW + OPEN MAP
// ========================================

if (googleMapBtn) {

  googleMapBtn.addEventListener(
    "click",
    async function () {

      const review =
        reviewBox.value.trim();


      if (!review) {

        message.textContent =
          "⚠️ Please generate a review first.";

        return;

      }


      googleMapBtn.disabled = true;


      // Copy review
      const copied =
        await copyReview();


      if (copied) {

        message.textContent =
          "✅ Review copied! Opening Google Maps...";


        /*
         * Wait briefly so the clipboard
         * operation completes before
         * navigating.
         */

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

}
