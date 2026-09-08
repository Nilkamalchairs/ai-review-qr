const WORKER_URL =
  "https://ai-review-generator.mr-amanshrivastav.workers.dev/";

const GOOGLE_REVIEW_URL =
  "https://g.page/r/CRJUwtLhjq6gEBM/review";

const GOOGLE_MAP_URL =
  "https://maps.app.goo.gl/tiEruQ4SLro3ExLU6";


// ===============================
// ELEMENTS
// ===============================

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


// ===============================
// GENERATE REVIEW
// ===============================

async function generateReview() {

  const product =
    productSelect.value;


  // No product selected
  if (!product) {

    reviewBox.value = "";
    message.textContent = "";

    return;
  }


  // Clear old review
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


    // Put generated review in textarea
    reviewBox.value =
      data.review.trim();


    message.textContent =
      "Review generated. You can edit it before submitting.";


  } catch (error) {

    console.error(error);


    message.textContent =
      "❌ Failed to generate review. Please try again.";

  }


  rewriteBtn.disabled = false;

}



// ===============================
// PRODUCT → GENERATE REVIEW
// ===============================

productSelect.addEventListener(
  "change",
  generateReview
);



// ===============================
// REWRITE
// ===============================

rewriteBtn.addEventListener(
  "click",
  generateReview
);



// ===============================
// COPY REVIEW FUNCTION
// ===============================

async function copyReview() {

  const review =
    reviewBox.value.trim();


  if (!review) {

    message.textContent =
      "⚠️ Please generate a review first.";

    return false;
  }


  // Modern Clipboard API
  try {

    await navigator.clipboard.writeText(
      review
    );

    return true;

  } catch (error) {

    console.warn(
      "Clipboard API failed. Trying fallback..."
    );


    // ===============================
    // FALLBACK COPY METHOD
    // ===============================

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


      const successful =
        document.execCommand("copy");


      textarea.remove();


      return successful;

    } catch (fallbackError) {

      console.error(
        fallbackError
      );

      return false;

    }

  }

}



// ===============================
// SUBMIT REVIEW
// ===============================

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
        "✅ Review copied. Opening Google Reviews...";


      setTimeout(function () {

        window.location.href =
          GOOGLE_REVIEW_URL;

      }, 500);


    } else {

      message.textContent =
        "⚠️ Please copy the review manually, then submit it on Google.";


      setTimeout(function () {

        window.location.href =
          GOOGLE_REVIEW_URL;

      }, 1000);

    }

  }
);



// ===============================
// GOOGLE MAP
// COPY REVIEW + OPEN MAP
// ===============================

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
         * Small delay gives Android
         * enough time to finish clipboard
         * operation before navigation.
         */

        setTimeout(function () {

          window.location.href =
            GOOGLE_MAP_URL;

        }, 700);


      } else {

        message.textContent =
          "⚠️ Please copy the review manually.";


        /*
         * Still open Google Maps
         */

        setTimeout(function () {

          window.location.href =
            GOOGLE_MAP_URL;

        }, 1000);

      }

    }
  );

}
