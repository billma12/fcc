$(document).ready(function(){
	$("#articles").hide();
	$("#error").hide();
	$(document).keyup(function (e) {
    if ($(".input:focus") && (e.keyCode === 13)) {
       getInput();
    }
 	});
});

function getInput(){
	var input = $("#input").val();
    var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=5&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    var cb = '&callback=JSON_CALLBACK';
    var page = 'https://en.wikipedia.org/?curid=';

    var wikiResults = {title:[],
    				  extract:[],
    				  url:[],
    				  thumbnail:[]
    				};
	$.ajax({
	   type: 'GET',
	    url: api+input+cb,
	    async: false,
	    contentType: "application/json",
	    dataType: 'jsonp',
	    success: function(res) {
       		if(res.query === undefined){
       			$("#error").html("There are no articles matching: " + input);
       			$("#error").show();
       			return 0;
       		}
       		else{
       			$("#error").hide();
       		}	

       		var result = res.query.pages;

      	 	$.each(result,function(v,k){
      	 		wikiResults.title.push(k.title);
      	 		wikiResults.extract.push(k.extract);
      	 		wikiResults.url.push(page + k.pageid);
      	 		wikiResults.thumbnail.push(k.thumbnail);	 		
	       	});

	      	for(var i=1; i<=5;i++){
	      		$("#title"+i).html(wikiResults.title[i-1]);
	      		$("#extract"+i).html(wikiResults.extract[i-1]);
	      		$("#a"+i).attr("href", wikiResults.url[i-1]);
	      		if(wikiResults.thumbnail[i-1] !== undefined){
	      			if(wikiResults.thumbnail[i-1].width < 100){
	      				var biggerPic = wikiResults.thumbnail[i-1].source.replace(wikiResults.thumbnail[i-1].width + "px","100px");
	      			}
	      		 	$("#img"+i).attr("src", biggerPic);
	      		}
	      		else{
	      			$("#img"+i).attr("src", "#");
	      		}
	      		console.log(wikiResults.thumbnail[i-1]);
	       	}
	       	$("#articles").show(300);
	    },
	    error: function(e) {
	       console.log(e.message);
	    }
	});
}
