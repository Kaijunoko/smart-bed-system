import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
import joblib

# 讀取資料
df = pd.read_csv('sleep_simulated.csv')
features = ['pressure_mean', 'pressure_std', 'movement_count', 'fft_peak_ratio', 'turn_flag']
X = df[features]
y = df['stage']

# 分割資料集
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 訓練模型
model = DecisionTreeClassifier(max_depth=5)
model.fit(X_train, y_train)

# 儲存模型
joblib.dump(model, 'model.pkl')
print("✅ 模型已儲存到 ml/model.pkl")