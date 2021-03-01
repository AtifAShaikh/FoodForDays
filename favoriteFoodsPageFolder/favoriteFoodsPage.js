var favoriteFoods = JSON.parse(localStorage.getItem('favoriteFoods'));
    console.log(favoriteFoods)

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Carbs', 'Fats', 'Proteins'],
        datasets: [{
            label: '# of Votes',
            data: [1, 1, 1],
            backgroundColor: [
                'rgba(54, 162, 235)',
                'rgba(255, 206, 86)',
                'rgba(255, 99, 132)'
            ]
        }]
    }
});

    
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
   if(favoriteFoods[foodIndex].recipe === ''){
       $('.foodImage').hide();
   } else {
       $('foodImage').show();
       $('foodImage').attr('src', favoriteFoods[foodIndex].img)
   }
   myChart.destroy();
   myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Carbs', 'Fats', 'Proteins'],
        datasets: [{
            label: '# of Votes',
            data: [favoriteFoods[foodIndex].carbs, favoriteFoods[foodIndex].fats, favoriteFoods[foodIndex].proteins],
            backgroundColor: [
                'rgba(54, 162, 235)',
                'rgba(255, 206, 86)',
                'rgba(255, 99, 132)'
            ]
        }]
    }
});
})

$('.removeButton').on("click", function(){
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

    $("#foodName").text('');
    $("#foodCalories").text('');
    $("#foodFats").text('');
    $("#foodCarbs").text('');
    $("#foodProteins").text('');
    $("#foodRecipe").text('');
    $("#foodIngredients").text('');
    

});


    

