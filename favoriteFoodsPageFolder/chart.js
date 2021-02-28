var favoriteFoods = JSON.parse(localStorage.getItem('favoriteFoods'));
    console.log(favoriteFoods)


var ctx = document.getElementById('myChart').getContext('2d');
            
            var chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'pie',
            
                // The data for our dataset
                data: {
                    labels: ['Carbs', 'Fats', 'Proteins'],
                    datasets: [{
                        label: 'Nutrients',
                        backgroundColor: ['Yellow', 'Green', 'Orange'],
                        borderColor: 'Black',
                        data: [33, 33, 33],
                        
                    }]
                    
                },
                
            
                // Configuration options go here
                options: {}
            });