function getYelp(response){
    var yelp_results = $("#yelpResult");
    event.preventDefault()
    var corsProxy = "https://cors-anywhere.herokuapp.com/";
    var location = response[0]
    var apiUrl = "https://api.yelp.com/v3/businesses/search?term="+"landmarks"+"&location=" + location +  "&limit=10&raiuds=4000"
    var url = corsProxy + apiUrl;
    var counter = 0;
$.ajax({
    url: url,
    type: 'GET',
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'bearer F1OM2kFNZkqs4niwnlVnOH-yiiR8oIiy4zv5uj9qW5PesB9PQTCt4RSSh9g3TyS7CzHMGrnz-1p7WCqPowHlkawoFr29PRlN4ZyYZ_8kMedEZmf4xXintU_T5TC1WnYx')
    
    }
      })
     .then(function(data) {
         var results = data.businesses;
         var p = $("<h4>");
         p.text("Landmarks Available");
         p.css('color', 'black');
         yelp_results.append(p);
        for(var i=0; i < 5; i++) {
            var searchResults = $("<div class='row'>");
            var firstCol = $("<div class='col'>");
            var secondCol = $("<div class='col'>");
            searchResults.css('background-color', 'rgba(54, 162, 235, 0.2)');
            var list = $("<img>");
            list.addClass("ml-3");
            list.addClass("mt-2");
            list.addClass("img-fluid");
            list.addClass("rounded");
            var info = $("<p>");
            info.attr('class','font-weight-bold');
            var address = $("<p>");
            var add = results[i].location.address1+", "+results[i].location.city+", "+results[i].location.state+", "+results[i].location.zip_code;   
            list.attr("src", results[i].image_url)
            var name = results[i].name;
            info.text(name);
            address.text(add);
            firstCol.append(list);
            secondCol.append(info);
            secondCol.append(address);
            searchResults.append(firstCol);
            searchResults.append(secondCol);
         yelp_results.append(searchResults);
         counter++;
        }       
    })

}