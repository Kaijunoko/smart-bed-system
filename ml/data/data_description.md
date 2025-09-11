# 🧾 資料欄位與標記規則說明

本文件說明 `sleep_simulated.csv` 與 `sleep_real.csv` 的欄位定義與標記邏輯。

## 欄位說明

| 欄位名稱         | 說明                         | 資料型態 |
|------------------|------------------------------|----------|
| pressure_mean     | 壓力感測器的平均值           | float    |
| pressure_std      | 壓力感測器的標準差           | float    |
| movement_count    | 單位時間內的移動次數         | int      |
| fft_peak_ratio    | 頻域分析的主峰比值           | float    |
| turn_flag         | 是否翻身（0 = 否, 1 = 是）   | int      |
| stage             | 睡眠階段標記（deep, REM, awake） | string   |

## 標記規則（模擬）

- `deep`：低移動、高壓力穩定性（低標準差）
- `REM`：中等移動、頻率特徵明顯
- `awake`：高移動、翻身頻繁

## 未來擴充

- 加入 `timestamp` 欄位以支援時間序列分析
- 加入 `bed_exit_flag`、`snore_level` 等生理訊號