function populateCards(foodRecipies){
    $('.cardContainer').empty();
    console.log(foodRecipies);

    foodRecipies.forEach(foodRecipies => {
        var newCard = $('#cardTemplate').clone();
        newCard.removeAttr('id');
        newCard.find('cardTitle').text(foodRecipies.recipies);
        if(foodRecipies.ingredients !== undefined){
            newCard.find('.cardIngredients').text(foodRecipies.ingredients);
        } else {
            newCard.find('cardIngredients').text('');
        }
        if(foodRecipies.calories !== undefined){
            newCard.find('cardCalories').text(foodRecipies.calories);
        } else {
            newCard.find('.cardCalories').text('');
        }
    
        for(var i = 0; i < foodRecipies.ingredients.length; i++){
            

    newCard.find('.cardRecipies').text(foodRecipies.ingredients[i].value + 'recipie');
        }
    
    })
}

// var newCard = $('#cardTemplate').clone();
// console.log(newCard);
// newCard.removeAttr('id');
// newCard.find('#cardTitle').text("test");
// $('#cardContainer').append(newCard);


$('#searchBtn').on('click', function(event){ 
    event.preventDefault();
    fetch("https://api.edamam.com/search?&app_id=44f2b9d4&app_key=ac4ec459f3abc1bda1d6460e24ee8c18" + $('.searchInput').val())
    .then(function(response){
        return response.json();
}).then(function(data){
    console.log(data.search);
    populateCards(data.search);
})
});
// fetch("https://api.edamam.com/search?q=chicken&app_id=44f2b9d4&app_key=ac4ec459f3abc1bda1d6460e24ee8c18")
//     .then(function(response){
//     return response.json();
// }).then(function(data){
//     console.log(data.hits);
// })

