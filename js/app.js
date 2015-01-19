
$(document).ready(function(){

    myKey = "AIzaSyAvY8gw_9m9K4kfUbASjxJWcgzVjkwImcQ";


    technique ="";

    lastResponse='';


    $('.search')

        .on('click', function(){

            $('#response').empty();

            technique = $('input').val();
            if (technique != '') {

                searchOnTechnique(technique);
                
                $('input').val(''); /* clear the field value */
            }

            else {alert('Technique cannot be blank');}

            

        });  /* end on click function */


    $('.next')

        .on('click', function(){

        $('#response').empty();

        
        searchOnToken(lastResponse.nextPageToken);  

        });  /* end on click function */



    $('.prev')

        .on('click', function(){

        $('#response').empty();

        
        searchOnToken(lastResponse.prevPageToken);

        });  /* End on click function */


});   /* end on document ready function */


/* Called automatically when JavaScript client library is loaded. */

function onClientLoad() {
        
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad); 
    };   


function onYouTubeApiLoad() {

    gapi.client.setApiKey(myKey); 
    
    };


/* Called automatically with the response of the YouTube API request. */

function onSearchResponse(response) {

    lastResponse = response;
   
    showResponse(response);
};


/* Helper function to display JavaScript value on HTML page. */
function showResponse(response) {
      
  /* var sResponse = JSON.stringify(response, '', 2);
  console.log(sResponse); 

  Keeping for future reference */

  var link, title, description, i;
   
     
    $(".page").css("display","inline-block");
    for (i = 0; i< response.items.length; i++) 
        {
            link = response.items[i].id.videoId
            title = response.items[i].snippet.title;

            description = response.items[i].snippet.description;

            if (! description) {
                description = "No description provided by You Tube";

            }

          
        $('#response').append('<dt>' + '<a href="http://www.youtube.com/watch?v=' + link +'" target="_blank">' + title + "</a>" + '<dt>');
     
        $('#response').append('<dd>' + description + '</dd>');

        }

    };



function searchOnToken(token) 
    {

    var request = gapi.client.youtube.search.list({
            dataType: "JSONP",
            pageToken: token,  
            part: 'id, snippet',
            maxResults: '10',
            order: 'viewCount',
            q: technique,
            regionCode: 'US',
           
        });

    request.execute(onSearchResponse);
    };


function searchOnTechnique(technique)
{

var request = gapi.client.youtube.search.list({
        dataType: "JSONP",
        part: 'id, snippet',
        maxResults: '10',
        order: 'viewCount',
        q: technique,
        regionCode: 'US',
   
    });

    request.execute(onSearchResponse);

};



