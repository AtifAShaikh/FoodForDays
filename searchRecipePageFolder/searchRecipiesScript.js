
var favoriteFoods = JSON.parse(localStorage.getItem('favoriteFoods'));
if(favoriteFoods === null){
    localStorage.setItem('favoriteFoods', '[]');
    var favoriteFoods = JSON.parse(localStorage.getItem('favoriteFoods'));
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
        newCard.find('a').attr('href', element.recipe.shareAs);

        newCard.find('.addToFavoritesButton').on('click', addRecipeToFavorites)
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


function addRecipeToFavorites(event){
    var myButton = $(event.target);
    var ObjectToAppend = {
        name: myButton.siblings('.cardTitle').text(),
        brand: myButton.siblings('.cardBrand').text(),
        calories: myButton.siblings('.cardCalories').text().split(' ')[0],
        carbs: myButton.siblings('.cardCarbs').text().split(' ')[1],
        fats: myButton.siblings('.cardFats').text().split(' ')[1],
        proteins: myButton.siblings('.cardProteins').text().split(' ')[1],
        ingredients: myButton.siblings('.cardIngredients').text(),
        recipe: myButton.siblings('.recipeLink').attr('href'),
        img: myButton.siblings('img').attr('src')
    }
    console.log(ObjectToAppend);
    favoriteFoods.push(ObjectToAppend);
    localStorage.setItem('favoriteFoods', JSON.stringify(favoriteFoods));
    favoriteFoods = JSON.parse(localStorage.getItem('favoriteFoods'));
    myButton.hide();
}
