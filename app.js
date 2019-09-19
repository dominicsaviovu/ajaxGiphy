$(document).ready(function () {

  var games = [
    "Pokemon", "Final Fantasy", "Super Mario", "Gears of War", "Metal Gear Solid", "Leauge of Legends",
    "Counter Strike", "Overwatch", "Rainbow 6 Siege"
  ];

  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }

  }

  $(document).on("click", ".games-button", function () {
    $("#games").empty();
    $(".games-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=EveN4ETJWkrL2znGuJCs1YJk7xix6JZQ&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gamesDiv = $("<div class=\"games-item\">");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          var gamesImage = $("<img>");
          gamesImage.attr("src", still);
          gamesImage.attr("data-still", still);
          gamesImage.attr("data-animate", animated);
          gamesImage.attr("data-state", "still");
          gamesImage.addClass("games-image");

          gamesDiv.append(p);
          gamesDiv.append(gamesImage);

          $("#games").append(gamesDiv);
        }
      });
  });

  $(document).on("click", ".games-image", function () {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-games").on("click", function (event) {
    event.preventDefault();
    var newGames = $("input").eq(0).val();

    if (newGames.length > 2) {
      games.push(newGames);
    }

    populateButtons(games, "games-button", "#games-buttons");

  });

  populateButtons(games, "games-button", "#games-buttons");
});
