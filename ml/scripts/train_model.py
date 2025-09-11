import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
import joblib

df = pd.read_csv('../data/sleep_simulated.csv')
features = ['pressure_mean', 'pressure_std', 'movement_count', 'fft_peak_ratio', 'turn_flag']
X = df[features]
y = df['stage']

# 訓練 Decision Tree
tree_model = DecisionTreeClassifier(max_depth=5)
tree_model.fit(X, y)
joblib.dump(tree_model, '../models/model_tree.pkl')

# 訓練 SVM
svm_model = SVC(probability=True)
svm_model.fit(X, y)
joblib.dump(svm_model, '../models/model_svm.pkl')

print("✅ 模型已儲存至 models/")