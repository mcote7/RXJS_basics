// import { of } from 'rxjs';

// /*
//  * Any code samples you want to play with can go in this file.
//  * Updates will trigger a live reload on http://localhost:1234/
//  * after running npm start.
//  */
// of('Hello', 'RxJS').subscribe(console.log);


// // section 1

// // * Observers can register up to 3 callbacks
// // * next is called 1:M times to push new values to observer
// // * error is called at most 1 time should an error occur
// // * complete is called at most 1 time on completion.
// // */
// const observer = {
//     next: value => console.log('next', value),
//     error: error => console.log('error', error),
//     complete: () => console.log('complete!')
// };

// const observable = new Observable(subscriber => {
//     subscriber.next('Hello');
//     subscriber.next('World');
//     /*
//     * Once complete is called, observable will be cleaned up
//     * and no future values delivered.
//     */
//     subscriber.complete();
//     /*
//     * These values will not be logged as the observable
//     * has already completed.
//     */
//     subscriber.next('Hello');
//     subscriber.next('World');
// });

// /* 
// * Subscribe hooks observer up to observable, beginning execution.
// * This creates a 1 to 1 relationship between the producer
// * (observable) and the consumer (observer).
// */
// observable.subscribe(observer);

// // section 2

// const observer = {
//   next: value => console.log('next', value),
//   error: error => console.log('error', error),
//   complete: () => console.log('complete!')
// };

// const observable = new Observable(subscriber => {
//   subscriber.next('Hello');
//   subscriber.next('World');
//   subscriber.complete();
// });

// // You can pass an observer object, with any of the three callbacks
// // observable.subscribe(observer);

// /*
// * Or just supply 0 to all functions (next, error, complete).
// * If I'm supplying more than next callback, I will use object
// * as it's a bit more clear.
// */
// observable.subscribe(value => console.log('next', value));

// //  section 3 // ASYNC

// const observer = {
//   next: value => console.log('next', value),
//   error: error => console.log('error', error),
//   complete: () => console.log('complete!')
// };

// const observable = new Observable(subscriber => {
//   let count = 0;
//   // Observables can deliver 0:M values synchronous or asynchronously
//   const id = setInterval(() => {
//     subscriber.next(count);
//     // calling complete also invokes the cleanup function you return
//     subscriber.complete();
//     count += 1;
//   }, 1000);

//   /*
//    * You can return a function to clean up any resources that were
//    * created with subscription. In this case, we need to clear 
//    * the active interval. When using RxJS's built in creation operators
//    * this will be handled for us.
//    */
//   return () => {
//     console.log('called');
//     clearInterval(id);
//   };
// });

// // adding logs to show observable emitting asynchronously
// console.log('before');
// observable.subscribe(observer);
// console.log('after');

// //  section 4 

// const observer = {
//   next: value => console.log('next', value),
//   error: error => console.log('error', error),
//   complete: () => console.log('complete!')
// };

// const observable = new Observable(subscriber => {
//   let count = 0;

//   const id = setInterval(() => {
//     subscriber.next(count);
//     count += 1;
//   }, 1000);

//   return () => {
//     console.log('called');
//     clearInterval(id);
//   };
// });

// const subscription = observable.subscribe(observer);
// const subscriptionTwo = observable.subscribe(observer);

// /*
//  * Subscriptions can be added together using the add method,
//  * you can then unsubscribe to multiple at the same time.
//  * This is simply personal preference, unsubscribing individually 
//  * will produce the same result. Also, in future lessons, we will see how
//  * to automate this unsubscribe process with operators.
//  */
// subscription.add(subscriptionTwo);

// setTimeout(() => {
//  /*
//   * Note: Calling unsubscribe will not fire your complete callback,
//   * but the returned function will be invoked cleaning up any
//   * resources that were created by the subscription - in this
//   * case the interval.
//   */
//   subscription.unsubscribe();
// }, 3500);

// section 5 

// CREATION OPERATORS <-----<<<|) \ 🔥🔥🔥

// from DOM Events 

import {fromEvent} from 'rxjs';

const observer = {
  next: val => console.log("next", val),
  error: err => console.log("error", err),
  complete: () => console.log("complete")
};

const source$ = fromEvent(document, 'click');

source$.subscribe(observer);



