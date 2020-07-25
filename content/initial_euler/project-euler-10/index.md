---
title: Let's Solve Project Euler Problem 10
date: "2017-06-20T02:00:00.000Z"
description: Euler Problem 10
---

### Summation of primes
>The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
Find the sum of all the primes below two million.

Well, now I can use this without resolve, time for the [Sieve of Eratosthenes](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes)!

```javascript
function summedSievePrimes(n){
  var arr = [];
  var primes = [2];
  for(var i=0; i<n; i++){
    arr[i] = true;
  }
  arr[0] = false;
  arr[1] = false;
  arr[2] = false;
  for(var i=3; i<n;i+=2){
    if(arr[i] !== false){
      arr[i] = false;
      primes.push(i);
      for(var j=i; j<n;j+=i){
        arr[j] = false;
      }
    }
  }
  return primes.reduce(function(acc, val, index, arr){return acc += val});
}

console.log(sievePrimes(2000000))
```
