function setBlocklists() {
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
    setBlocklists();
    applyChanges('krystilia');
});

function filterTasks(data) {
    index_list = []

    for (i = 0; i < data.length; i++) {
        
        // Unlocks
        
        switch (data[i].monster) {
            case 'Red dragons':
                if ($("#reddrags").prop("checked") == false) {
                    index_list.push(i)
                }
                break;
            case 'Mithril dragons':
                if ($("#mithdrags").prop("checked") == false) {
                    index_list.push(i)
                }
                break;
            case 'Aviansie':
                if ($("#aviansies").prop("checked") == false) {
                    index_list.push(i)
                }
                break;
            case 'Tzhaar':
                if ($("#tzhaar").prop("checked") == false) {
                    index_list.push(i)
                }
                break;
            case 'Lizardmen':
                if ($("#lizardmen").prop("checked") == false) {
                    index_list.push(i)
                }
                break;
            case 'Bosses':
                if ($("#bosses").prop("checked") == false) {
                    index_list.push(i)
                }
                break;
            case 'Fossil Island Wyverns':
                if ($("#wyverns").prop("checked") == true) {
                    index_list.push(i)
                }
        }

        // Slayer requirement

        if (data[i].slayer_req > $("#slayerlevel").val()) {
            index_list.push(i)
        }

        // Task blocks

        $( ".blocktask" ).each(function( index ) {
            if ($(this).val().toUpperCase() == data[i].monster.toUpperCase()) {
                index_list.push(i)
            }
        });

    }

    for (var i in index_list) {
        data.splice(i, 1)
        console.log(i)
    }
    console.log(data)
    return data
}

function sumWeights(data) {
    var total = 0;
    for (var i in data) {
        total += data[i].taskweight
    }
    return total
}

var table;

function deleteOldDataTable() {
    table = $('#master').DataTable()
    table.destroy();
}

function applyChanges(master) {
    deleteOldDataTable();

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