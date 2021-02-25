function populateCards(foodRecipies){
    $('.cardContainer').empty();
    console.log(foodRecipies);

    foodRecipies.forEach(foodRecipies => {
        var newCard = $('#cardTemplate').clone();
        newCard.removeAttr('id');
        newCard.find('macros').text(foodRecipies.digest);
        newCard.find('calories').text(foodRecipies.calories);
        for(var i = 0; i < foodRecipies.ingredients.length; i++){
            

    newCard.find('.cardRecipies').text(foodRecipies.ingredients[i].value + 'recipie')
        }
    })
}

var newCard = $('#cardTemplate').clone();
console.log(newCard);
newCard.removeAttr('id');
newCard.find('#cardTitle').text("test");
$('#cardContainer').append(newCard);



fetch("https://api.edamam.com/search?q=chicken&app_id=44f2b9d4&app_key=ac4ec459f3abc1bda1d6460e24ee8c18")
    .then(function(response){
    return response.json();
}).then(function(data){
    console.log(data.hits);
})

