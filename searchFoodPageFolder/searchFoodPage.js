function populateCards(foodsToDisplay){
    $('.cardContainer').empty();
    console.log(foodsToDisplay);
    
    foodsToDisplay.forEach(foodToDispaly => {
        var newCard = $('#cardTemplate').clone();
        newCard.removeAttr('id');
        newCard.find('.cardTitle').text(foodToDispaly.description);
        newCard.find('.cardBrand').text(foodToDispaly.brandOwner);
        for(var i = 0; i < foodToDispaly.foodNutrients.length; i++){
            if(foodToDispaly.foodNutrients[i].nutrientName === 'Energy'){
                newCard.find('.cardCalories').text(foodToDispaly.foodNutrients[i].value + ' cal');
            }
            if(foodToDispaly.foodNutrients[i].nutrientName === 'Carbohydrate, by difference'){
                newCard.find('.cardCarbs').text('Carbs: ' + foodToDispaly.foodNutrients[i].value + ' g');
            }
            if(foodToDispaly.foodNutrients[i].nutrientName === 'Total lipid (fat)'){
                newCard.find('.cardFats').text('Fats: ' + foodToDispaly.foodNutrients[i].value + ' g');
            }
            if(foodToDispaly.foodNutrients[i].nutrientName === 'Protein'){
                newCard.find('.cardProteins').text('Proteins: ' + foodToDispaly.foodNutrients[i].value + ' g');
            }
        }
        
        $('#cardContainer').append(newCard);
    });
}

$('#searchSubmitButton').on('click', function(event){
    event.preventDefault();
    fetch("https://api.nal.usda.gov/fdc/v1/foods/search?api_key=cAbp5IZWaZWHVPTvYaivWp6zU2XMVWoOg5Pmbhpa&query=" + $('.searchInput').val())
    .then(function(response){
        return response.json();
    }).then(function(data){
        // console.log(data.foods);
        populateCards(data.foods);
    })
    
});

