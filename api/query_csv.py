import csv
import json
from collections import OrderedDict

MASTERS_JSON = 'masters.json'
MASTERS_KEY = 'masters'
MONSTERS_CSV = 'monsters.csv'
RESULT_SUFFIX = '_results'
NEW_COLUMN = 'id'
JOIN_INDEX = 0


def loop_over_masters():
    masters_file = open(MASTERS_JSON)
    data = json.load(masters_file)[MASTERS_KEY]
    masters_file.close()
    for (key, value) in data.items():
        current_master = str(value['name'].lower())
        write_results(current_master)
        generate_json(current_master)
    replace_masters()


def write_results(current_master):
    with open(MONSTERS_CSV, 'r') as monsters:
        master_indices = dict((r[1], i) for i, r in enumerate(csv.reader(monsters)))

    with open(current_master + '.csv', 'r') as master:
        with open(current_master + RESULT_SUFFIX + '.csv', 'w') as results:
            reader = csv.reader(master)
            writer = csv.writer(results)

            # New column with old header
            writer.writerow([NEW_COLUMN] + next(reader, []))

            for row in reader:
                # row is found in slayer master AND monsters
                index = master_indices.get(row[JOIN_INDEX])

                if index is not None:
                    # Row with value for id and slayer_weight:
                    # 0,12\n
                    writer.writerow([index - 1] + row)


def generate_json(file_name):
    data = []

    with open(file_name + RESULT_SUFFIX + '.csv', 'r') as csv_file:
        csv_reader = csv.DictReader(csv_file)

        for rows in csv_reader:
            id = rows['id']
            data.append(rows)

    with open(file_name + RESULT_SUFFIX + '.json', 'w') as json_file:
        json_file.write(json.dumps(data, indent=4))

    return json_file


def replace_masters():
    masters_file = open(MASTERS_JSON)
    master_data = json.load(masters_file)[MASTERS_KEY]
    masters_file.close()
    for item in master_data.items():
        cur_master_file = open(item[1]['name'].lower()+'_results.json')
        cur_data = json.load(cur_master_file)
        cur_master_file.close()
        item[1]['assignments'] = cur_data

    with open(MASTERS_JSON + '_new' + '.json', 'w') as json_file:
        json_file.write(json.dumps(master_data, indent=4))


if __name__ == "__main__":
    loop_over_masters()

