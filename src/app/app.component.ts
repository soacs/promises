import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Demo of Promises';

  constructor() {
  }

  simplest() {
    console.log("BEGIN simplest");
    // Promise
    let myPromise = new Promise(
      function (resolve, reject) {
        console.log('myPromise is executing');
        setTimeout(()=>{
          console.log('resolving myPromise');
          resolve("successful result");
        }, 2000);
      });

    myPromise.then(s=> console.log('we recieved: ' + s));
    console.log("END simplest");
  }


  basic() {
    console.log("BEGIN basic");
    let isDadEmployed = true;
    const willSonGetToys = new Promise(
      function (resolve, reject) {
        console.log("Basic promise executing");
        if (isDadEmployed) {
          var toy = {
            brand: 'PlayStation',
            color: 'black'
          };
          resolve(toy);
        } else {
          var reason = new Error('dad is not employed - son will not get toys');
          reject(reason);
        }
      }
    );


    const findResult = function () {
      willSonGetToys
        .then(function (goodnews) {
          // yes - son will get toys
          console.log("Promise resolved - son will get toy: " + JSON.stringify(goodnews));
        })
        .catch(function (error) {
          // ops, dad is broke again
          console.log(error.message);
        });
    }

    findResult();
    console.log("END basic");
  }

  chain() {
    console.log("BEGIN chain");
    let isDadEmployed = false;

    // Promise
    let willSonGetToys = new Promise(
      function (resolve, reject) {
        if (isDadEmployed) {
          let toy = {
            brand: 'PlayStation',
            color: 'black'
          };
          console.log("inside willSonGetToys: " + JSON.stringify(toy));
          resolve(toy);
        } else {
          let reason = new Error('dad is not employed - son will not get toys');
          reject(reason);
        }

      }
    );
// 2nd promise
    let tellFriends = function (toy) {
      let myPromise = new Promise(
        function (resolve, reject) {
          let message = 'Dad bought me a new toy ';
          console.log(JSON.stringify("inside tellFriends: " + message));
          resolve(message);
        }
      );
      return myPromise
    };

// call our promise
    let findResult = function () {
      willSonGetToys
        .then(function (goodnews) {
          // yes - son will get toys
          console.log(JSON.stringify(goodnews));
        }).then(tellFriends)
        .catch(function (error) {
          // ops, dad is broke again
          console.log(error.message);
        });
    }

    findResult();

    console.log("END chain");

  }

  asyncawait() {
    console.log("BEGIN asyncawait");
    function resolveAfter4Seconds(x) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(x);
        }, 4000);
      });
    }

    async function addOne(x) {
      const a = await resolveAfter4Seconds(10);
      const b = await resolveAfter4Seconds(20);
      return x + a + b;
    }

    addOne(5).then(v => {
      console.log(v);  // prints 35 after 8 seconds.
    });


    async function addTwoConcurrently(x) {
      const p_a = resolveAfter4Seconds(5);
      const p_b = resolveAfter4Seconds(15);
      return x + await p_a + await p_b;
    }

    addTwoConcurrently(10).then(v => {
      console.log(v);  // prints 30 after 4 seconds.
    });

    console.log("END asyncawait");
  }


  anotherChain() {

    console.log("BEGIN anotherChain");

    var methodOne = function() {
      console.log('methodOne starting...');
      var promise = new Promise(function(resolve, reject){
        console.log("setting price = $110");
        setTimeout(function() {
          console.log('methodOne completing');
          resolve({price: 110});
        }, 4000);
      });
      return promise;
    };


    var methodTwo = function(data) {
      console.log('methodTwo starting...');
      var promise = new Promise(function(resolve, reject){
        console.log("adding tax to price = " + data.price);
        setTimeout(function() {
          console.log('methodTwo completing');
          resolve({taxedPrice: data.price + 6.0});
        }, 6000);
      });
      return promise;
    };

    var methodThree = function(mydata) {
      console.log('methodThree starting...');
      console.log("add discount to taxedPrice = " + mydata.taxedPrice);
      var promise = new Promise(function(resolve, reject){

        setTimeout(function() {
          console.log('methodThree completed');
          resolve({discountedPrice: mydata.taxedPrice - 10.0});
        }, 15000);
      });
      return promise;
    };

    methodOne()
      .then(methodTwo)
      .then(methodThree)
      .then(s=> console.log('Final discountedPrice received: ' + JSON.stringify(s)));
    console.log("END anotherChain");
  }
  }
