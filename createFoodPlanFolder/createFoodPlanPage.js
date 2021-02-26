var favFoods = JSON.parse(localStorage.getItem('favoriteFoods'));
var foodPlans = JSON.parse(localStorage.getItem('foodPlans'));
console.log(foodPlans);


if(foodPlans === null){
    foodPlans = [];
    localStorage.setItem('foodPlans', JSON.stringify(foodPlans));
    foodPlans = JSON.parse(localStorage.getItem('foodPlans'));
}

var favFoodsIndex = 0;
favFoods.forEach(element => {
    var newCard = $('#templateFoodCard').clone();
    newCard.removeAttr('id');
    newCard.find('p').text(element.name);
    newCard.attr('myIndex', favFoodsIndex);
    favFoodsIndex++;
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
    updateFoodTable(foodPlanToDisplay.foods);
}

$('.removeFoodPlanButton').on('click', function(){
    var indexToRemove = $(this).attr('currentPlanIndex');
    foodPlans.splice(indexToRemove, 1);
    localStorage.setItem('foodPlans', JSON.stringify(foodPlans));
    foodPlans = JSON.parse(localStorage.getItem('foodPlans'));
    location.reload();

});


$('.card').on('click', function(){
    var foodIndexToAdd = $(this).attr('myIndex');
    var foodPlanToUpdate = foodPlans[$('.removeFoodPlanButton').attr('currentPlanIndex')];

    if(foodPlanToUpdate === undefined){
        return;
    }

    foodPlanToUpdate.foods.push(favFoods[foodIndexToAdd]);
    console.log(foodPlanToUpdate);
    localStorage.setItem('foodPlans', JSON.stringify(foodPlans));
    foodPlans = JSON.parse(localStorage.getItem('foodPlans'));
    updateFoodTable(foodPlanToUpdate.foods);
});

function updateFoodTable(foodsToPutOnTable){
    $('.tableRow').remove();
    var totalCarb = 0;
    var totalFat = 0;
    var totalProt = 0;
    var totalCal = 0;
    foodsToPutOnTable.forEach(element => {
        var newRow = $('#templateTableElement').clone();
        newRow.attr('class', 'tableRow');
        newRow.removeAttr('id');
        newRow.find('.foodItemName').text(element.name);
        newRow.find('.foodItemCarbs').text(element.carbs);
        totalCarb += Number(element.carbs);
        newRow.find('.foodItemFats').text(element.fats);
        totalFat += Number(element.fats);
        newRow.find('.foodItemProteins').text(element.proteins);
        totalProt += Number(element.proteins);
        newRow.find('.foodItemCals').text(element.calories );
        totalCal += Number(element.calories);
        

        $('.foodItems').prepend(newRow);

    });
    $('.totalValues').find('.foodItemCarbs').text(Math.round(totalCarb));
    $('.totalValues').find('.foodItemFats').text(Math.round(totalFat));
    $('.totalValues').find('.foodItemProteins').text(Math.round(totalProt));
    $('.totalValues').find('.foodItemCals').text(Math.round(totalCal));
}

refreshFoodPlans();