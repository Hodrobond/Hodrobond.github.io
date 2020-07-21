---
title: Let's Solve Project Euler Problem 15
date: "2017-06-27T02:00:00.000Z"
description: Euler Problem 15
---
<style>
  .image-wrapper{
    text-align: center;
    display: block;
  }
</style>

### Lattice paths
>Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner.<br/><br/>
<span class="image-wrapper"><img src="https://projecteuler.net/project/images/p015.png"/></span><br/><br/>
>How many such routes are there through a 20×20 grid?

Recursive:

{% highlight javascript %}
  function countRoutes(m, n){
    if(n === 0 || m === 0)
      return 1;
    return countRoutes(m, n - 1) + countRoutes(m - 1, n);
  }
{% endhighlight %}

Alrighty, slow as a turtle. Let's look at this for a small m/n and see what we can figure out!<br/>
For `4` we check the routes of `(3,2)` and `(2,3)` which each in turn call `(2,2)`. Recalculation is an enemy here and it multiplies faster than bacteria, so let's see if the mysticism of [memoization](https://stackoverflow.com/questions/30386943/how-to-create-a-memoize-function) can help us *magic hand wave* away some of that tedium.

{% highlight javascript %}
  function outerCountRoutes(m,n){
    var routesArr = new Array(m+1);
    for(var i=0; i<=m; i++){
      routesArr[i] = new Array(n+1);
      for(var j=0; j<=n; j++){
        routesArr[i][j] = false;
      }
    }
    return countRoutes(m,n);

    function countRoutes(m, n){
      if(routesArr[m][n])
        return routesArr[m][n];
      if(n === 0 || m === 0)
        return 1;
      routesArr[m][n] = countRoutes(m, n - 1) + countRoutes(m - 1, n);

      return routesArr[m][n];
    }    
  }
{% endhighlight %}
