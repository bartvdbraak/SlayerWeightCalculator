jQuery.fn.dataTable.Api.register( 'sum()', function ( ) {
    return this.flatten().reduce( function ( a, b ) {
        if ( typeof a === 'string' ) {
            a = a.replace(/[^\d.-]/g, '') * 1;
        }
        if ( typeof b === 'string' ) {
            b = b.replace(/[^\d.-]/g, '') * 1;
        }
 
        return a + b;
    }, 0 );
} );

function setBlocklists() {
    $.getJSON( "data/monsters.json", function( data ) {
        
        var content = '';

        console.log(data)
        for (i = 0; i < data.length; i++) {
            console.log(data[i].monster)
            content += '<option value="'+data[i].monster+'">'+data[i].monster+'</option>'
        }

        console.log(content)

        $( ".blocktask" ).each(function( index ) {
            $(this).append(content)
        });

    })
}

$(document).ready(function() {
    setBlocklists();
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



    }


    console.log(index_list,data)
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

function deleteOldDataTable(table) {
    if ( $.fn.dataTable.isDataTable( '#master' ) ) {
        table.destroy();
    }
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