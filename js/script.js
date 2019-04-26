String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function setBlocklists() {

    // generate blocklist options, currently unused for static html
    // may be reused when updates to monsters.json require new html block options

    $.getJSON( "data/monsters.json", {format: "json"}, function( data ) {
        
        var content = '';

        for (i = 0; i < data.length; i++) {
            content += '<option value="'+data[i].monster+'">'+data[i].monster+'</option>'
        }

        $( ".blocktask" ).each(function( index ) {
            $(this).append(content)
        });

    })
}

$(document).ready(function() {
    applyChanges('krystilia');
});

function filterTasks(data) {
    index_list = []

    for (i = 0; i < data.length; i++) {
        console.log(i,data[i].monster)

        switch (data[i].monster.toUpperCase()) {

            // Slayer point unlocks

            case 'RED DRAGONS':
                if ($("#reddrags").prop("checked") == false) {
                    index_list.unshift(i)
                }
                break;
            case 'MITHRIL DRAGONS':
                if ($("#mithdrags").prop("checked") == false) {
                    index_list.unshift(i)
                }
                break;
            case 'AVIANSIES':
                if ($("#aviansies").prop("checked") == false) {
                    index_list.unshift(i)
                }
                break;
            case 'TZHAAR':
                if ($("#tzhaar").prop("checked") == false) {
                    index_list.unshift(i)
                }
                break;
            case 'LIZARDMEN':
                if ($("#lizardmen").prop("checked") == false) {
                    index_list.unshift(i)
                }
                break;
            case 'BOSSES':
                if ($("#bosses").prop("checked") == false) {
                    index_list.unshift(i)
                }
                break;
            case 'FOSSIL ISLAND WYVERNS':
                if ($("#fossilwyverns").prop("checked") == true) {
                    index_list.unshift(i)
                }
            
            // Quest task unlocks


        }

        // Slayer requirement

        if (data[i].slayer_req > $("#slayerlevel").val()) {
            index_list.unshift(i)
        }

        // Task blocks

        $( ".blocktask" ).each(function( index ) {
            if ($(this).val().toUpperCase() == data[i].monster.toUpperCase()) {
                index_list.unshift(i)
            }
        });

    }

    unique_list = index_list.filter(onlyUnique);
    console.log(unique_list)
    
    for (var i in unique_list) {
        console.log(data[unique_list[i]])
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

    $.getJSON( "data/"+master+".json", function( data ) {
        
        var data = filterTasks(data),
        totalweight = sumWeights(data);

        $(document).ready(function() {
            table = $('#master').DataTable({
            "data": data,
            "columns": [
                {   data: 'monster'},
                {   data: 'taskweight'},
                {   data: null, render: function ( data, type, row ) {
                        return (row.taskweight / totalweight * 100 ).toFixed(2)+'%';
                    }
                }
            ]
            });
        });
        
    })
}