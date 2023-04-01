$(function(){
    const posterURL = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2'
    tgetApiData(1)
    $("#tgetfotm").submit(function() {
        //search bar value
        var tpageNum = $("#tpageNum").val();
        //calling the api function
        tgetApiData(tpageNum)
        //stops the page from refershing
        return false
        
    
    })

   
    

    function tgetApiData(tpageNum){
        //url for themovieDatabase 
        
        var page = "page=" + tpageNum

        var url = "https://api.themoviedb.org/3/trending/all/day?api_key=3769b2b9e06f3f0431a9bd6b7d46575e&language=en-US&" + page;

        //use jquery json shortcut

        $.getJSON(url, function(jsondata){
            
            tprintJSON(jsondata)
            console.log(tpageNum)


        })
       
        



    }


    function tprintJSON (jsondata){
        //string to contain the html code to inject
        tpageNum = "The amount of pages is "+ jsondata.total_pages + ' enter the desired page number.'
        $("#tamount").html(tpageNum)

        var hString = "";
        for (var i=0; i<10; i++){
            var title = jsondata.results[i].original_title;
            var poster = jsondata.results[i].poster_path
            
            var year = jsondata.results[i].release_date
            var id = jsondata.results[i].id
            var overview = jsondata.results[i].overview
            var date = new Date(year).getTime()
            var vote  = jsondata.results[i].vote_average
            var voteC  = jsondata.results[i].vote_count
            
            
            
    
            
            hString +="<div class = 'tresultM'>"+ '<img class = "tposterImage" ' + 'src = "'+posterURL+ poster+ '"' +'>'
            +"<p class = 'ttitle'>"+title+"</p>"+ '<p class = "tmDesc">'+overview+'</p>'+
            "<p  id ='tvote'>"+'Rating '+vote+'<span>&#11088;</span>'+'<br>'+voteC+' votes'+"</p>"+"</div>"
            


            

            

            }
        
        


        $("#trending").html(hString)
    }

   












})