String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function toggleQuestAll(source) {
    checkboxes = document.getElementsByName('quest');
    for (var i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = source.prop("checked");
    }
    if (source.prop("checked") == true) {
        $('.quests').hide(100);
    }
    else {
        $('.quests').show(100);
    }

}

function setBlocklists() {

    // generate blocklist options, currently unused for static html
    // may be reused when updates to monsters.json require new html block options

    $.getJSON("data/monsters.json", { format: "json" }, function (data) {

        var content = '';

        for (i = 0; i < data.length; i++) {
            content += '<option value="' + data[i].monster + '">' + data[i].monster + '</option>'
        }

        $(".blocktask").each(function (index) {
            $(this).append(content)
        });

    })
}

$(document).ready(function () {

    // starting functions on page load
    
    applyChanges('krystilia');
    toggleQuestAll($('#toggleQuests'));
    $('[data-toggle="tooltip"]').tooltip()
});

function filterTasks(data) {
    index_list = []

    for (i = 0; i < data.length; i++) {

        switch (data[i].monster.toUpperCase()) {

            // Slayer point unlocks

            case 'RED DRAGONS':
                if ($("#reddrags").prop("checked") === false) {
                    index_list.unshift(i)
                }
                break;
            case 'MITHRIL DRAGONS':
                if ($("#mithdrags").prop("checked") === false) {
                    index_list.unshift(i)
                }
                break;
            case 'AVIANSIES':
                if ($("#aviansies").prop("checked") === false) {
                    index_list.unshift(i)
                }
                break;
            case 'TZHAAR':
                if ($("#tzhaar").prop("checked") === false) {
                    index_list.unshift(i)
                }
                break;
            case 'LIZARDMEN':
                if ($("#lizardmen").prop("checked") === false) {
                    index_list.unshift(i)
                }
                break;
            case 'BOSSES':
                if ($("#bosses").prop("checked") === false) {
                    index_list.unshift(i)
                }
                break;
            case 'FOSSIL ISLAND WYVERNS':
                if ($("#bonevoyage").prop("checked") === false) {
                    index_list.unshift(i)
                }
                else if ($("#fossilwyverns").prop("checked") === true) {
                    index_list.unshift(i)
                }
                break;

            // Quest task unlocks

            case 'SPIRITUAL CREATURES':
                if ($("#spiritcreatures").prop("checked") === false) {
                    index_list.unshift(i)
                }
                break;
            case 'RUNE DRAGONS':
            case 'ADAMANT DRAGONS':
                if ($("#dragonslayer2").prop("checked") === false) {
                    index_list.unshift(i)
                }
                break;
            case 'BRINE RATS':
                if ($("#brinerats").prop("checked") === false) {
                    index_list.unshift(i)
                }
                break;
            case 'DAGANNOTHS':
                if ($("#dagannoths").prop("checked") === false) {
                    index_list.unshift(i)
                }
                break;
            case 'DARK BEASTS':
                if ($("#darkbeasts").prop("checked") === false) {
                    index_list.unshift(i)
                }
                break;
            case 'DUST DEVILS':
            case 'SMOKE DEVILS':
                if ($("#dustdevils").prop("checked") === false) {
                    index_list.unshift(i)
                }
                break;                
            case 'MUTATED ZYGOMITES':
            case 'OTHERWORLDLY BEINGS':
                if ($("#lostcity").prop("checked") === false) {
                    index_list.unshift(i)
                }
                break;
            case 'CAVE HORRORS':
            case 'JUNGLE HORRORS':
                if ($("#cabinfever").prop("checked") === false) {
                    index_list.unshift(i)
                }
                break;
            case 'SKELETAL WYVERNS':
                if ($("#skeletalwyverns").prop("checked") === false) {
                    index_list.unshift(i)
                }
                break;
            case 'SEA SNAKES':
                if ($("#seasnakes").prop("checked") === false) {
                    index_list.unshift(i)
                }
                break;
            case 'FIRE GIANTS':
                if ($("#firegiants").prop("checked") === false) {
                    index_list.unshift(i)
                }
                break;
            case 'KILLERWATTS':
                if ($("#killerwatts").prop("checked") === false) {
                    index_list.unshift(i)
                }
                break;
            case 'ELVES':
                if ($("#elves").prop("checked") === false) {
                    index_list.unshift(i)
                }
                break;
            case 'FEVER SPIDERS':
                if ($("#feverspiders").prop("checked") === false) {
                    index_list.unshift(i)
                }
                break;
            case 'MOLANISKS':
                if ($("#molanisks").prop("checked") === false) {
                    index_list.unshift(i)
                }
                break;
            case 'SHADOW WARRIORS':
                if ($("#shadowwarriors").prop("checked") === false) {
                    index_list.unshift(i)
                }
                break;
            case 'GREEN DRAGONS':
            case 'BLUE DRAGONS':
            case 'BLACK DRAGONS':
            case 'RED DRAGONS':
            case 'BRONZE DRAGONS':
            case 'IRON DRAGONS':
            case 'STEEL DRAGONS':
                if ($("#dragonslayer").prop("checked") === false) {
                    index_list.unshift(i)
                }
                break;
            case 'MINIONS OF SCABARAS':
                if ($("#scabaras").prop("checked") === false) {
                    index_list.unshift(i)
                }
                break;
            case 'SUQAHS':
                if ($("#suqahs").prop("checked") === false) {
                    index_list.unshift(i)
                }
                break;
            case 'BANSHEES':
            case 'CRAWLING HANDS':
            case 'VAMPYRES':
            case 'GHOULS':
            case 'SHADES':
            case 'WEREWOLVES':
            case 'BLOODVELDS':
            case 'ABERRANT SPECTRES':
            case 'INFERNAL MAGES':
            case 'NECHRYAELS':
            case 'GARGOYLES':
                if ($("#priestinperil").prop("checked") === false) {
                    index_list.unshift(i)
                }
                break;
            case 'ABYSSAL DEMONS':
                if ($("#priestinperil").prop("checked") === false && 
                    $("#fairytale2").prop("checked") === false) {
                    index_list.unshift(i)
                }
                break;
            case 'MOGRES':
                if ($("#mogres").prop("checked") === false) {
                    index_list.unshift(i)
                }

        }

        // Task blocks

        $(".blocktask").each(function (index) {
            if ($(this).val().toUpperCase() == data[i].monster.toUpperCase()) {
                index_list.unshift(i)
            }
        });

        // Slayer requirement

        if (data[i].slayer_req > $("#slayerlevel").val()) {
            index_list.unshift(i)
        }

        // Defence requirement

        if (data[i].defence_req > $("#defencelevel").val()) {
            index_list.unshift(i)
        }

        // Combat requirement

        if (data[i].combat_req > $("#combatlevel").val()) {
            index_list.unshift(i)
        }

    }

    unique_list = index_list.filter(onlyUnique);

    for (var i in unique_list) {
        // console.log(data[unique_list[i]])
        data.splice(unique_list[i], 1)
    }

    return data
}

function sumWeights(data) {
    var total = 0;
    for (var i in data) {
        total += data[i].taskweight
    }
    return total
}

var table, currentMaster;

function deleteOldDataTable() {
    table = $('#master').DataTable()
    table.destroy();
}

function setMasterTitle(master) {
    $("#mastertitle").text(master.capitalize());
}

function applyChanges(master) {
    currentMaster = master;
    deleteOldDataTable();
    setMasterTitle(master);

    $.getJSON("data/" + master + ".json", function (data) {

        var data = filterTasks(data),
            totalweight = sumWeights(data);

        $(document).ready(function () {
            table = $('#master').DataTable({
                "order": [[2, "desc"]],
                "pageLength": 15,
                "data": data,
                "columns": [
                    { data: 'monster' },
                    { data: 'taskweight' },
                    {
                        data: null, render: function (data, type, row) {
                            return (row.taskweight / totalweight * 100).toFixed(2) + '%';
                        }
                    }
                ]
            });
        });

    })
}