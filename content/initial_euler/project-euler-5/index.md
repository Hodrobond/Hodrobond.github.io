---
title: Let's Solve Project Euler Problem 5
date: "2017-06-15T02:00:00.000Z"
description: Euler Problem 5
---
### Smallest multiple
>2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.
What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?

Brute Force:<br/>
Iterate i to n until a number is divisible by 1-20! Let's test it with our sample input first, the numbers up to 10.

```javascript
function getLowest(){
  var limit = 10;
  while(true){
    for(var j=1; j<=limit; j++){
      if(i%j !== 0)
        break;
      if(j === limit)
        return i;
    }
  }
}
```

Well. It works! Slowly, but surely. If we want to find the numbers divisible by 1-40 we may very well be waiting until the heat death of the universe. There's nothing inherently *wrong* with this approach per se. If I forgot someone's phone number I *could* call every phone number until I find them, it'll take a while but it'll work.

Alright we learned something related to this a long time ago, many moons ago...likely back in grade school.
What were they called...ah yes, *Prime Factors*.

Ah forget it, I don't remember why they were important, skipping to the solution is no fun anyhow. Let's try to reason it out, starting with a smaller number!

So the number `20` has the prime factors <br/>`[ 2, 2, 5 ]`.<br/>It has the factors <br/>`[ 2, 4, 5, 10 ]`.<br/>
Interesting. It looks like every *Factor* can be expressed through products of one or more *Prime Factors*.<br/>
`10 = 2 * 5`<br/>
`5 = 5`<br/>
`4 = 2 * 2`<br/>
`2 = 2`<br/>

Alright, that looks promising, let's see if it is true for the answer we know.
The prime factors of `2520` are<br/>`[ 2, 2, 2, 3, 3, 5, 7 ]`<br/>with factors of <br/>`[2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 18, 20, 21, 24, 28, 30, 35, 36, 40, 42, 45, 56, 60, 63, 70, 72, 84, 90, 105, 120, 126, 140, 168, 180, 210, 252, 280, 315, 360, 420, 504, 630, 840, 1260 ]`.<br/>Well, it looks like every factor can still be represented through one or more products of prime factors.

Now that information sounds interesting, but is it useful? Let's look at the prime factors of `2-10`.<br/>
2: `[2]`<br/>
3: `[3]`<br/>
4: `[2, 2]`<br/>
5: `[5]`<br/>
6: `[2, 3]`<br/>
7: `[7]`<br/>
8: `[2, 2, 2]`<br/>
9: `[3, 3]`<br/>
10: `[2, 5]`<br/>

Let's see what happens if we put the unique prime factors of `2-10` together.<br/>
`[ 2, 2, 2, 3, 3, 5, 7 ]`<br/>
Suspicious...and if we multiply all the unique prime factors together, we get 2520.

Well, it looks like if we take the collection of unique prime numbers (`[2, 3]` and `[2, 2]` becomes `[2, 2, 3]`) then we've got a representation of the smallest number divisible by all of the elements.

So what might the code look like?

```javascript
function getSolution(){    
  var n = 20;
  var factors = [];
  for(var i=2; i<=n; i++){
    var fact = getPrimeFactors(i);
    var tempFactors = factors.slice();
    for(var j=0; j<fact.length;j++){
      var index = tempFactors.indexOf(fact[j]);
      if(index > -1){
        tempFactors.splice(index,1);
      }
      else{
        factors.push(fact[j]);
      }
    }
  }
  return factors.reduce(function(acc, val, index, arr){
    return acc * val;
  });
}
```

Store all the unique factors in an array, get the product using an [Array.prototype.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce?v=control).

"I'll never use this in my life!" I exclaimed while learning prime factors. Good thing I remembered it, turned out to be fun.

I wonder what else I was missing out on...
