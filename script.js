const WORKER_URL = "https://ai-review-generator.mr-amanshrivastav.workers.dev/";

const productSelect = document.getElementById("product");
const reviewBox = document.getElementById("review");
const rewriteBtn = document.getElementById("rewriteBtn");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");

async function generateReview() {
  const product = productSelect.value;

  if (!product) {
    reviewBox.value = "";
    return;
  }

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
      throw new Error(data.error || "Failed to generate review");
    }

    reviewBox.value = data.review;
    message.textContent = "Review generated. You can edit it before submitting.";

  } catch (error) {
    console.error(error);
    message.textContent = "❌ Could not generate review. Please try again.";

  } finally {
    rewriteBtn.disabled = false;
  }
}

productSelect.addEventListener("change", generateReview);

rewriteBtn.addEventListener("click", generateReview);

submitBtn.addEventListener("click", () => {
  const review = reviewBox.value.trim();

  if (!review) {
    message.textContent = "Please generate a review first.";
    return;
  }

  navigator.clipboard.writeText(review).then(() => {
    message.textContent = "Review copied. Opening Google Reviews...";

    window.open(
      "YOUR_GOOGLE_REVIEW_LINK_HERE",
      "_blank"
    );
  });
});
