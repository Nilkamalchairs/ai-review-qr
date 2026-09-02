const WORKER_URL =
  "https://ai-review-generator.mr-amanshrivastav.workers.dev/";

const GOOGLE_REVIEW_URL =
  "https://g.page/r/CRJUwtLhjq6gEBM/review";

const productSelect = document.getElementById("product");
const reviewBox = document.getElementById("review");
const rewriteBtn = document.getElementById("rewriteBtn");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");

async function generateReview() {
  const product = productSelect.value;

  if (!product) {
    reviewBox.value = "";
    message.textContent = "";
    return;
  }

  reviewBox.value = "";
  message.textContent = "✨ Generating review...";
  rewriteBtn.disabled = true;

  try {
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        product: product
      })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || "Unable to generate review");
    }

    reviewBox.value = data.review.trim();
    message.textContent =
      "Review generated. You can edit it before submitting.";

  } catch (error) {
    console.error(error);
    message.textContent =
      "❌ Failed to generate review. Please try again.";
  }

  rewriteBtn.disabled = false;
}


// Product select → Generate AI review
productSelect.addEventListener("change", generateReview);


// Rewrite → Generate another AI review
rewriteBtn.addEventListener("click", generateReview);


// Submit → Copy review + Open Google Review
submitBtn.addEventListener("click", async () => {
  const review = reviewBox.value.trim();

  if (!review) {
    message.textContent = "Please generate a review first.";
    return;
  }

  try {
    await navigator.clipboard.writeText(review);

    message.textContent =
      "✅ Review copied. Opening Google Reviews...";

    setTimeout(() => {
      window.location.href = GOOGLE_REVIEW_URL;
    }, 500);

  } catch (error) {
    console.error(error);

    message.textContent =
      "Please copy the review manually, then submit it on Google.";
      
    setTimeout(() => {
  window.location.href =
    "https://g.page/r/CRJUwtLhjq6gEBM/review";
}, 500);
  }
});
