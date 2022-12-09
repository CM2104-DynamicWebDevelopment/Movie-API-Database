$(function(){

    const getPoster = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2'

    // document ready
    //alert("ready")

    getApiData()
    


    function getApiData(){
        //url to be used 

        var url = "https://api.themoviedb.org/3/movie/upcoming?api_key=3769b2b9e06f3f0431a9bd6b7d46575e&language=en-US&page=1";

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
            var title = jsondata.results[i].original_title;
            var poster = jsondata.results[i].poster_path
            
            var year = jsondata.results[i].release_date
            






            // for (var j =0; j<4;j++){
            //     var poster = title.Poster
            //     var tit = title.Title
            //     var year = title.Year
                
                
            // } 
            
            hString +="<div>"+ '<img ' + 'src = "'+getPoster+ poster+ '"' +'>'+"<p>"+title+"</p>"+ "<p>"+ year+"</p>"+"</div>"

            
            


        }
        console.log(hString)


        $("#results").html(hString)

    }
   




});
