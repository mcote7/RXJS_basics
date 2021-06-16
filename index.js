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

// import {fromEvent} from 'rxjs';

// const observer = {
//   next: val => console.log("next", val),
//   error: err => console.log("error", err),
//   complete: () => console.log("complete")
// };

// const source$ = fromEvent(document, 'click');

// source$.subscribe(observer);


// const subOne = source$.subscribe(observer);
// const subTwo = source$.subscribe(observer);

// setTimeout(() => {
//   /*
//    *  For long running observables we need to make sure to clean
//    *  them up when we are finished to prevent memory leaks and
//    *  unintended behavior. In this case, we are cleaning up
//    *  one subscription but not the other, leaving it active.
//    *  We will learn different techniques to automate this
//    *  process in an upcoming lesson.
//    */
//   console.log('unsubscribing');
//   subOne.unsubscribe();
// }, 3000);

// 

// begin 
// import { of, range } from 'rxjs';

// const observer = {
//     next: val => console.log('next', val),
//     error: err => console.log('error', err),
//     complete: () => console.log('complete!')
// };

/*
 * Emits each item you provide in sequence, synchronously.
 * of literally just loops through the items and emits them,
 * there is no flattening involved. For instance, if you pass an
 * array the entire array will be emitted, not each item within
 * the array.
 */
// const source$ = of(1,2,3,4,5);

// console.log('proving');
// source$.subscribe(observer);
// console.log('this is synchronous');

/*
 * If you just want to emit numbers between a specific range
 * you could also use the range operator instead.
 */
// console.log('proving');
// range(1,5).subscribe(observer);
// console.log('this is synchronous');

// marble diagrams =>

// [input$:] --(1)--(2)--(3)--(4)--(5)----->

// --- map(val => val * 10) ---

// [output$:] --(10)--(20)--(30)--(40)--(50)----->

// begin 
// import { of, fromEvent } from 'rxjs';
// import { map, pluck, mapTo } from 'rxjs/operators';

// of(1,2,3,4,5).pipe(
//   map(value => value * 10)
// ).subscribe(console.log);

// const keyup$ = fromEvent(document, 'keyup');

/*
 * One popular use case is mapping to a property (or multiple properties)
 * on an object. In this case you can use map like below...
 */
// const keycode$ = keyup$.pipe(
//   map((event) => event.code)
// );

/*
 * Or you could use pluck, which accepts the property name you
 * wish to emit. You can also 'pluck' nested properties, 
 * for instance: pluck('target', 'value'). I would use whichever
 * you feel is easiest to read (regarding map for single prop vs pluck).
 */
// const keycodeWithPluck$ = keyup$.pipe(
//   pluck('code')
// );

/*
 * For scenarios where you ALWAYS want to map to the same,
 * static value, you can use mapTo instead. This emits the value
 * you supply on any emissions from the source observable. We will see
 * a few examples of where this can be useful in upcoming lessons.
 */
// const pressed$ = keyup$.pipe(
//   mapTo('Key Pressed!')
// );

// keycodeWithPluck$.subscribe(console.log);


