
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $("#street").val();
    var cityStr = $("#city").val();
    var address = streetStr + ", " + cityStr;

    $greeting.text("So, you want to live at " + address + "?");

    var streetviewURL = "https://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + address + "";

    $body.append('<img class="bgimg" src="' + streetviewURL + '">');

    //NY Times Ajax request
    var nytimesURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=8eb3c7b101344c1e9c576b93c9fa3ca6'

    $.getJSON(nytimesURL, function(data) {

        $nytHeaderElem.text('New York Times Article About ' + cityStr);

        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' +
                '<a href="'+ article.web_url +'">'+article.headline.main+
                '</a>' +
                '<p>' + article.snippet + '</p>'+
                '</li>');
        };
    }).error(function(e) {
        $nytElemHeader.text("New Your Times Article Could Not Be Loaded");
    });

    //Wikipedia AJAX request
    var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';

    $.ajax({
        url: wikiURL,
        dataType: "jsonp",
        // jsonp: "callback",
        success: function(response) {
            var articleList = response[1];

            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');

            };
        }
    })

    return false;
};

$('#form-container').submit(loadData);
