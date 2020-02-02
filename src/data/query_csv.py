import csv
import json

MASTERS_JSON = 'masters.json'
MASTERS_KEY = 'masters'
MONSTERS_CSV = 'monsters.csv'
RESULT_SUFFIX = '_results'


def loop_over_masters():
    master = open(MASTERS_JSON)
    data = json.load(master)[MASTERS_KEY]
    master.close()
    for (key, value) in data.items():
        file_name = str(value['name'].lower())
        write_results(file_name)
        generate_json(file_name)


def write_results(current_master):
    with open(MONSTERS_CSV, 'r') as monsters:
        master_indices = dict((r[1], i) for i, r in enumerate(csv.reader(monsters)))

    with open(current_master + '.csv', 'r') as master:
        with open(current_master + RESULT_SUFFIX + '.csv', 'w') as results:
            reader = csv.reader(master)
            writer = csv.writer(results)

            # Skip old header
            next(reader, [])

            # Write new CSV header row:
            # id,task_weight\n
            writer.writerow(['id'] + ['task_weight'])

            for row in reader:
                # row is found in slayer master AND monsters
                index = master_indices.get(row[0])

                if index is not None:
                    # Row with value for id and slayer_weight:
                    # 0,12\n
                    writer.writerow([index - 1] + [row[2]] )


def generate_json(file_name):
    data = {}

    with open(file_name + RESULT_SUFFIX + '.csv', 'r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for rows in csv_reader:
            id = rows['id']
            data[id] = rows

    with open(file_name + RESULT_SUFFIX + '.json', 'w') as json_file:
        json_file.write(json.dumps(data, indent=4))


if __name__ == "__main__":
    loop_over_masters()

