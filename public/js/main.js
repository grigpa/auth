window.onload = function() {
    $('#submitBtnRegister').click( function() {
        $.ajax({
            url: '/register',
            type: 'post',
            dataType: 'json',
            data: $('form#registerForm').serialize(),
            success: function(data) {
                window.location.href='/';
            }
        });
    });
}


