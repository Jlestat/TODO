$(document).ready(function (){
    $(".remove-to-do").click(function (){
        const id = $(this).attr('id');

        $.post("app/remove.php",
            {
                id: id
            },
            (data) => {
                if (data){
                    $(this).parent().hide(600);
                }
            }
        );
    });
    $(".check-box").click(function (e){
        const id = $(this).attr('data-todo-id');
        $.post('app/check.php',
            {
                id: id
            },
            (data) => {
                if (data != 'error'){
                    const h2 = $(this).next();
                    if (data === '1'){
                        h2.removeClass('checked');
                    }else {
                        h2.addClass('checked');
                    }
                }
            }
        );
    });
    $('.edit-btn').click(function() {
        var id = $(this).data('todo-id');
        var currentTitle = $(this).siblings('h2').text();
        $(this).siblings('h2').replaceWith('<input type="text" class="edit-title" value="' + currentTitle + '"/>');
        $(this).text('Save').removeClass('edit-btn').addClass('save-btn');
    });

    $(document).on('click', '.save-btn', function() {
        var id = $(this).data('todo-id');
        var newTitle = $(this).siblings('.edit-title').val();

        // AJAX request to update the title in the database
        $.post('app/edit.php', {id: id, title: newTitle}, function(response) {
            location.reload(); // Reload the page to reflect changes
        });
    });
});