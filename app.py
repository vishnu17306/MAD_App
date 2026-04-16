from flask import Flask, request, jsonify
import pandas as pd
import joblib
import numpy as np

app = Flask(__name__)

model  = joblib.load('model.pkl')
scaler = joblib.load('scaler.pkl')
le     = joblib.load('label_encoder.pkl')

EXPECTED = list(scaler.feature_names_in_)

# Set defaults — features NOT sent by app get value 1 (lowest risk)
# Only the features you send (Gender, Air_Pollution, Smoking) will be high
FEATURE_DEFAULTS = {feat: 1 for feat in EXPECTED}

@app.route('/debug', methods=['GET'])
def debug():
    return jsonify({
        'expected_features': EXPECTED,
        'feature_count':     len(EXPECTED),
        'output_classes':    list(le.classes_),
        'model_type':        str(type(model).__name__),
        'defaults':          FEATURE_DEFAULTS,
    })

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        print("Received:", data)

        # Start with all features at lowest risk (1), then override with app input
        row = FEATURE_DEFAULTS.copy()
        row.update(data)

        user_data        = pd.DataFrame([row])[EXPECTED]
        print("Full input row:\n", user_data.to_dict())

        user_data_scaled = scaler.transform(user_data)
        prediction       = model.predict(user_data_scaled)
        result           = le.inverse_transform(prediction)[0]

        print("Prediction:", result)
        return jsonify({'prediction': result})

    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
