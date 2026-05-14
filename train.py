import pandas as pd
from sklearn.naive_bayes import GaussianNB
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import joblib

df = pd.read_csv('cancer_patient_data_sets (1).csv')

FEATURES = [
    'Age', 'Gender', 'Air_Pollution', 'Alcohol_use', 'Dust_Allergy',
    'Occupational_Hazards', 'Genetic_Risk', 'chronic_Lung_Disease',
    'Balanced_Diet', 'Obesity', 'Smoking', 'Passive_Smoker', 'Chest_Pain',
    'Coughing_of_Blood', 'Fatigue', 'Weight_Loss', 'Shortness_of_Breath',
    'Wheezing', 'Swallowing_Difficulty', 'Dry_Cough', 'Snoring'
]

X = df[FEATURES]
y = df['Level']

le = LabelEncoder()
y_enc = le.fit_transform(y)

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y_enc, test_size=0.2, random_state=42
)

model = GaussianNB()
model.fit(X_train, y_train)

print("Accuracy:", round(model.score(X_test, y_test) * 100, 2), "%")
print("Classes:", le.classes_)
print(classification_report(y_test, model.predict(X_test), target_names=le.classes_))

joblib.dump(model,  'model.pkl')
joblib.dump(scaler, 'scaler.pkl')
joblib.dump(le,     'label_encoder.pkl')
print("Done — models saved.")
