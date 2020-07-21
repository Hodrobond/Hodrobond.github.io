---
title: Let's Solve Project Euler Problem 14
date: "2017-06-27T01:00:00.000Z"
description: Euler Problem 14
---

### Longest Collatz sequence
>The following iterative sequence is defined for the set of positive integers:<br/><br/>
n → n/2 (n is even)<br/>
n → 3n + 1 (n is odd)<br/><br/>
Using the rule above and starting with 13, we generate the following sequence:<br/><br/>
13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1<br/><br/>
It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.<br/>
Which starting number, under one million, produces the longest chain?<br/>
NOTE: Once the chain starts the terms are allowed to go above one million.

Brute force:

{% highlight javascript %}
  function getCollatzChainLength(n){
    var chain = [];
    var chainCount = 1;
    while(n !== 1){
      chainCount++;
      if(n%2 === 0)
        n *= 0.5
      else
        n = 3*n+1;
    }
    return chainCount;
  }

  function getSolution(n){
    var n = 1000000;
    var bestLength = 0;
    var bestNum = 0;
    for(var i=n; i>0; i--){
      var chain = getCollatzChainLength(i);
      if(chain > bestLength){
        bestLength = chain;
        bestNum = i;
      }
    }
    return bestNum;
  }
{% endhighlight %}

Runtime (average of 100 iterations):<br/>
2209.2250000000004 ms

Now let's see what we can improve about this. Maybe something along the line of caching our previous Collatz lengths?<br/>
Let's look at the number `13`, which has a length of 10. When we get to 26, we need to recalculate all 10 links of the 13 chain. That looks like it could be improved! Maybe with something like:

{% highlight javascript %}
  var collatzLength = [0,1];
  function getCollatzChainLength(n){
    if(collatzLength[n])
      return collatzLength[n];
    if(n%2 === 0){
      var length = getCollatzChainLength(n*0.5) + 1;
      collatzLength[n] = length;
      return length;
    }
    else{
      var length = getCollatzChainLength(3*n+1) + 1;
      collatzLength[n] = length;
      return length;
    }
  }
{% endhighlight %}

Updated runtime (average of 100 iterations):<br/>
1191.455 ms

Well, caching was faster, let's actually figure out a quantitative value for how many calculations we let the computer skip!<br/>
If we add `var skippedLength = 0` as a global var and update the following line:

{% highlight javascript %}
  if(collatzLength[n]){
    skippedLength += collatzLength[n];
    return collatzLength[n];  
  }
{% endhighlight %}

We can see exactly how many chain iterations we skipped:<br/>`67,631,017`.<br/>How many there were total:<br/>`69,799,628`.<br/>Which means there was only `2,168,611` unique chain numbers and we skipped about 97% of recalculations!<br/>
If we skipped 97% of calculations, why does it still take 50%~ as long though, shouldn't that number be closer to...3%?<br/>
It looks like array manipulation takes up the remainder of our boost, our chain array has a length of `4,286,786,813`, and manipulating arrays of that size definitely takes some effort.

My Naivete is showing, nothing else is jumping at me eager for efficiency.
