import pandas as pd
from flask import Flask, request, jsonify
import pickle
from sklearn.feature_extraction.text import CountVectorizer

app = Flask(__name__)

# Load the model
with open('lightGBM_model.pkl', 'rb') as file:
    model = pickle.load(file)

# Initialize CountVectorizer
count_vectorizer = CountVectorizer()

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get review text from request
        review_text = request.form['review_text']

        # Fit CountVectorizer and transform the review text
        review_vector = count_vectorizer.fit_transform([review_text])

        # Make prediction
        predicted_recommendation = model.predict(review_vector)[0]

        # Return prediction as JSON
        return jsonify({'recommended_ind': predicted_recommendation})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
