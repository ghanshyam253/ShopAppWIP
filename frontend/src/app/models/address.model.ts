export class Address{
    street: String;
    city: String;
    state: String;
    zipcode: String;
    constructor(street: String, city: String, state: String, zipCode: String){
        this.street = street
        this.city = city
        this.state = state
        this.zipcode = zipCode
    }
}