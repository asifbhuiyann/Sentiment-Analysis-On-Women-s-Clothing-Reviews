document.querySelector(".evaluate-btn").addEventListener("click", () => {
    const inputText = document.getElementById("input").value;
    const outputBox = document.getElementById("output");

    // Check if input text is empty
    if (inputText.trim() === "") {
        outputBox.value = "Please enter review text first";
        return; // Exit the function
    }

    // If input text is not empty, proceed with API call
    fetch("https://sawcrep-api.onrender.com/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // Add any necessary headers here
        },
        body: JSON.stringify({ review_text: inputText }),
    })
        .then((response) => response.json())
        .then((data) => {
            // Set output box value
            outputBox.value = data.recommended_ind;

            // Check the value of recommended_ind and show corresponding alert
            if (data.recommended_ind === 0) {
                alert("Product not recommended");
            } else if (data.recommended_ind === 1) {
                alert("Product recommended");
            } else {
                // Handle unexpected values
                alert("Unexpected recommendation value");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            outputBox.value = "An error occurred. Please try again later.";
        });
});
