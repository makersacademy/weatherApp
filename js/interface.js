$(document).ready(function(){
  var citiesApiUrl = "http://weather-api.herokuapp.com/cities";
  var cityApiUrl = "http://weather-api.herokuapp.com/temperature?city=";

  var populateTempData = function() {
    var city = $( "select option:selected" ).val();
    $.ajax({ url: cityApiUrl + city, dataType: 'jsonp'
    }).done(function(data){setPageData(data);});
  };

  var setPageData = function(data){
    $('.temperature').text(data.temp);
    $('img').attr('src', 'images/' + data.outlook + '.svg');
    $( "#icon" ).attr("class", data.outlook);
  };

  var setDropdown = function(city) {
    $('.cities').append(
      $('<option></option>').val(city).html(city + " ⌄"));
      populateTempData();
    };

  $.ajax({url: citiesApiUrl, dataType:'jsonp',
    }).done(function(data) {
      $.each(data.cities, function(index, city) {setDropdown(city);});
    });

  $('.cities').change(function(){populateTempData();});
});