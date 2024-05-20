document.querySelector(".evaluate-btn").addEventListener("click", () => {
    const inputText = document.getElementById("input").value;
    const outputBox = document.getElementById("output");

    // Check if input text is empty
    if (inputText.trim() === "") {
        outputBox.value = "Please Enter Review Text First";
        return; // Exit the function
    }

    // If input text is not empty, proceed with API call
    fetch("https://sawcrep-api.onrender.com/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ review_text: inputText }),
    })
        .then((response) => response.json())
        .then((data) => {
            outputBox.value = data.recommended_ind;
            if (data.recommended_ind === 0) {
                alert("Product not recommended");
            } else if (data.recommended_ind === 1) {
                alert("Product Recommended");
            } else {
                alert("Unexpected Recommendation Value");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            outputBox.value = "An error occurred. Please try again later.";
        });
});
