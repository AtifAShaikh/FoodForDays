var favoriteFoods = JSON.parse(localStorage.getItem('favoriteFoods'));
    console.log(favoriteFoods)

    
for(var i = 0; i<favoriteFoods.length; i++){
    var newCard = $('#templateCard').clone();
    newCard.removeAttr('id'); 
    newCard.find(".nameText").text(favoriteFoods[i].name);
    newCard.find(".nameBrand").text(favoriteFoods[i].brand);
    console.log(favoriteFoods[i].name);
    newCard.attr("listIndex", i);

    $('.cardHolder').append(newCard);
}

$('.cardHolder').on("click", ".card", function(){
   var foodIndex= $(this).attr("listIndex");
   console.log(foodIndex);
   console.log(favoriteFoods[foodIndex]);
   $("#foodName").text(favoriteFoods[foodIndex].name);
   $("#foodCalories").text(favoriteFoods[foodIndex].calories);
   $("#foodFats").text(favoriteFoods[foodIndex].fats);
   $("#foodCarbs").text(favoriteFoods[foodIndex].carbs);
   $("#foodProteins").text(favoriteFoods[foodIndex].proteins);
   $("#foodRecipe").text(favoriteFoods[foodIndex].recipe);
   $("#foodIngredients").text(favoriteFoods[foodIndex].ingredients);
   $('.removeButton').attr('listIndex', foodIndex);
})

$('.foodInfo').on("click", ".btn", function(){
    var indexToRemove = $(this).attr('listIndex');
    console.log(indexToRemove);
    favoriteFoods.splice(indexToRemove, 1);
    localStorage.setItem('favoriteFoods', JSON.stringify(favoriteFoods));
    favoriteFoods = JSON.parse(localStorage.getItem('favoriteFoods'));
    $('.cardHolder').empty();
    for(var i = 0; i<favoriteFoods.length; i++){
        var newCard = $('#templateCard').clone();
        newCard.removeAttr('id'); 
        newCard.find(".nameText").text(favoriteFoods[i].name);
        newCard.find(".nameBrand").text(favoriteFoods[i].brand);
        console.log(favoriteFoods[i].name);
        newCard.attr("listIndex", i);
    
        $('.cardHolder').append(newCard);
    }

    
});
   
    




    

