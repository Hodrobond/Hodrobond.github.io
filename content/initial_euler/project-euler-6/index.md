---
title: Let's Solve Project Euler Problem 6
date: "2017-06-16T01:00:00.000Z"
description: Euler Problem 6
---

We need [Katex](https://katex.org//) Today for rendering our equations.

### Sum square difference
>The sum of the squares of the first ten natural numbers is,
12 + 22 + ... + 102 = 385
The square of the sum of the first ten natural numbers is,
(1 + 2 + ... + 10)2 = 552 = 3025
Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025 − 385 = 2640.
Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.

First things first for 1-10:<br/>
Sum of Squares: `1^2 + 2^2 + 3^2 + 4^2 + 5^2 + 6^2 + 7^2 + 8^2 + 9^2 + 10^2 = 385`

```javascript
function getSumOfSquares(n){
  var product = 0;
  for(var i=0; i<=n; i++){
    product += (i*i);
  }
  return product;
}
```

Square of Sums `(1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10)^2 = 3025`:
```javascript
function getSquareOfSum(n){
  var sum = 0;
  for(var i=0; i<=n; i++){
    sum += i;
  }
  return (sum*sum);
}
```

The brute force is pretty simple:

```javascript
function getSolution(){
  var n = 100;
  var sumOfSquares = getSumOfSquares(n);
  var squareOfSums = getSquareOfSum(n);
  return (squareOfSums - sumOfSquares);
}
```

But that's not why we're here. We want to know the magic. Please Math, tell us your secrets!

We have illustrations!

<style>
  .box{
    height: 10px;
    width: 10px;
    display: inline-block;
    border: 1px solid black;
  }

  .row{
    font-size: 0;
    display: block;
  }

  .container:nth-child(2n) .row .box{
    background: blue;
  }

  .box.same{
    background: red !important;
  }

  .box.different{
    background: purple !important;
  }

  .box.someDifferent{
    background: green !important;
  }
</style>

<div id="test"></div>




We want the sum of all of those squares. Let's say we have 3 coordinates: `(a, b, c)`.<br/>
`a` will represent which of the larger squares we are looking at (0 for the smallest, 1 for the 2x2, 2 for the 3x3, etc).<br/>
`b` will represent horizontal position within a larger square.<br/>
`c` will represent vertical position within a larger square.<br/>

<div id="test2"></div>

There are `n` positions where `(a, b, c)` are all equal. For our n=4 0-indexed: `(0, 0, 0)`, `(1, 1, 1)`, `(2, 2, 2)` and `(3, 3, 3)`.<br/>

<button id="toggleSame">Toggle Same</button>

There are $$2\binom{n}{3}$$ triplets where all of the entries are different.<br/>
<button id="toggleAllDifferent">Toggle All Different</button>

There are $$3\binom{n}{2}$$ triplets where two entries are equal and one is different.<br/>
<button id="toggleSomeDifferent">Toggle some equal</button>

Using our handy dandy n-choose-k equation:

$$\binom{n}{k} = \frac{n\cdot(n-1)\cdots (n-k+1)}{k!} = \frac{n!}{k!(n-k)!}$$

$$n + 2\binom{n}{3} + 3\binom{n}{2} = n + 2\frac{n!}{3! * (n - 3)!} + 3\frac{n!}{2! * (n - 2)!} = \frac{n(n+1)(2n+1)}{6}$$

Testing that with `n = 10` we get the expected `385`. Alrighty, Sum of Squares boiled down to math.

Time for the Square of Sums! Let's start [here](https://math.stackexchange.com/a/329357):

$$
\begin{array}{ccl}
\left(\sum\limits_{j=0}^{n-1}Z_j\right)^2&=&\left(\sum\limits_{i=0}^{n-1}Z_i\right)\left(\sum\limits_{j=0}^{n-1}Z_j\right)\\
&=&\sum\limits_{j=0}^{n-1}Z_j\left(Z_j+\sum\limits_{j\neq i}Z_i\right)\\
&=&\sum\limits_{j=0}^{n-1}Z_j^2+\sum\limits_{j\neq i}Z_iZ_j\\
\end{array}
$$

$$=\frac{n^2(n+1)^2}{4}$$

So we can find the difference!

$$\frac{n^2(n+1)^2}{4} - n + 2\frac{n!}{3! * (n - 3)!} + 3\frac{n!}{2! * (n - 2)!} = \frac{n(3n^3 + 2n^2 - 3n - 2)}{12}$$

There we go, one nice equation.

<script>
  function hasClass(target, nameOfClass){
    return (" " + target.className + " ").replace(/[\n\t]/g, " ").indexOf(nameOfClass) > -1;
  }

  function createSquares(n, anchor){
    var target = document.getElementById(anchor);
    for(var a=1; a<=n; a++){
      var newContainer = document.createElement("div");
      newContainer.setAttribute('class', 'container');
      target.append(newContainer);
      for(var b=0; b<a; b++){
        var newRow = document.createElement("div");
        newRow.setAttribute('class', 'row');
        newContainer.append(newRow);      
        for(var c=0; c<a; c++){
          var newBox = document.createElement("div");
          newBox.setAttribute('class', 'box');
          newRow.append(newBox);
        }
      }
    }
  }

  function toggleSquaresSame(n, anchor){
    var target = document.getElementById(anchor);
    for(var a=0; a < n; a++){
      var newContainer = target.children[a];
      for(var b=0; b<=a; b++){
        var newRow = newContainer.children[b];
        for(var c=0; c<=a; c++){
          var newBox = newRow.children[c];
          if(a === b && a === c){
            if(hasClass(newBox, "same"))
              newBox.classList.remove('same');
            else
              newBox.classList.add('same');
          }
        }
      }
    }
  }

  function toggleSomeDifferent(n, anchor){
    var target = document.getElementById(anchor);
    for(var a=0; a < n; a++){
      var newContainer = target.children[a];
      for(var b=0; b<=a; b++){
        var newRow = newContainer.children[b];
        for(var c=0; c<=a; c++){
          var newBox = newRow.children[c];
          if(a === b && a !== c ||
          b === c && b !== a ||
          a === c && a !== b){
            if(hasClass(newBox, "someDifferent"))
              newBox.classList.remove('someDifferent');
            else
              newBox.classList.add('someDifferent');            
          }
        }
      }
    }
  }

  function toggleAllDifferent(n, anchor){
    var target = document.getElementById(anchor);
    for(var a=0; a < n; a++){
      var newContainer = target.children[a];
      for(var b=0; b<=a; b++){
        var newRow = newContainer.children[b];
        for(var c=0; c<=a; c++){
          var newBox = newRow.children[c];
          if(a !== b && a !== c && b !== c){
            if(hasClass(newBox, "different"))
              newBox.classList.remove('different');
            else
              newBox.classList.add('different');
          }
        }
      }
    }
  }

  createSquares(4, "test");
  createSquares(4, "test2");
  document.getElementById("toggleSame").onclick = function(){
    toggleSquaresSame(4, "test2");
  }
  document.getElementById("toggleSomeDifferent").onclick = function(){
    toggleSomeDifferent(4, "test2");
  }

  document.getElementById("toggleAllDifferent").onclick = function(){
    toggleAllDifferent(4, "test2");
  }


</script>
