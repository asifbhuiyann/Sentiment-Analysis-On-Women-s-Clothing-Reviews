import pickle
from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import CountVectorizer

app = Flask(__name__)

# Load the model
with open('NaiveBayes_model.pkl', 'rb') as file:
    model = pickle.load(file)

# Load the CountVectorizer
with open('CountVectorizer.pkl', 'rb') as file:
    vectorizer = pickle.load(file)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get review text from request
        review_text = request.json['review_text']

        # Transform the review text using the loaded CountVectorizer
        review_vector = vectorizer.transform([review_text])

        # Make prediction
        predicted_recommendation = model.predict(review_vector)

        # Return prediction as JSON (assuming predicted_recommendation is an array)
        return jsonify({'recommended_ind': int(predicted_recommendation[0])})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
