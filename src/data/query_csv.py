import csv
import json

def loop_over_masters():
    master = open('masters.json')
    data = json.load(master)["masters"]
    master.close()
    for (key, value) in data.items():
        write_results(str(value['name'].lower()))

def write_results(current_master):
    with open('monsters.csv', 'r') as monsters:
        master_indices = dict((r[1], i) for i, r in enumerate(csv.reader(monsters)))

    with open(current_master + '.csv', 'r') as master:
        with open(current_master + '_results.csv', 'w') as results:
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


if __name__ == "__main__":
    loop_over_masters()
