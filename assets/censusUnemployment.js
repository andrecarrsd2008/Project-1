var graphContainer = $("#graphContainer");
function getUnemploy(){
    var state = response[0];
    console.log("here")
    var fips = {
        alabama: "01",
        alaska: "02",
        arizona: "04",
        arkansas: "05",
        california: "06",
        colorado: "08",
        connecticut: "09",
        delaware: "10",
        districtOfColumbia: "11",
        florida: "12",
        georgia: "13",
        hawaii: "15",
        idaho: "16",
        illinois: "17",
        indiana: "18",
        iowa: "19",
        kansas: "20",
        kentucky: "21",
        louisiana: "22",
        maine: "23",
        maryland: "24",
        massachusetts: "25",
        michigan: "26",
        minnesota: "27",
        mississippi: "28",
        missouri: "29",
        montana: "30",
        nebraska: "31",
        nevada: "32",
        newHampshire: "33",
        newJersey: "34",
        newMexiceo: "35",
        newYork: "36",
        northCarolina: "37",
        northDakota: "38",
        ohio: "39",
        oklahoma: "40",
        oregon: "41",
        pennsylvania: "42",
        rhodeIsland: "44",
        southCarolina: "45",
        southDakota: "46",
        tennesse: "47",
        texas: "48",
        utah: "49",
        vermont: "50",
        virginia: "51",
        washington: "53",
        westVirginia: "54",
        wisconsin: "55",
        wyoming: "56",
        }
        var dynamicState = fips[state]
        var URL = "https://api.census.gov/data/2016/acs/acs1?get="
        var population = "B01003_001E"
        var geography = "&for=county:*&in=state:" + dynamicState
        var key = "&key=272940975e9334abc537f165743db6e73882c550"
        var queryUrl = URL + population + geography + key
        var corsProxy = "https://cors-anywhere.herokuapp.com/";
        var urlPop = corsProxy + queryUrl;
        var datas = []
        var labelsOrigin = []
        var county = []
        var countyFull = []

        

        function createChart(label, value) {
        var ctx = $("#myChartPop2");
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: label,
                datasets: [{
                    label: '# of Population',
                    data: value,
                    borderWidth: .5
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
        }

        $.ajax({
            url: urlPop,
            method: "GET",
            
          }).then(function(response) {

            for (let i = 1; i < response.length; i++) {
                var data = parseInt(response[i][0])
                datas.push(data)
                var countyAPI = response[i][2]
                county.push(countyAPI)
                var stateCode = dynamicState + countyAPI; 
                countyFull.push(stateCode);             
            }
       

            for (let i = 0; i < countyFull.length; i++) {
                var URL = "https://www.broadbandmap.gov/broadbandmap/county-availability/jun2014/countyids/" + countyFull[i] + "?format=json"
                $.ajax({
                    url:URL,
                    method:"GET",
                }).then(function(response) {
                    var labelName = (response.Results[0].countyName);
                    labelsOrigin.push(labelName)                   
                })
            }
            setTimeout(function(){
                insertChart();
                createChart(labelsOrigin,datas);
              },5000);
            
        })
        // insertChart();
        // createChart(labelsOrigin,datas);
		
		
        }

        function insertChart() {
        var canvas = $('<canvas>')
        canvas.attr('id', 'myChartPop2')
        canvas.attr('width', '400')
        canvas.attr('height', '400')
        graphContainer.append(canvas)
        }
        
        