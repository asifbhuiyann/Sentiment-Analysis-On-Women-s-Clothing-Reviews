document.querySelector(".evaluate-btn").addEventListener("click", () => {
    const inputText = document.getElementById("input").value;
    const outputBox = document.getElementById("output");

    // Check if input text is empty
    if (inputText.trim() === "") {
        outputBox.value = "Please Enter Review Text First";
        return; // Exit the function
    }

<<<<<<< HEAD
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
=======
        if (reviewText === "") {
            outputField.value = "Please Enter a Review First.";
            return;
        }

        // Replace api url here
        const apiUrl = "https://sawcrep-api.onrender.com/predict";
        const requestData = JSON.stringify({ review_text: reviewText });

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: requestData,
>>>>>>> 30ae3980e26a7a2df46415f5feae108d09d42218
        })
        .catch((error) => {
            console.error("Error:", error);
            outputBox.value = "An error occurred. Please try again later.";
        });
});
