 //Assign HTML elements to variables
 var animalButtonsList = $("#animalButtons");
 var animalInput = $("#animal-input");
 var addAnimalButton = $("#addAnimal");
 var gifDiv = $("#animals");


 	//When animal button is clicked...
 	addAnimalButton.on("click", function(){

 		//Animal becomes the string that was typed in
    	var animal = animalInput.val();		
    	console.log(animal);

    	//Generate a new button with the attribute "data-animal", bootstrap classes and text containing the search terms
    	var newButton = $("<button>");
    	newButton.attr("data-animal", animal);
    	newButton.addClass("btn btn-primary");
    	newButton.html(animal);

    	animalButtonsList.append(newButton);


	 	//When any button tag is clicked...
	 	$("button").on("click", function(){
	 		console.log("it works");

	 		//The search terms are set to the data-animal value set in the addAnimalButton button
			var animalSearch = $(this).data('animal');
	 		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animalSearch + "&api_key=dc6zaTOxFJmzC&limit=12";


			$.ajax({url: queryURL, method: 'GET'}).done(function(response){
				
				console.log(queryURL);
				console.log(response);

				var results = response.data;

				for (i=0; i<results.length; i++){

					var animalDiv = $("<div>");

					//Make a paragraph tag and populate it with rating
				    var p = $("<p>");
				   	p.text("Rating: " + results[i].rating);

				   	//Make an image tag and give it src, data-state, data-still and data-animate attributes
					var imageTag = $("<img>");
					imageTag.attr("src", results[i].images.fixed_height_still.url);
					imageTag.attr("data-still", results[i].images.fixed_height_still.url);
					imageTag.attr("data-animate", results[i].images.fixed_height.url);


					//Append both rating and the gif to the page
					animalDiv.append(p);
					animalDiv.append(imageTag);
					animalDiv.addClass("adjustGif");

					gifDiv.prepend(animalDiv);

				}

				//Toggle for playing and stopping the gif animation
				$("img").on("click", function(){
					var state = $(this).attr("data-state");

					if (state == 'still'){
						$(this).attr('src', $(this).data('animate'));
						$(this).attr('data-state', 'animate');
					}
					else{
						$(this).attr('src', $(this).data('still'));
						$(this).attr('data-state', 'still');
					}
				})
			})     
	 	})
 	})







