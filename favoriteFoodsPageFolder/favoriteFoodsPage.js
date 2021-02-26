var favoriteFoods = JSON.parse(localStorage.getItem('favoriteFoods'));
    console.log(favoriteFoods)

    
for(var i = 0; i<favoriteFoods.length; i++){
    var newCard = $('#templateCard').clone();
    newCard.removeAttr('id'); 
    newCard.find(".nameText").text(favoriteFoods[i].name);
    newCard.find(".nameBrand").text(favoriteFoods[i].brand);
    console.log(favoriteFoods[i].name);

    $('.cardHolder').append(newCard);
}

