var favoriteFoods = JSON.parse(localStorage.getItem('favoriteFoods'));
if(favoriteFoods === null){
    localStorage.setItem('favoriteFoods', '[]');
    var favoriteFoods = JSON.parse(localStorage.getItem('favoriteFoods'));
}


function populateCards(foodsToDisplay){
    $('.cardContainer').empty();
    console.log(foodsToDisplay);

    
    foodsToDisplay.forEach(foodToDispaly => {
        var newCard = $('#cardTemplate').clone();
        newCard.removeAttr('id');
        newCard.find('.cardTitle').text(foodToDispaly.description);
        if( foodToDispaly.brandOwner !== undefined){
            newCard.find('.cardBrand').text(foodToDispaly.brandOwner);
        } else {
            newCard.find('.cardBrand').text('');
        }
        if(foodToDispaly.ingredients !== undefined){
            newCard.find('.cardIngredients').text(foodToDispaly.ingredients);
        } else {
            newCard.find('.cardIngredients').text('');
        }
        
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
        newCard.find('.addToFavoritesButton').on('click', addToFavorites)
        $('#cardContainer').append(newCard);
    });
    $('#footer').removeAttr('id');
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

// $('.addToFavoritesButton').on('click', function(event){
//     event.preventDefault();
//     console.log('got button');
// });

function addToFavorites(event){
    var myButton = $(event.target);
    var ObjectToAppend = {
        name: myButton.siblings('.cardTitle').text(),
        brand: myButton.siblings('.cardBrand').text(),
        calories: myButton.siblings('.cardCalories').text().split(' ')[0],
        carbs: myButton.siblings('.cardCarbs').text().split(' ')[1],
        fats: myButton.siblings('.cardFats').text().split(' ')[1],
        proteins: myButton.siblings('.cardProteins').text().split(' ')[1],
        ingredients: myButton.siblings('.cardIngredients').text(),
        recipe: '',
        img: ''
    }
    // console.log(myButton.siblings('.cardCalories').text().split(' ')[0]);
    favoriteFoods.push(ObjectToAppend);
    localStorage.setItem('favoriteFoods', JSON.stringify(favoriteFoods));
    favoriteFoods = JSON.parse(localStorage.getItem('favoriteFoods'));
    myButton.hide();
    console.log(favoriteFoods);
}

