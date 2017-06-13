---
layout: default
title:  "Let's Solve Project Euler Problem 3"
date:   2017-6-13 12:00:00 -0800
---
Wow, *THREE* posts in one day?

### Largest prime factor
>The prime factors of 13195 are 5, 7, 13 and 29.<br/>
>What is the largest prime factor of the number 600851475143 ?

Well, 600851475143 is a pretty large number, but it doesn't require any special coercions yet. 12 digits is reasonable.

#### The Fool begins his journey
Oh Oh, I know, I know! Let's just do an iteration, modulus, check primality, and store the highest! Maybe something like...

{% highlight javascript %}
  function isPrime(n){
    for(var i=2; i<n; i++){
      if(n % i === 0)
        return false
    }
    return true;
  }
  function getLargestPrimeFactor(n){
    var largest = 0;
    for(var i=0; i<n; i++){
      if(n % i === 0 && isPrime(i))
        largest = i;
    }
    return largest;
  }
{% endhighlight %}

Alrighty, let's try a smaller input we're aware of the answer for: 13195.

The average from 100 iterations took
0.21744999999999962 ms

Well, that's taking quite a while and we still have 7 more digits to add! Let's see if we can find something better!

#### The Fool meets the Magician
Let's try using that [Sieve of Erasthones](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes) I like so much. Will the right tool help?

{% highlight javascript %}
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
  var primes = sievePrimes(2000000);
  function isPrime(n){
    for(var i=0; i<primes.length; i++){
      if(primes[i] === n)
        return true;
      if(primes[i] > n)
        return false;
    }
    return false;
  }

  function getLargestPrimeFactor(n){
    var largest = 0;
    for(var i=0; i<n; i++){
      if(n % i === 0 && isPrime(i))
        largest = i;
    }
    return largest;
  }
{% endhighlight %}

the average iteration from 100 took:
0.14749999999999885 ms

Alrighty. We've got an improvement on our small N. We've also tackled the issue of determining primality for larger numbers which will become evident with larger inputs.

#### The Fool meets the High Priestess
Let's calm down, take a step back and figure out what we actually want.
The largest prime factor. So we need to find primes and determine if they are factors, or find factors and determine if they are prime...right?
Why not just find the prime factors directly?

{% highlight javascript %}
  function getSolution(){
    var n = 600851475143;
    var half = Math.floor(n/2);
    for(var i=2; i<half; i++){
      if(n%i === 0){
        //divide the number by the factor
        n = n/i;
        //The last factor will be the largest
        if(n === 1)
          return i;
        i--; //make sure duplicate factors are caught
      }
    }
  }
{% endhighlight %}

1. Iterate up until half of the number.
  * There is no way ∃ n ∋ k/2 < n < k && k % n == 0 where n and k are integers.
2. i will iterate until half of n, bumping into all of the factors along the way.
  * Starting the count at 2, we ensure all the small primes are removed first. 10/2 == 5.
  * Removing factors significantly reduces the number of iterations required (10000 / 2 = 5000, we've already split the numbers we must iterate through in half!)
  * By removing every factor incrementally, we can ensure there is no smaller i for which n is divisible. 20 is divisible by 10, but it's also divisible by 2. 20 / 2 = 10 --> 10 / 2 = 5 --> any non-prime number won't appear.

For the same input (13195), the average iteration took:
0.0012000000000000454 ms

Well, that's an entirely different tier of improvement!

Let's try it with our large input (600851475143).
average iteration:
0.1238499999999999 ms

Well it looks like our final solution works faster on the 12 digit input than our initial solution did on the 5 digit input. I'll call that an improvement.
