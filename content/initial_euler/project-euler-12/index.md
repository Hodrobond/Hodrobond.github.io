---
title: Let's Solve Project Euler Problem 12
date: "2017-06-22T01:00:00.000Z"
description: Euler Problem 12
---

### Highly divisible triangular number
>The sequence of triangle numbers is generated by adding the natural numbers. So the 7th triangle number would be 1 + 2 + 3 + 4 + 5 + 6 + 7 = 28. The first ten terms would be:<br/>
1, 3, 6, 10, 15, 21, 28, 36, 45, 55, ...<br/>
Let us list the factors of the first seven triangle numbers:<br/>
 1: 1<br/>
 3: 1,3<br/>
 6: 1,2,3,6<br/>
10: 1,2,5,10<br/>
15: 1,3,5,15<br/>
21: 1,3,7,21<br/>
28: 1,2,4,7,14,28<br/>
We can see that 28 is the first triangle number to have over five divisors.<br/>
What is the value of the first triangle number to have over five hundred divisors?<br/>

Well, we have our handy-dandy getFactors function:

```javascript
function getFactors(n){
  let arr = [1],
    i = 2,
    max = Math.floor(Math.sqrt(n));

  while (i < max) {
    if (n % i === 0) {
      arr.push(i);
      let k = n / i;
      if (i !== k) {
        arr.push(k);
      }
      max = k;
    }
    i++;
  }
  return arr.sort((a, b) => a - b);
}
```

So what happens if we try to brute force it?

```javascript
function getSolution() {
  var n = 500;
  var x = 0,
    y = 1;

  while (getFactors(x).length <= n) {
    x += y;
    y++;
  }
  return x
}
```

Alright, now what's the fun way? Is there a jetpack that can boost us to the last step? No? Alright, let's go slowly! getFactors is fine for now, we're only iterating until the square root of the number, not much to optimize there.

There is a greener pasture, but we're going to have to climb some hills to get there.

For starters, we can write an integer $$n$$ as $$n = p_1^{a_1} * p_2^{a_2} * p_3^{a_3} * ...$$ where $$p_n$$ is a distinct prime number and $$a_n$$ is the exponent.<br/>
For example $$28 = 4 * 7 = 2^2 * 7^1$$.<br/>
Additionally, the number of divisors $$D(n)$$ may be obtained from the equation: $$D(n) = (a_1+1) + (a_2+1) + (a_3+1) + ...$$<br/>
So for 28: $$(2+1) + (1+1) = 6$$ and we know the factors are `[1, 2, 4, 7, 14, 28]`

Since we're dealing with primes and I'm growing tired of Eratosthenes I guess we're going to learn about the [Sieve of Atkin](https://en.wikipedia.org/wiki/Sieve_of_Atkin) today too!

There are three main bits of information we need to focus on, and I'll just let [Atkin speak for himself on the validity of these statements](http://www.ams.org/journals/mcom/2004-73-246/S0025-5718-03-01501-1/S0025-5718-03-01501-1.pdf):

1. >"All numbers n with modulo-sixty remainder 1, 13, 17, 29, 37, 41, 49, or 53 have a modulo-four remainder of 1. These numbers are prime if and only if the number of solutions to $$4x^2 + y^2 = n$$ is odd and the number is squarefree" (Theorem 6.1)
2. >"All numbers n with modulo-sixty remainder 7, 19, 31, or 43 have a modulo-six remainder of 1. These numbers are prime if and only if the number of solutions to $$3x^2 + y^2 = n$$ is odd and the number is squarefree" (Theorem 6.2)
3. >"All numbers n with modulo-sixty remainder 11, 23, 47, or 59 have a modulo-twelve remainder of 11. These numbers are prime if and only if the number of solutions to $$3x^2 − y^2 = n$$ is odd and the number is squarefree" (Theorem 6.3)

That's kind of a lot of moduli to consider...<br/>
1. (i % 60 === 1) || (i % 60 === 13) || (i % 60 === 17) || (i % 60 === 29) || (i % 60 === 37) ||
(i % 60 === 41) || (i % 60 === 49) || (i % 60 === 53)<br/>
2. (i % 60 === 7) || (i % 60 === 19) || (i % 60 === 31) || (i % 60 === 43)<br/>
3. (i % 60 === 11) || (i % 60 === 23) || (i % 60 === 47) || (i % 60 === 59)<br/>

We can consider $$n*mod(m) = r$$, r in $$R = {r : Nat0, r < m}$$, where Nat0 is the set of natural numbers beginning at 0 {0,1,2,3,...}<br/>
If we choose elements of R that are relatively prime to m, then every integer that satisfies the expression will be relatively prime to m or prime.<br/>
Relatively Prime: They share no common divisors! 4 is relatively prime to 9 ($$2^2$$ vs $$3^2$$), 9 is relative prime to 14 ($$3^2$$ vs $$2*7$$).<br/>

Let's look at our quadratics and consider the equation above, we can do some rewriting:

1. $$n = 4*x^2 + y^2$$.
  * n % 60 = r where r in R1b = {r : 1, 5, 9, 13, 17, 21, 25, 29, 33, 37, 41, 45, 49, 53, 57}
  * becomes
  * n % 12 = r where r in R1a = {r : 1, 5, 9}
2. $$n = 3x^2 + y^2$$.
  * n % 60 = r where r in R2b = {r : 1, 7, 13, 19, 25, 31, 37, 43, 49, 55}
  * becomes
  * n % 12 = r where r in R2a = {r : 1, 7}
