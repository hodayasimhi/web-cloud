//models
var express     = require('express'),
    events      = require('events'),
    myRest      = require('./myRest/index'),
//config
    myconfig    = require('./myRest/config').events;
 

 //create server
 var app = express();
 var port = process.env.PORT || 8080;

 
//create Restaurant 
var HRes = new myRest();

app.get('/', (req, res) => {

    HRes.WelcometoKitRes();
    HRes.newOrder(15);
    HRes.newOrder(2);
    HRes.removeOders(15);
    HRes.printOrders();
    HRes.printMsgQue();
    HRes.clearAll();
    HRes.footer();
    
    res.send(JSON.stringify(HRes.msgQue));
    //Resetting the msQLog 
    while(HRes.msgQue.length)
         HRes.msgQue.pop();
    res.end();
})


//port
app.listen(port, () =>{
    console.log(`Listening to port ${port}`)
});

//assign methods to event

HRes
.on(myconfig.STAR, HRes.enterKitchen)
.on(myconfig.NEW, HRes.enterKitchen)
.on(myconfig.FINISH, HRes.leaveKitchen)
.on(myconfig.FULL, HRes.KitchenFull)
.on(myconfig.EMPTY, HRes.KitchenEmpty)
.on(myconfig.OVER, HRes.overFlow);

