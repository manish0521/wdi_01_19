window.onload = function () {
    init()
}

function init() { 
    document.getElementById("submit").addEventListener("click", submit); 
    document.getElementById("lead").innerHTML = formatAMPM();


    let httpRequest 

    function makeRequest() {
        httpRequest = new XMLHttpRequest()

        if (!httpRequest){
            alert("Giving up! Cannot create XMLHTTP instance")
        }

        let stock = document.getElementById("stock").value;
        
        httpRequest.onreadystatechange = processContents
        httpRequest.open("GET", `https://api.worldtradingdata.com/api/v1/stock?symbol=${stock}&api_token=Jhppy1TqywnTbZNSryDPdqraJHMijW3RnammeFAvuoGtMBxxhWBeLWo52FE1`)
        httpRequest.send()


    }
    function processContents() {
        if (httpRequest.readyState === XMLHttpRequest.DONE){
            if (httpRequest.status === 200){
                let data = httpRequest.responseText


                if (data){
                    data = JSON.parse(data)

                    if (data.data) createCards(data.data)
                }
            } else {
                alert ("there was a problem with request")
            }
        }
    }
      
    function createCards(data) {
        console.log(data)
        let cardDeck = document.querySelector(".container > .card-deck")
        

        let cards = ``

        for (let symbol in data){
            
                cards += `<div class="card mb-4 shadow-sm">
                <div class="card-header">
                <h4 class="my-0 font-weight-normal">${data[symbol].symbol}
                <br/> 
                ${data[symbol].name} 
                </h4>
                </div>
                <div class="card-body">
                <h1 class="card-title pricing-card-title">$${data[symbol].price} per share</h1>
                <ul class="list-unstyled mt-3 mb-4">
                    
                    <li>${data[symbol].volume} Volumes traded</li>
                    <li>${data[symbol].shares} Total no of shares </li>
                                    
                </ul>
                
                
            </div>
        </div>`
    }
        cardDeck.innerHTML = cards
    }  
    
    function submit(event) {

        
        
        makeRequest()

    }

    function formatAMPM() {
        let d = new Date(),
            minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
            hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
            ampm = d.getHours() >= 12 ? 'pm' : 'am',
            months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        return days[d.getDay()]+' '+months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()+' '+hours+':'+minutes+ampm;
        }
    

    makeRequest();
    formatAMPM();
}