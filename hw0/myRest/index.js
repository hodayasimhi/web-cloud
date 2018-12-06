var events = require('events'),
    moment = require('moment'),
    config = require('./config.js').events;

 const MAX = 15; //Maximum oders in the kitchen restaurant


 //Design message
 const Endmsg="--------";; //end message
 var clock=moment().format('HH-MM-SS');

class myRest  extends events.EventEmitter{
    constructor(){
    super();
    this.numOforders=0;
    this.msgQue = [];
        }

    /*funcions*/

    //new order to kitchen
    newOrder(num){

        //Last order to kitchen staff
        if((this.numOforders+num)==MAX){
            this.numOforders+=num;
            this.emit('newOrders');
            this.emit('fullKitchen');
            return;
        }
        //no space in the kitchen
        else if((this.numOforders+num)>MAX){ 
            this.emit('overFlow');
            return;
        }
        //order has  been  kitchen
        else this.numOforders+=num;
        this.emit('newOrders');

    }

    //oders left the kitchen for diners, kitchen staff remove order
    removeOders(num){

        if((this.numOforders-num)<=0){
            this.emit('emptyKitchen')
            this.numOforders-=num;
            return
        }
        this.numOforders-=num;
        this.emit('OrdersLeft')
    }



    //action in Kitchen

    enterKitchen(){ 
        this.msgQue.push('Your order has  been  kitchen.')
        console.log(clock);
        console.log('Your order has  been  kitchen.')
        console.log(Endmsg);
    }

    leaveKitchen(){ 
        this.msgQue.push('orders left the kitchen for diners.')
        console.log(clock);
        console.log('orders left the kitchent for diners.')
        console.log(Endmsg);

    }

    //status of Kitchen

    KitchenFull(){
        this.msgQue.push('now The Kitchen is full.')
        console.log(clock);
        console.log('now The Kitchen is full.')
        console.log(Endmsg);
    }

    KitchenEmpty(){
        this.msgQue.push('The Kitchen is empty.Take more orders.')
        console.log(clock);
        console.log('The Kitchen is empty.Take more orders.')
        console.log(Endmsg);
    }

    overFlow(){
        this.msgQue.push('Kitchen is full.Give a drink.')
        console.log(clock);
        console.log('Kitchen is full.Give a drink.')
        console.log(Endmsg);
    }

    WelcometoKitRes(){
        console.log('                                 ')
        console.log(clock)
        console.log('--------Hodaya Restaurant--------')
        console.log('     by the chef HODAYA SIMHI    ')
        console.log('12th floor Carllton Tel Aviv hotel on the beach. 18 Eliezer Peri st.')
        console.log('Open Sunday-Thursday Dinner 18:00-23:00 Friday Brunch 10:00-15:00')
        console.log(Endmsg);
    }

    footer(){
        console.log('--------© 2018 Hodaya Restaurant by HodayaSimhi--------')
        console.log(Endmsg);
    }

    printOrders(){
        this.msgQue.push(`in Kitchen ${this.numOforders} orders.`)
        console.log(this.numOforders)
        console.log(Endmsg);
    }

    //getAll
    printMsgQue(){
        for(let i = 0; i < this.msgQue.length; ++i)
            console.log(this.msgQue[i]);
    }


    //reset
    clearAll(){
        this.numOforders = 0;
        console.log(clock);
        this.msgQue.push('All cancelled.')
        console.log('All cancelled.')

    }
  

    }

    
module.exports = myRest;