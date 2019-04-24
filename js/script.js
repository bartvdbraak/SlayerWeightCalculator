$(document).ready(function() {
          $('#example').DataTable({
            ajax: "data/krystilia.json",
            columns: [
                {   data: 'monster'},
                {   data: 'taskweight'},
                {
                    data: null,
                    render: function ( data, type, row ) {
                        return Math.round( col.taskweight * row.taskweight * 100 )+'%';
                    }
                }
            ]
          });
} );




function filterEntries() {

}

function addPercentages() {

}

function applyChanges() {
    filterEntries();
    addPercentages();
    alert('Done.')
}