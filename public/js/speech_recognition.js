window.onload = function () {
    window.ya.speechkit.settings.apikey = 'efe49eed-0ce0-4482-8c14-0cf141204bd9';

    var recognition = new ya.speechkit.SpeechRecognition();

    $('#say').bind('click', function () {
        recognition.start({
            initCallback: function () {
                $('#text_field').html(' ');
                console.log('Началась запись звука.');
            },
            dataCallback: function (text, done, merge, words, biometry) {
                if (done) {
                    console.log("Анализ речи: ");
                    $.each(biometry, function (j, bio) {
                        console.log(" Характеристика: " + bio.tag + " Вариант: " + bio.class +
                        " Вероятность: " + bio.confidence.toFixed(3));
                    });
                    $('#text_field').append(text);
                }
            },
            errorCallback: function (err) {
                console.log('Возникла ошибка ' + err);
            },
            stopCallback: function () {
                console.log('Запись звука остановлена.');
            },
            utteranceSilence: 60,
            punctuation: true,
            model: 'notes',
            biometry: 'gender, group, language'

        });
        $('#say').prop('disabled', true);
        $('#pause').prop('disabled', false);
        $('#stop').prop('disabled', false);
    });

    $('#pause').bind('click', function () {
        recognition.pause();
        $('#say').prop('disabled', false);
        $('#pause').prop('disabled', true);
        $('#say').val('Возобновить диктовку записи');
    });

    $('#stop').bind('click', function () {
        recognition.stop();
        $('#say').val('Начать диктовку записи');
        $('#say').prop('disabled', false);
        $('#pause').prop('disabled', true);
        $('#stop').prop('disabled', true);
    });
}