from pathlib import Path
import pandas as pd

csv_path = Path("data/synthetic_shuttle_gps_with_outliers.csv")
out_path = Path("data/gpsRoute.js")

df = pd.read_csv(csv_path)

with out_path.open("w", encoding="utf-8") as f:
    f.write("export const GPS_POINTS = [\n")
    for row in df.itertuples():
        f.write(
            f"  {{ latitude: {row.lat:.8f}, longitude: {row.lon:.8f}, "
            f"speed: {row.gps_speed_mps:.2f}, heading: {row.heading_deg:.2f} }},\n"
        )
    f.write("];\n")

print(f"생성 완료: {out_path}")
print(f"GPS 개수: {len(df)}")
