    
    document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");
    const outputField = document.getElementById("output");
    const evaluateButton = document.querySelector(".evaluate-btn");

    evaluateButton.addEventListener("click", () => {
        const reviewText = inputField.value.trim();

        if (reviewText === "") {
            outputField.value = "Please enter a review.";
            return;
        }
        //Replace the api here
        const apiUrl = "https://api.example.com/checkRecommendation";

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ review: reviewText }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.recommended) {
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
