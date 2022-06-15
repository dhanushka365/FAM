let hoistedValue = 0;

function updateChart(){
    async function fetchData(){
        const url = 'http://localhost/FAM/js/financials.json'
        const response = await fetch(url);
        const datapoints = await response.json();
        console.log(datapoints)
        return datapoints;
    };
    fetchData().then(datpoints =>{
        const month = datpoints.financialreport[0].financials.map((month ,index)=>{
            return month.date;
        });
        //console.log(month)
        const value = datpoints.financialreport[0].financials.map((value ,index)=>{
            return value.revenue;
        });
        if(myChart.data.labels.length>12){
            myChart.data.labels.shift();
            myChart.data.datasets[0].data.shift();
        }
        console.log(value)
        //myChart.data.labels =month;
        //myChart.data.datasets[0].data =value;
        myChart.data.labels.push(month[hoistedValue])
        myChart.data.datasets[0].data.push(value[hoistedValue])
        myChart.update();
        //console.log('show')
        hoistedValue++;
    })

   
};
setInterval(updateChart,700)
const ctx = document.getElementById('canvas').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: '# of Votes',
            data: [],
            backgroundColor:'transparent',
            borderColor:'green',
            borderWidth: 4
        }
    ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

