 //Assign HTML elements to variables
 var animalButtonsList = $("#animalButtons");
 var animalForm = $("#animal-form");
 var addAnimalButton = $("#addAnimal");
 var animalsDiv = $("#animals");

//Set up the necessary query URL and empty array for pushing search terms
var partialQueryURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=";


//When document is ready, make add animal button clickable
 $(document).ready(function(){
 	addAnimalButton.on("click", function(){



 	})
})



var queryURL = partialQueryURL + searchTag;


$.ajax({url: queryURL, method: 'GET'}).done(function(response){
	
	console.log(queryURL);
	console.log(response);
	console.log(response.Runtime);



	 var imageTag = $("<img>");
	 imageTag.attr("src", imageURL)


	 animalsDiv.append(imageTag)


})     

