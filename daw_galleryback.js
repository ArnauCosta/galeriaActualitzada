$(document).ready(function () {

    $.get("/imatges/imatges.php.txt", function (data) {
        var lines = data.split("\n");
        for (var i = 0, len = lines.length; i < len; i++) {

            var extensio = lines[i].split(".")[1].trim();
            switch (extensio) {
                case "jpg":
                case "png":
                    var imatgeNova = $('<img src="imatges/thumbs/' + lines[i] + '" data-type="imatge" class="img200">');
                    $("#imatges").append(imatgeNova);
                    break;

                case "avi":
                case "mp4":
                    var nom = lines[i].split(".")[0].trim();

                    existeixImatgeIOmple('/imatges/thumbs/' + lines[i].split(".")[0].trim() + '.jpg', lines[i])

                    break;

                case "mp3":
                case "wav":
                    var audioNou = $('<img src="imatges/thumbs/audio.jpg" data-type="audio" data-src="' + lines[i] + '" class="img200">');
                    $("#imatges").append(audioNou);
                    break;
            }

        }
    }).done(function () {
        $('.img200').hover(function () {
            $('.img200').removeClass('thumb-rollover');
            $(this).addClass('thumb-rollover');
        });


        $('.img200').click(function () {
            $('.img200').removeClass('border');
            $(this).addClass('border');
        });

        $('.img200').click(function () {

            $("#detall").addClass('modal');
            $("#detall").css('display', "unset");
            switch ($(this).data('type')) {
                case "imatge":
                    $("#main-image").show();
                    $("#audio").hide();
                    $("#video").hide();
                    var nomSplit = $(this).attr("src").split("/");
                    $('#main-image').attr("src", "imatges/img1000/" + nomSplit[nomSplit.length - 1]);
                    $('#titol').text((nomSplit[nomSplit.length - 1]).split('.')[0]);
                    break;

                case "video":

                    break;

                case "audio":
                    $("#audio").show();
                    $("#main-image").show();
                    $("#video").hide();
                    $('#main-image').attr("src", "imatges/thumbs/audio.jpg");
                    $('#titol').text(($(this).data('src')).split('.')[0]);
                    $("#audio").attr("src", "/imatges/audio/" + $(this).data('src'));
                    break;
            }
            $("#main-image").addClass('center');
            $("#modal-controller").addClass('center');

        });

        $('#close').click(function () {
            $("#detall").removeClass('modal');
            $("#detall").css('display', "none");
            $("#main-image").removeClass('center');
            $("#modal-controller").removeClass('center');
        });

        $('#next').click(function () {
            var posibleSeguent = $(".border").next();
            if (posibleSeguent.length == 0) {
                posibleSeguent = $(".border").siblings('img').first();
                var nomSplit = $(posibleSeguent).attr("src").split("/");
                $('#main-image').attr("src", "imatges/img1000/" + nomSplit[nomSplit.length - 1]);
                $('#titol').text((nomSplit[nomSplit.length - 1]).split('.')[0]);
                $('.img200').removeClass('border');
                posibleSeguent.addClass("border");
            } else {
                var nomSplit = $(posibleSeguent).attr("src").split("/");
                $('#main-image').attr("src", "imatges/img1000/" + nomSplit[nomSplit.length - 1]);
                $('#titol').text((nomSplit[nomSplit.length - 1]).split('.')[0]);
                $('.img200').removeClass('border');
                posibleSeguent.addClass("border");
            }
        });

        $('#prev').click(function () {
            var posibleSeguent = $(".border").prev();
            if (posibleSeguent.length == 0) {
                posibleSeguent = $(".border").siblings('img').last();
                var nomSplit = $(posibleSeguent).attr("src").split("/");
                $('#main-image').attr("src", "imatges/img1000/" + nomSplit[nomSplit.length - 1]);
                $('#titol').text((nomSplit[nomSplit.length - 1]).split('.')[0]);
                $('.img200').removeClass('border');
                posibleSeguent.addClass("border");
            } else {
                var nomSplit = $(posibleSeguent).attr("src").split("/");
                $('#main-image').attr("src", "imatges/img1000/" + nomSplit[nomSplit.length - 1]);
                $('#titol').text((nomSplit[nomSplit.length - 1]).split('.')[0]);
                $('.img200').removeClass('border');
                posibleSeguent.addClass("border");
            }
        });
    });

    function existeixImatgeIOmple(url, linia) {
        $.ajax({
            url: url,
            error: function () {
                var audioNou = $('<img src="imatges/thumbs/video.png" data-type="video" data-src="' + linia + '" class="img200">');

                $("#imatges").append(audioNou);
            },
            success: function () {
                var audioNou = $('<img src="imatges/thumbs/' + linia.split(".")[0].trim() + '.jpg" data-type="video" data-src="' + linia + '" class="img200">');
                $("#imatges").append(audioNou);
            }
        });
    }

});

