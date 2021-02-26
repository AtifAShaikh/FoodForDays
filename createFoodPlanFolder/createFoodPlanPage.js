var favFoods = JSON.parse(localStorage.getItem('favoriteFoods'));
var foodPlans = JSON.parse(localStorage.getItem('foodPlans'));
console.log(foodPlans);


if(foodPlans === null){
    foodPlans = [];
    localStorage.setItem('foodPlans', JSON.stringify(foodPlans));
    foodPlans = JSON.parse(localStorage.getItem('foodPlans'));
}


favFoods.forEach(element => {
    var newCard = $('#templateFoodCard').clone();
    newCard.removeAttr('id');
    newCard.find('p').text(element.name);
    $('.foodCardContainer').append(newCard);
});


function refreshFoodPlans(){
    $('.foodPlanCardContainer').empty();
    var indexToPut = 0;
    foodPlans.forEach(element => {
        var newPlan = $('#templateFoodPlanCard').clone();
        newPlan.removeAttr('id');
        newPlan.find('p').text(element.name);
        newPlan.attr('myIndex', indexToPut);
        indexToPut++;

        $('.foodPlanCardContainer').append(newPlan);
    });
}


$('.createPlan').on('click', function(){
    $('#createPlanModal').modal('toggle');
});


$('#createPlanButton').on('click', function(){
    $('#createPlanModal').modal('toggle');
    var newFoodPlan = {
        name: $('#foodPlanNameInput').val(),
        foods: []
    }
    foodPlans.push(newFoodPlan);
    localStorage.setItem('foodPlans', JSON.stringify(foodPlans));
    foodPlans = JSON.parse(localStorage.getItem('foodPlans'));
    refreshFoodPlans();
});


$('.foodPlanCardContainer').on('click', '.card', function(){
    var indexOfPlan = $(this).attr('myIndex');
    displayFoodPlan(indexOfPlan);
});

function displayFoodPlan(foodPlanDataIndex){
    var foodPlanToDisplay = foodPlans[foodPlanDataIndex];
    $('.foodPlanNameText').text(foodPlanToDisplay.name);
    $('.removeFoodPlanButton').attr('currentPlanIndex', foodPlanDataIndex);
}

$('.removeFoodPlanButton').on('click', function(){
    var indexToRemove = $(this).attr('currentPlanIndex');
    foodPlans.splice(indexToRemove, 1);
    localStorage.setItem('foodPlans', JSON.stringify(foodPlans));
    foodPlans = JSON.parse(localStorage.getItem('foodPlans'));
    location.reload();

});

refreshFoodPlans();