$(function(){

    // document ready
    //alert("ready")

    $("#searchform").submit(function() {
        var searchTearms = $("#searchterms").val();
        getApiData(searchTearms)
        return false
        
    
    })
    


    function getApiData(searchTearms){
        //url to be used 

        var url = "http://www.omdbapi.com/?apikey=[c4bea658]&" + searchTearms;

        //use jquery json shortcut

        $.getJSON(url, function(){
            print(jsondata)


        })
        console.log("hello")



    }


    function printJSON (jsondata){

        var normal = JSON.stringify(jsondata);
        $('#resultsbox').append("<p>"+normal+"</p>")

    }
   




});
