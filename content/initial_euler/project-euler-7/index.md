---
title: Let's Solve Project Euler Problem 7
date: "2017-06-19T14:00:00.000Z"
description: Euler Problem 7
---

### 10001st prime
>By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.<br/>
What is the 10 001st prime number?

Nothing we haven't seen before, two immediate approaches:

* Iterate and check primality

```javascript
function isPrime(n){
  var half = Math.floor(n/2);
  for(var i=2; i<=half; i++){
    if(n%i === 0)
      return false;
  }
  return true;
}

function getSolution(){
  var n = 10001;
  var primes = [2];
  var i = 3;
  while(primes.length < n){
    if(isPrime(i))
      primes.push(i);
    i+=2;
  }
  return primes[primes.length - 1];
}
```

Average of 1000 iterations is: 1139.2023500000003 ms.

* [Sieve of Eratosthenes](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes).
```javascript
function sievePrimes(n){
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
  return primes;
}

function getPrime(){
  var primes = sievePrimes(110000);
  return primes[10000];
}
```

Average of 1000 iterations: 10.9280475 ms. Please note the low bound of the sieve.<br/>
If we decide to increase sieve size to something we can say safely contains the prime we want (instead of a nice fairly-close bound), let's say 1100000 (10x the initial 110000), then our new average is 106.47139999999999 ms.<br/>
So it looks like the Sieve is faster if we can estimate the upper-bound of the prime number reasonably well.<br/>
Can we estimate the upper bound of the prime to a reasonable limit?<br/>
[I think so!](https://codereview.stackexchange.com/questions/90813/finding-the-nth-prime). It looks as simple as $$ n * (ln(n)+2) $$<br/>
Let's see what that looks like and how that operates!

```javascript
function sievePrimes(n){
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
  return primes;
}

function getPrime(){
  var n = 10000;
  var estimate = n * (Math.log(n)+2);
  var primes = sievePrimes(estimate);
  return primes[10000];
}
```

With an average run time of: 12.396499999999998 ms.<br/>
Alrighty, so now we can use the more efficient Sieve with a fairly accurate upper-bound on the prime numbers for an adequate runtime.
