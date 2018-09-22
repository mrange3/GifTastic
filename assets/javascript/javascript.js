
var topics = ["Michael Jordan", "Barry Sanders", "LeBron James", "Wayne Gretzsky", "Kobe Bryant", "Leo Messi", "Sidney Crosby", "Christiano Ronaldo", "Aaron Rodgers",]

for (i = 0; i < topics.length; i++) {
  var button = $("<button>").attr("id", topics[i]).text(topics[i]).addClass("gif-button mb-2 btn-dark ml-2 mr-2")

  $(".button-area").append(button)
}


$(".button-area").on("click", "button.gif-button", function () {
  var animal = $(this).attr("id");
  console.log(animal)

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      console.log(queryURL);

      console.log(response);
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>").addClass("gif-box pt-2 pl-2");
        var p = $("<p>").text("Rating: " + results[i].rating);
        p.addClass("m-0")

        var sportsGif = $("<img>").addClass("gif");
        sportsGif.attr("src", results[i].images.fixed_height_still.url);
        sportsGif.attr("data-animate", results[i].images.fixed_height.url);
        sportsGif.attr("data-still", results[i].images.fixed_height_still.url);
        sportsGif.attr("data-state", "still");
        console.log(results[i]);

        gifDiv.append(sportsGif);
        gifDiv.append(p);

        $(".gif-spot").prepend(gifDiv);
      }
    });
});


//============================= Button Creation =============================================

$("#submit").on("click", function (event) {
  event.preventDefault();

  var newButton = $("#add-gif").val().trim()
  var button = $("<button>").attr("id", newButton).text(newButton).addClass("gif-button btn-dark ml-2 mr-2")

  $(".button-area").append(button)
  $("#form")[0].reset()
});

//====================================Pause Gif=============================================

$(".gif-spot").on("click", "img", function () {
  console.log("hello")
  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
