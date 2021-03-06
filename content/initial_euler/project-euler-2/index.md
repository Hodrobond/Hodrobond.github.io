---
title: Let's Solve Project Euler Problem 2
date: "2017-06-13T20:00:00.000Z"
description: Euler Problem 2
---
Wow, two posts in one day. I'm energetic, aren't I?

Let's get into problem 2

### Even Fibonacci numbers
>Each new term in the Fibonacci sequence is generated by adding the previous two terms. By starting with 1 and 2, the first 10 terms will be:<br/>
1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...<br/>
By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms.

As is the pattern with Project Euler, there are a myriad of ways we can solve this problem.

The Fibonnaci sequence is generally used to teach recursion. Maybe something along the lines of

```javascript
function fibonacci(n) {
   if (n === 1){
     return 1;
   }else{
     return fibonacci(n-2) + fibonacci(n-1);
   }
}
```

or if you're fancy:

```javascript
function fibonacci(n) {
  return (n === 1) ? 1 : fibonacci(n-2) + fibonacci(n-1);
}
```

Ignoring the call stack issues for larger numbers we can solve using setTimeout, retrieving all of the subsequent fibonacci numbers this way seems...inefficient. If I get the 6th fibonacci number then the 7th, it will recalculate all of the previous numbers.

I propose an iterative solution. Keeping track of the current and previous fibonacci numbers (I love the [Sieve of Eratosthenes](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes) but it just doesn't cut it here. We won't know the maximum value of the prime we need unless we do some intricate mathematical analysis or by testing to get the value explicitly)

```javascript
var maxFibonacciValue = 4000000;
var prev = 1;
var current = 2;
var sum = current;
var temp;
//iterative over recursive fibonacci.
while(sum < maxFibonacciValue){
  temp = current;
  current += prev;
  prev = temp;
  if(current % 2 === 0)
    sum += current
}
return sum;
```

We don't actually have any use for any fibonacci number other than "is this one even? Let's add it to the sum" and "Let's add the last one to this one to get the next one!".
