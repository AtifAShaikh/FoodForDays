var newCard = $('#cardTemplate').clone();
console.log(newCard);
newCard.removeAttr('id');
newCard.find('#cardTitle').text("test");
$('#cardContainer').append(newCard);