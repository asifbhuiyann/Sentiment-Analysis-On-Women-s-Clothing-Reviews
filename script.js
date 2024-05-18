document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");
    const outputField = document.getElementById("output");
    const evaluateButton = document.querySelector(".evaluate-btn");

    evaluateButton.addEventListener("click", () => {
        const reviewText = inputField.value.trim();

        if (reviewText === "") {
            outputField.value = "Please Enter a Review First.";
            return;
        }

        // Replace 'YOUR_API_URL' with the actual API endpoint.
        const apiUrl = "https://api.example.com/checkRecommendation";

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ review_text: reviewText }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.recommended_ind) {
                    outputField.value = "Recommended";
                } else {
                    outputField.value = "Not Recommended";
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                outputField.value = "Error evaluating the review.";
            });
    });
});
