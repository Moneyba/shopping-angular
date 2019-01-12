import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {Product} from '../shared/product';

@Injectable()
export class ProductService {

  constructor(public db: AngularFirestore) {
  }
  getProducts() {
    return this.db.collection('products').snapshotChanges();
  }
  createProduct(value) {
    return this.db.collection('products').add({
      id: value.id,
      img : value.img,
      name: value.name,

      // nameToSearch: value.name.toLowerCase(),
      // surname: value.surname,
      // age: parseInt(value.age),
      // avatar: avatar
    });
  }

  deleteProduct(productKey) {
    return this.db.collection('products').doc(productKey).delete();
  }

  getProduct(productId: string) {
    return this.db.collection('products').doc(productId).snapshotChanges();
  }

  updateProduct(id: any, value: any) {
    //console.log('name=' + value.name);
    //console.log('img=' + value.img);
    console.log('value=' +  JSON.stringify(value));
    return this.db.collection('products').doc(id).update(value);
  }

  convertDataToProduct(data: any): Product {

    let product = new Product();
    product.product_name = data.name;

    return product;
  }

  addToCart(data: any): void {
    console.log('addToCart()');
    // console.log('data=' + data.name);
    console.log('data=' +  JSON.stringify(data));

    // let product = this.convertDataToProduct(data);
    // console.log('product_name=' + product.product_name);

    let products: Product[];

    products = JSON.parse(localStorage.getItem('avct_item')) || [];
    console.log('jsonIn=' + JSON.stringify(products));

    products.push(data);
    console.log('jsonOut=' + JSON.stringify(products));

    localStorage.setItem('avct_item', JSON.stringify(products));


  /*  this.toastrService.wait('Adding Product to Cart', 'Product Adding to the cart');
    setTimeout(() => {
      localStorage.setItem('avct_item', JSON.stringify(a));
      this.calculateLocalCartProdCounts();
    }, 500);*/

  }

  getLocalCartProducts(): Product[] {
    const products: Product[] = JSON.parse(localStorage.getItem('avct_item')) || [];

    return products;
    console.log(products);
  }
}
