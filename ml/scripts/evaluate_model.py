import pandas as pd
from sklearn.metrics import classification_report
import joblib

df = pd.read_csv('../data/sleep_simulated.csv')
features = ['pressure_mean', 'pressure_std', 'movement_count', 'fft_peak_ratio', 'turn_flag']
X = df[features]
y = df['stage']

model = joblib.load('../models/model_tree.pkl')
y_pred = model.predict(X)

report = classification_report(y, y_pred)
print("📊 模型評估報告：\n", report)