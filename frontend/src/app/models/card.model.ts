export class CardDetails {
    cardnumber: String;
    name: String;
    cvv: Number;
    expirydate: String;
    constructor(cardnumber: String, cvv:Number, expdate: String,name: String){ 
        this.cardnumber = cardnumber;
        this.cvv = cvv;
        this.expirydate = expdate;
        this.name = name
     }
}