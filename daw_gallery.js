jQuery.fn.arnaugallery = function () {
  var test = "4";

  this.append(`
    <div id="imatges" class="flex">
    </div>
    
    <h1 id="image-title"></h1>

    <div id="detall" style="display: none;">
        <h1 id="titol">test</h1>
        <div class="content">
            <img id="main-image" src="">

            <video style="display: none;" class="video" id="video" controls autoplay>
                <source src="/imatges/video/COSTARICA4K.mp4" type="video/mp4">
                <p>El teu navegador no soporta video</p>
            </video>

            <audio style="display: none;" class="audio" id="audio" src="" controls autoplay loop>
                <p>El teu navegador no soporta audio</p>
            </audio>
        </div>
        <div id="modal-controller">
            <a class="botoCancela" id="close">close</a>
            <a class="botoNav" id="prev">prev</a>
            <a class="botoNav" id="next">next</a>
        </div>
    </div>
    `);

  $.get("/imatges/imatges.php.txt", function (data) {
    var lines = data.split("\n");
    for (var i = 0, len = lines.length; i < len; i++) {
      var extensio = lines[i].split(".")[1].trim();
      switch (extensio) {
        case "jpg":
        case "png":
        case "gif":
          var imatgeNova = $(
            '<img src="imatges/thumbs/' +
              lines[i] +
              '" data-type="imatge" class="img200">'
          );
          $("#imatges").append(imatgeNova);
          break;

        case "avi":
        case "mp4":
        case "webm":
          var nom = lines[i].split(".")[0].trim();

          existeixImatgeIOmple(
            "/imatges/thumbs/" + lines[i].split(".")[0].trim() + ".jpg",
            lines[i]
          );

          break;

        case "mp3":
        case "wav":
          var audioNou = $(
            '<img src="imatges/thumbs/audio.jpg" data-type="audio" data-src="' +
              lines[i] +
              '" class="img200">'
          );
          $("#imatges").append(audioNou);
          break;
      }
    }
  }).done(function () {
    afegeixEventListener();

    $("#close").click(function () {
      pause();
      $("#detall").removeClass("modal");
      $("#detall").css("display", "none");
      $("#main-image").removeClass("center");
      $("#modal-controller").removeClass("center");
    });

    $("#next").click(function () {
      pause();
      var posibleSeguent = $(".border").next();
      if (posibleSeguent.length == 0) {
        posibleSeguent = $(".border").siblings("img").first();
        posibleSeguent.trigger("click");
      } else {
        posibleSeguent.trigger("click");
      }
    });

    $("#prev").click(function () {
      pause();
      var posibleSeguent = $(".border").prev();
      if (posibleSeguent.length == 0) {
        posibleSeguent = $(".border").siblings("img").last();
        posibleSeguent.trigger("click");
      } else {
        posibleSeguent.trigger("click");
      }
    });
  });

  function afegeixEventListener() {
    $(".img200").hover(function () {
      $(".img200").removeClass("thumb-rollover");
      $(this).addClass("thumb-rollover");
    });

    $(".img200").click(function () {
      $(".img200").removeClass("border");
      $(this).addClass("border");
    });

    $(".img200").click(function () {
      $("#detall").addClass("modal");
      $("#detall").css("display", "unset");
      switch ($(this).data("type")) {
        case "imatge":
          $("#main-image").show();
          $("#audio").hide();
          $("#video").hide();
          var nomSplit = $(this).attr("src").split("/");
          $("#main-image").attr(
            "src",
            "imatges/img1000/" + nomSplit[nomSplit.length - 1]
          );
          $("#titol").text(nomSplit[nomSplit.length - 1].split(".")[0]);
          break;

        case "video":
          $("#audio").hide();
          $("#main-image").hide();
          $("#video").show();
          $("#titol").text($(this).data("src").split(".")[0]);
          $("#video source").attr(
            "src",
            "/imatges/video/" + $(this).data("src")
          );
          $("#video").trigger("load");
          $("#video").trigger("play");
          break;

        case "audio":
          $("#audio").show();
          $("#main-image").show();
          $("#video").hide();
          $("#main-image").attr("src", "imatges/thumbs/audio.jpg");
          $("#titol").text($(this).data("src").split(".")[0]);
          $("#audio").attr("src", "/imatges/audio/" + $(this).data("src"));
          break;
      }
      $("#main-image").addClass("center");
      $("#modal-controller").addClass("center");
    });
  }

  function pause() {
    $("#video").trigger("pause");
    $("#audio").trigger("pause");
  }

  function existeixImatgeIOmple(url, linia) {
    $.ajax({
      url: url,
      error: function () {
        var audioNou = $(
          '<img src="imatges/thumbs/video.png" data-type="video" data-src="' +
            linia +
            '" class="img200">'
        );
        $("#imatges").append(audioNou);
      },
      success: function () {
        var audioNou = $(
          '<img src="imatges/thumbs/' +
            linia.split(".")[0].trim() +
            '.jpg" data-type="video" data-src="' +
            linia +
            '" class="img200">'
        );
        $("#imatges").append(audioNou);
      },
    }).done(function () {
      afegeixEventListener();
      pause();
    });
  }

  return this;
};
