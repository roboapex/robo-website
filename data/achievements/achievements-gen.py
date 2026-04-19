# CSV to JSON
# 1. run the following from the root of project directory: `cd data/achievements; python3 achievements-gen.py`
# 2. commit and push changes
# 3. website will automatically update

import csv
import json

EVENT_MAPPINGS = {
    "National Junior Robotics Competition": ("nrc", "sg"),
    "Singapore VEX Robotics Championship": ("vex", "sg"),
    "Singapore VEX Robotics Tournament": ("vex", "sg"),
    "Singapore VEX V5 Robotics Nationals": ("vex", "sg"),
    "Singapore VEX V5 Robotics Tournament": ("vex", "sg"),
    "VEX Robotics World Championship": ("vex", "world"),
    "Asia-Pacific VEX Robotics Championship": ("vex", "ap"),
    "Asia Pacific Robotics Competition": ("apyrc", "sg"),
    "Asia Pacific Robotics Championship": ("apyrc", "sg"),
    "Ngee Ann Polytechnics Bull’s Eye Competition": ("bullseye", "sg"),
    "Bull’s Eye Competition": ("bullseye", "sg"),
    "VEX World Programming Skills Challenge": ("vex", "world"),
    "IDE Robotics Challenge": ("ide", "sg"),
    "RoboCup Singapore": ("robocup", "sg"),
    "First Tech Challenge Singapore": ("ftc", "sg"),
    "FIRST Tech Challenge Singapore": ("ftc", "sg"),
}


def normalize_competition(row, row_number):
    event = row[1].strip()
    region = row[2].strip()

    if event == "":
        raise ValueError(f"Missing competition code or name on Row {row_number}.")

    if event in EVENT_MAPPINGS:
        code, default_region = EVENT_MAPPINGS[event]
        if region == "":
            region = default_region
        return code, region

    normalized = event.lower().replace(" ", "")
    if normalized == "vexworld":
        return "vex", "world"
    if normalized == "vexsg":
        return "vex", "sg"
    if normalized == "wro":
        return "wro", region or "sg"
    if normalized == "blanks":
        return "blanks", region or "sg"

    if region == "" and event.isalpha() and event.lower() in (
        "fll",
        "ide",
        "nrc",
        "apyrc",
        "vex",
        "bullseye",
        "roborave",
        "makex",
        "wro",
        "blanks",
        "ftc",
    ):
        return event.lower(), "sg"

    if region == "":
        normalized_code = event.lower().replace(" ", "_").replace("’", "").replace("'", "")
        return normalized_code, "unknown"

    return event, region


with open("./achievements.csv", encoding="utf-8", mode="r") as fin:
    csv_data = list(csv.reader(fin))
    json_data = []

    for (_i, row) in enumerate(csv_data[1:]):
        row_number = _i + 2

        try:
            if len(row) < 8:
                raise ValueError(f"Row {row_number} has too few columns.")

            # Handle Year columns
            if row[0].strip() != "":
                try:
                    int_year = int(row[0])
                except ValueError:
                    raise TypeError(f"Invalid year on Row {row_number}.")
                json_data.append({
                    "year": int_year,
                    "competitions": [],
                })

            if not json_data:
                raise RuntimeError(f"No current year available before Row {row_number}.")

            # Handle Competition columns
            if row[1].strip() != "":
                code, region = normalize_competition(row, row_number)
                json_data[-1]["competitions"].append({
                    "code": code,
                    "region": region,
                    "desc": row[3],
                    "awards": [],
                })

            if not json_data[-1]["competitions"]:
                raise RuntimeError(f"No current competition available before Row {row_number}.")

            # Handle Award columns
            json_data[-1]["competitions"][-1]["awards"].append({
                "category": row[4],
                "title": row[5],
                "team": row[6],
                "recipients": [x.strip() for x in row[7].split(",") if x.strip()],
            })

        except Exception as exc:
            raise RuntimeError(
                f"Error occurred on Row {row_number} ({exc}). "
                "This error may or may not have been due to input data."
            )

    json_data.reverse()
    for year_data in json_data:
        year_data["competitions"].reverse()

    output = json.dumps(json_data, indent=2, sort_keys=True)

import os

with open("./achievements.json", mode="w", encoding="utf-8") as fout:
    fout.write(output)

src_data_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../src/data"))
os.makedirs(src_data_dir, exist_ok=True)
with open(os.path.join(src_data_dir, "achievements.json"), mode="w", encoding="utf-8") as fout:
    fout.write(output)

print(output)
