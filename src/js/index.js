$(function() {
    $('#searchVal').on('input', function() {
        var val = $(this).val();
        if (!val.trim()) {
            $('.searchCont').html('');
            return;
        } else {
            $.ajax({
                url: '/api/data?key=' + val,
                dataType: 'json',
                success: function(data) {
                    var html = '';
                    console.log(data);
                    data.data.forEach(function(item) {
                        html += `
                        <ul>
                            <li>${item.title}</li>
                        </ul>
                        `
                    })
                    $('.searchCont').html(html);
                },
                err: function(err) {
                    console.log(err);
                }
            })
        }
    })
})