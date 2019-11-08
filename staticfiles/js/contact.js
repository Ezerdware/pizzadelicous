$('document').ready(function () {
    $('#contactBtn').click(function () {
        const contactName = $('#contactName').val();
        const contactEmail = $('#contactEmail').val();
        const contactSubject = $('#contactSubject').val();
        const contactMessage = $('#contactMessage').val();
        if (contactName === '' || contactEmail === '' || contactSubject === '' || contactMessage === '') {

            alert('Fields should not be empty!');
        } else {
            const contactInfo = {
                contactName: contactName,
                contactEmail: contactEmail,
                contactSubject: contactSubject,
                contactMessage: contactMessage
            };
            $.ajax({
                type: 'POST',
                url: '/contact',
                data: contactInfo,
                success: function (data) {
                    alert(data);
                }
            });

            $('#contactName').val('');
            $('#contactEmail').val('');
            $('#contactSubject').val('');
            $('#contactMessage').val('');

        }
    });
});