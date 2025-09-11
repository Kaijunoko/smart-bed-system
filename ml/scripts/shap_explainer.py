import shap
import pandas as pd
import joblib

model = joblib.load('../models/model_tree.pkl')
df = pd.read_csv('../data/sleep_simulated.csv')
X = df[['pressure_mean', 'pressure_std', 'movement_count', 'fft_peak_ratio', 'turn_flag']]

explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X)

shap.summary_plot(shap_values, X)