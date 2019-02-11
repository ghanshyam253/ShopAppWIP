import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Order } from 'src/app/models/order.model';
import * as _ from 'underscore'
import { NotificationService } from '../notification/notification.service';
import { Profile } from 'src/app/models/profile.model';
import { CardDetails } from 'src/app/models/card.model';
import { Address } from 'src/app/models/address.model';
import { HttpClient } from '@angular/common/http';
import config from 'src/app/config/config.env';
import { UserData } from 'src/app/users-list/users-list.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // products: Product[] = [{
  //   title: 'laptop',
  //   desc: 'this is it',
  //   price: 100
  // }]
  //profile = new Profile('Santhosh', '7242198319', 's530859@nwmissouri.edu');
  orders: Order[] = []
  address: Address[] = [new Address('bellampalli', 'adilabad', 'telangana', '64468') , new Address('bellampalli1', 'adilabad', 'telangana', '64468'), new Address('bellampalli2', 'adilabad', 'telangana', '64468'), new Address('bellampalli3', 'adilabad', 'telangana', '64468') ]
  //payments: CardDetails[] =  [new CardDetails('Card1', 111, '10/10/2010'), new CardDetails('Card2', 111, '10/10/2010'), new CardDetails('Card2', 211, '10/10/2010')]
  constructor(private ns: NotificationService, private httpclient: HttpClient) { }

  getData () {
    return this.httpclient.get<Product[]>(config.url + 'product/all')
  }

  getOrders (){
    return this.httpclient.get<Order[]>(config.url + 'cart/getallforuser')
  }

  setOrders (orders: Order[]) {
    for(let order of orders){
      this.updatecart(order['_id'],order.quantity)
    }
  }

  addToCart (product: Product) {
    // this.orders.push({ name: product.title, price: product.price, quantity: 0 })
    // this.ns.success(`${product.title} added to cart`)
    this.httpclient.post(config.url + 'cart/addtocart', product,{responseType: 'text'})
    .subscribe(
      res => {
        console.log(res)
        this.ns.success(`${product.name} added to cart`)
      },
      err => {
        console.log(err)
        this.ns.warn(`${product.name} failed to add to cart`)
      }
    )
  }
  getProfile () {
      return this.httpclient.get<Profile>(config.url + 'user/getone/' + localStorage.getItem('id'))
  }

  getAddress () {
    return this.httpclient.get<Address[]>(config.url + 'address/getallforuser/' + localStorage.getItem('id'))
  }

  getPayments () {
    return this.httpclient.get<CardDetails[]>(config.url + 'card/getallforuser/' + localStorage.getItem('id'))
  }
  addaddress (address: Address) {
    // this.address.push(address)
    return this.httpclient.post(config.url + 'address/create', { ...address, userid: localStorage.getItem('id')})
  }
  addcard (carddetails: CardDetails) {
    // this.payments.push(carddetails)
    return this.httpclient.post(config.url + 'card/addcard', carddetails)
  }
  updatecart (cartid,quantity) {
    this.httpclient.post(config.url + 'cart/updatecart', {
      id: cartid,
      data: {
        quantity: quantity
      }
    })
    .subscribe(
      res => {},
      err =>{ console.log(err) })
  }
  removeitemfromcart (ele) {
    return this.httpclient.post(config.url + 'cart/delete/' + ele, {},{
      observe: 'response',
      responseType: 'text'
    })
   
  }

  updateprofile (data) {
    return this.httpclient.post(config.url + 'user/edit/'+ localStorage.getItem('id'), data, {responseType: 'text'})
  }

  emptycart () {
    return this.httpclient.post(config.url + 'cart/emptycart/' + localStorage.getItem('id'), {},{
      responseType: 'text'
    })
  }

  placeorder (orderdetails,card, address) {
    debugger;
    return this.httpclient.post(config.url + 'order/create', {
      orderdetails,
      card,
      address,
      userid: localStorage.getItem('id')
    },{ responseType: 'text' })
  }

  getorderforuser (userid) {
    return this.httpclient.get<any[]>(config.url + 'order/getallforuser/' + userid)
  }

  getpendingorders () {
    return this.httpclient.get<any[]>(config.url + 'order/getPendingOrders')
  }
  deleteorder (orderid) {
    return this.httpclient.post(config.url + 'order/delete/' + orderid, {}, {responseType: 'text'})
  }
  addproduct (formdata) {
    return this.httpclient.post(config.url + 'product/create', formdata, {responseType: 'text'})
  }

  deleteproduct (productid) {
    return this.httpclient.post(config.url + 'product/delete/' + productid, {}, {responseType: 'text'})
  }

  getallusers () {
    return this.httpclient.get<UserData[]>(config.url + 'user/all')
  }
  updateproduct (formdata) {
    console.log(formdata.get('name'))
    return this.httpclient.post(config.url + 'product/edit/' + formdata.get('id'), {
      name: formdata.get('name'),
      description: formdata.get('description'),
      price: formdata.get('price'),
      formdata
    }, {responseType: 'text'})
  }

  updatereview (orderid, data) {
    return this.httpclient.post(config.url + 'order/edit/' + orderid, { ...data }, {responseType: 'text'})
  }
}
