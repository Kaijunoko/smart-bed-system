import pandas as pd
import random

def generate_sample(n=100):
    data = []
    for _ in range(n):
        pressure_mean = round(random.uniform(35, 55), 2)
        pressure_std = round(random.uniform(5, 15), 2)
        movement_count = random.randint(0, 6)
        fft_peak_ratio = round(random.uniform(0.3, 0.9), 2)
        turn_flag = random.randint(0, 1)

        # 模擬標記邏輯
        if movement_count <= 2 and pressure_std < 10:
            stage = "deep"
        elif movement_count <= 4:
            stage = "REM"
        else:
            stage = "awake"

        data.append([
            pressure_mean,
            pressure_std,
            movement_count,
            fft_peak_ratio,
            turn_flag,
            stage
        ])

    return pd.DataFrame(data, columns=[
        "pressure_mean", "pressure_std", "movement_count",
        "fft_peak_ratio", "turn_flag", "stage"
    ])

# 產生並儲存資料
df = generate_sample(n=100)
df.to_csv("../data/sleep_simulated.csv", index=False)
print("✅ 已產生模擬資料並儲存至 data/sleep_simulated.csv")