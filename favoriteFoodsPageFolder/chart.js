var favoriteFoods = JSON.parse(localStorage.getItem('favoriteFoods'));
    console.log(favoriteFoods)


var ctx = document.getElementById('myChart').getContext('2d');
            
            var chart = new Chart(ctx, {
                
                type: 'pie',
            
                
                data: {
                    labels: ['Carbs', 'Fats', 'Proteins'],
                    datasets: [{
                        label: 'Nutrients',
                        backgroundColor: ['Yellow', 'Green', 'Orange'],
                        borderColor: 'Black',
                        // placeholder values for now
                        data: [33, 33, 33],
                        
                    }]
                    
                },
                
            
                
            });