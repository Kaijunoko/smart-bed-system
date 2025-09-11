import requests

url = "http://127.0.0.1:8000/predict_sleep_stage"
payload = {
    "pressure_mean": 42.1,
    "pressure_std": 6.3,
    "movement_count": 3,
    "fft_peak_ratio": 0.45,
    "turn_flag": 1
}

response = requests.post(url, json=payload)
print(response.json())