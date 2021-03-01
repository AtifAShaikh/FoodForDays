var favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
if(favoriteRecipes === null){
    localStorage.setItem('favoriteRecipes', '[]');
    var localStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
}

function populateCards(recipes){
    $('.cardContainer').empty();
    recipes.forEach(element => {
        var newCard = $('#cardTemplate').clone();
        newCard.removeAttr('id');
        newCard.find('.cardTitle').text(element.recipe.label)
        var ingredientList = '';
        element.recipe.ingredientLines.forEach(element => {
            ingredientList += element + ', ';
        });
        // newCard.find('cardRecipieLink').attr('src', element.recipe.url);
        newCard.find('.cardIngredients').text(ingredientList);
        newCard.find('.cardCalories').text(Math.round(element.recipe.totalNutrients.ENERC_KCAL.quantity/element.recipe.yield) + ' cal');
        newCard.find('.cardCarbs').text("Carbs: " + Math.round(element.recipe.totalNutrients.CHOCDF.quantity/element.recipe.yield) + ' g');
        newCard.find('.cardFats').text("Fats: " + Math.round(element.recipe.totalNutrients.FAT.quantity/element.recipe.yield) + ' g');
        newCard.find('.cardProteins').text("Proteins: " + Math.round(element.recipe.totalNutrients.PROCNT.quantity/element.recipe.yield) + ' g');
        newCard.find('img').attr('src', element.recipe.image);

        newCard.find('addToFavoritesButton').on('click', addToFavorites)
        $('.cardContainer').append(newCard);
    });
    
}


$('#searchBtn').on('click', function(event){ 
    event.preventDefault();
    var searchQ = $('.recipeInput').val()
    fetch("https://api.edamam.com/search?q="+ searchQ +"&app_id=44f2b9d4&app_key=ac4ec459f3abc1bda1d6460e24ee8c18")
    .then(function(response){
        return response.json();
    }).then(function(data){
        console.log(data.hits);
        populateCards(data.hits);
    })
});



function addToFavorites(event){
    var favBtn = $(event.target);
    var object = {
        name: favBtn.siblings('.cardTitle').text(),
        calories: favBtn.siblings('.cardCalories').text(),

    }
    favoriteRecipes.push(object);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    favBtn.hide();
    console.log(favoriteRecipes);
}



