$(function(){

    // document ready
    //alert("ready")

    $("#searchform").submit(function() {
        //search bar value
        var searchTearms = $("#searchterms").val();
        //calling the api function
        getApiData(searchTearms)
        //stops the page from refershing
        return false
        
    
    })
    


    function getApiData(searchTearms){
        //url to be used 

        var url = "http://www.omdbapi.com/?apikey=c4bea658&s=" + searchTearms;

        //use jquery json shortcut

        $.getJSON(url, function(jsondata){
            console.log(jsondata)
            printJSON(jsondata)


        })
        



    }


    function printJSON (jsondata){
        //string to contain the html code to inject

        var hString = "";
        for (var i=0; i<10; i++){
            var title = jsondata.Search[i].Title;
            hString +="<li>"+title+"</li>"


        }
        $("#results").html(hString)

    }
   




});