3. $$n = 3x^2 - y^2$$.
  * n % 60 = r where r in R3b = {r : 11, 23, 35, 47, 59}
  * becomes
  * n % 12 = r where r in R3a = {r : 11}

Now I've heard that we can remove some more elements from there. There appear to be [two large reasons for this](https://stackoverflow.com/a/12066272/3892581):

1. "Any value of r in a set R that is not relatively prime to the m with which it is paired will serve only to include values for n that are composite integers with one or more prime factors of m, none of which will be prime numbers"
  * 9 is not relatively prime to 12 ($$3^2$$ vs $$2^2 * 3$$, sharing a 3), let's remove it
2. "In the paper, the wheel factorizations create sets of integers that overlap, including overlapping primes. While they were convenient and the overlap didn't matter for the theorems, in an algorithm it is wasteful if it can be easily avoided"
  * Since 1 is already in R1a, we can remove it from R2a.

That leaves us with:

1. n % 12 = r where r in R1a = {r : 1, 5}
2. n % 12 = r where r in R2a = {r : 7}
3. n % 12 = r where r in R3a = {r : 11}

Alrighty, so our sieve will look something like:

```javascript
function sievePrimesAtkin(max){
  var sieve = [];
  var sqrtMax = Math.sqrt(max);

  for(var i=0; i<max; i++){
    sieve[i] = false;
  }
  sieve[0] = false;
  sieve[1] = false;
  sieve[2] = true;
  sieve[3] = true;

  for(var i=1; i<=sqrtMax; i++){
    for(var j=1; j<sqrtMax; j++){
      var n = (4 * i * i) + (j * j);
      if(n <= max && (n % 12 === 1 || n % 12 === 5))
        sieve[n] = !sieve[n];
      n = (3 * i * i) + (j * j);
      if(n <= max && (n % 12 === 7))
        sieve[n] = !sieve[n];
      n = (3 * i * i) - (j * j);
      if(i > j && n <= max && (n % 12 === 11))
        sieve[n] = !sieve[n]
    }
  }
  for(var i=5; i<=sqrtMax; i++){
    if(sieve[i]){
      var nSq = i * i;
      for(var j=nSq; j<=max; j+=nSq)
        sieve[j] = false;
    }
  }
  var primes = [];
  for(var i=0; i<max; i++){
    if(sieve[i] === true)
      primes.push(i);
  }
  return primes;
}
```

Now let's compare our runtimes, on an average of 100 runs to sieve up to 2 million I got:<br/>
Eratosthenes: 181.94400000000002 ms<br/>
Atkin: 150.14750000000004ms

They're comparable, and as it turns out Atkin is pretty reliant upon those small optimizations we made earlier. Atkin can be faster, but it takes a bit more effort and knowledge (and that's why we're here, aren't we?).

Some hills down, let's start up the next. We've got our tools, time to combine them!

```javascript
function triangleTest(){
  var t=1;
  var a=1;
  var count=0;
  var tt, i, exponent;
  var primeSieve = sievePrimesAtkin(65500);
  while(count <= 500){
    count = 1;
    a += 1;
    t += a;
    tt = t;
    for(var i=0; i<primeSieve.length; i++){
      if(primeSieve[i] * primeSieve[i] > tt){
        count *= 2;
        break;
      }
      exponent = 1;
      while(tt % primeSieve[i] == 0){
        exponent++;
        tt = tt/primeSieve[i];
      }
      if(exponent > 1)
        count = count * exponent;
      if(tt == 1)
        break;
    }
  }
  return t;
}
```

Comparisons of runtimes:

1. Original brute force: 663.8050000000001 ms<br/>
2. Improved with Atkin: 13.5 ms

Can we get this better?

Well we know that $$\sum_{i=1}^{n}i = \frac{n * (n+1)}{2}$$.

We also know that `n` and `n+1` are coprime (no common prime factors). So the number of divisors may be represented as:

1. $$D(t) = D(\frac{n}{2}) * D(n+1)$$ if n is even
2. $$D(t) = D(n) * D(\frac{n+1}{2})$$ if (n+1) is even

Sounds like if we're dealing with the divisors themselves, it should be quicker than dealing with the larger triangle numbers. We can additionally use a smaller prime number for the sieve.

```javascript
function triangleImproved() {
  var n = 3;
  var Dn = 2;
  var primeDivisors = 2;
  var count = 0;
  var n1, Dn1, i, exponent;
  var primeSieve = sievePrimesAtkin(1000);
  while (count <= 500) {
    n += 1;
    n1 = n;
    if (n1 % 2 === 0)
      n1 = n1 / 2;
    Dn1 = 1;
    for (var i = 0; i < primeSieve.length; i++) {
      if (primeSieve[i] * primeSieve[i] > n1) {
        Dn1 *= 2;
        break;
      }
      exponent = 1;
      while (n1 % primeSieve[i] === 0) {
        exponent++;
        n1 = n1 / primeSieve[i];
      }
      if (exponent > 1)
        Dn1 = Dn1 * exponent;
      if (n1 == 1)
        break;
    }
    count = Dn * Dn1;
    Dn = Dn1;
  }
  return n * (n - 1) / 2;
}
```

For this improved version we have an average runtime of: 1.43 ms, which appears to be more than 100x faster than our initial brute force attempt.