---
layout: default
title:  "Let's Solve Project Euler Problem 1"
date:   2017-6-13 8:00:00 -0800
---
Hello probably me again. Still looking back in time.

Today I am interested in explaining to myself why [Project Euler](https://projecteuler.net/) is so fun!

The short answer is: "Math".<br>
The long answer is: "Different Math".

Let's begin with problem 1:

### Multiples of 3 and 5
>If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
Find the sum of all the multiples of 3 or 5 below 1000.

There are two immediately obvious approaches.

1. Iterate from 1-1000 (inclusive), modulus, and sum
   * Iterates once through all the items
   * Checks modulus of 3 && 5 on each element
   * Sums as we proceed
2. Create an array, iterate by increments of 3/5 (marking the increments), then summing the marked elements.
  * Iterates once by 3's, once by 5's, then once by 1's
  * Sum on last iteration
  * Requires an additional array.

[Here](https://hodrobond.github.io/project-euler/docs/0001_0010/0001.html) is a link to the two functions running with a slight delay so the execution is observable.

From inspection, it looks like #1 will run faster, let's see if I'm right using [performance.now()](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now).

Running attempt #1 1000 times and taking the average resulted in: 0.004790000021457672 ms

  {% highlight javascript %}
    var sum = 0;
    for(var i=0; i< 1000; i++){
    if(i % 5 === 0 || i % 3 === 0){
      sum += i;
        }
    }
    return sum
  {% endhighlight %}

Running attempt #2 1000 times and taking the average resulted in: 0.04011499987542629 ms

{% highlight javascript %}
  var arr = [];
  var sum = 0;
  for(var i=3; i<1000; i+=3){
    arr[i] = true;
  }
  for(var i=5; i<1000; i+=5){
    arr[i] = true;
  }
  for(var i=0; i<1000; i++){
    if(arr[i] === true)
      sum += i;
  }
{% endhighlight %}

So it looks like our first attempt was quicker by a factor of about *10x*.

Alright. This was probably a bad example where immediate intuition resulted in an appropriate solution. I promise the other ones are more fun...
