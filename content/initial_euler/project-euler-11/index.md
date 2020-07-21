---
title: Let's Solve Project Euler Problem 11
date: "2017-06-20T03:00:00.000Z"
description: Euler Problem 11
---
<style>
  .number-block{
    text-align: center;
  }
  .red{
    color: red;
  }
  #example-anchor span{
    margin: 5px
  }

  .current{
    background: yellow;
  }

  .highest{
    background: green;
  }
</style>


### Largest product in a grid
>In the 20×20 grid below, four numbers along a diagonal line have been marked in red.<br/>
<div class="number-block">
08 02 22 97 38 15 00 40 00 75 04 05 07 78 52 12 50 77 91 08<br/>
49 49 99 40 17 81 18 57 60 87 17 40 98 43 69 48 04 56 62 00<br/>
81 49 31 73 55 79 14 29 93 71 40 67 53 88 30 03 49 13 36 65<br/>
52 70 95 23 04 60 11 42 69 24 68 56 01 32 56 71 37 02 36 91<br/>
22 31 16 71 51 67 63 89 41 92 36 54 22 40 40 28 66 33 13 80<br/>
24 47 32 60 99 03 45 02 44 75 33 53 78 36 84 20 35 17 12 50<br/>
32 98 81 28 64 23 67 10 <span class="red">26</span> 38 40 67 59 54 70 66 18 38 64 70<br/>
67 26 20 68 02 62 12 20 95 <span class="red">63</span> 94 39 63 08 40 91 66 49 94 21<br/>
24 55 58 05 66 73 99 26 97 17 <span class="red">78</span> 78 96 83 14 88 34 89 63 72<br/>
21 36 23 09 75 00 76 44 20 45 35 <span class="red">14</span> 00 61 33 97 34 31 33 95<br/>
78 17 53 28 22 75 31 67 15 94 03 80 04 62 16 14 09 53 56 92<br/>
16 39 05 42 96 35 31 47 55 58 88 24 00 17 54 24 36 29 85 57<br/>
86 56 00 48 35 71 89 07 05 44 44 37 44 60 21 58 51 54 17 58<br/>
19 80 81 68 05 94 47 69 28 73 92 13 86 52 17 77 04 89 55 40<br/>
04 52 08 83 97 35 99 16 07 97 57 32 16 26 26 79 33 27 98 66<br/>
88 36 68 87 57 62 20 72 03 46 33 67 46 55 12 32 63 93 53 69<br/>
04 42 16 73 38 25 39 11 24 94 72 18 08 46 29 32 40 62 76 36<br/>
20 69 36 41 72 30 23 88 34 62 99 69 82 67 59 85 74 04 36 16<br/>
20 73 35 29 78 31 90 01 74 31 49 71 48 86 81 16 23 57 05 54<br/>
01 70 54 71 83 51 54 69 16 92 33 48 61 43 52 01 89 19 67 48<br/>
</div>
>The product of these numbers is 26 × 63 × 78 × 14 = 1788696.
What is the greatest product of four adjacent numbers in the same direction (up, down, left, right, or diagonally) in the 20×20 grid?

I'm not fond of the words "up" being paired with "down", and "left" being paired with "right". That sounds like a trap for over-iteration!<br/>
If we go through each number, we **don't** need to compare each of the 8 directions, that's just too much. I say we only compare 4.<br/>
If we look at the left-most numbers on the top: 08, 49, 81, 52. We can see that comparing "down" from 08 is the same as comparing "up" from 52. The same goes for left/right, upright/downleft, and upleft/downright. We only need to pick one from each pair and we've got a good representation.

For starters, I'd like to massage the input into a 2d array, in this example I'm assuming the input is space-separated numbers.

{% highlight javascript %}
  function createArray(input){
    var tempArr = input.split(" ");
    var length = Math.sqrt(tempArr.length);
    var arr = new Array(length);
    var count = 0;
    for(var i=0; i<length; i++){
      arr[i] = new Array(length);
      for(var j=0; j<length; j++){
        arr[i][j] = tempArr[count];
        count++;
      }
    }
    return arr;
  }
  var arrString = "08 02 22 ..."
  var arr2d = createArray(arrString);
{% endhighlight %}

Then let's create some helper functions for retrieving the products along those four directions we determined (Please note, the getProducts are safeguarded against accessing out-of-bounds by returning 0):

{% highlight javascript %}
  function getRightProduct(arr, y, x){
    if(x+4 > arr.length)
      return 0;
    var product = 1;
    for(var i=0; i<4; i++){
      product *= arr[y][x+i];
    }
    return product;
  }

  function getDownProduct(arr, y, x){
    if(y+4 > arr.length)
      return 0;
    var product = 1;
    for(var i=0; i<4; i++){
      product *= arr[y+i][x];
    }
    return product;
  }

  function getDownRightProduct(arr, y, x){
    if(y+4 > arr.length || x+4 > arr.length)
      return 0;
    var product = 1;
    for(var i=0; i<4; i++){
      product *= arr[y+i][x+i];
    }
    return product;
  }

  function getDownLeftProduct(arr, y, x){
    if(y+4 > arr.length || x-3 < 0)
      return 0;
    var product = 1;
    for(var i=0; i<4; i++){
      product *= arr[y+i][x-i];
    }
    return product;
  }
{% endhighlight %}

And then we tie everything together:

{% highlight javascript %}
  function getSolution(arr){
    var arr = "08 02 22 ..."
    var arr = createArray(arr);
    var highest = 0;
    for(var i=0; i<arr.length; i++){
      for(var j=0; j<arr[i].length; j++){
        var right = getRightProduct(arr, j, i);
        var down = getDownProduct(arr, j, i);
        var downRight = getDownRightProduct(arr, j, i);
        var downLeft = getDownLeftProduct(arr, j, i);
        var tempMax = Math.max(right, down, downRight, downLeft);
        highest = (tempMax > highest) ? tempMax : highest;
      }
    }
    return highest;
  }
{% endhighlight %}

<div id="example-anchor" class="number-block"></div>
<div id="current-anchor"></div>
<div id="highest-anchor"></div>
<button id="run-demo">Run Demo</button>

<script>
  function getRightProduct(arr, y, x){
    if(x+4 > arr.length)
      return 0;
    var product = 1;
    for(var i=0; i<4; i++){
      product *= arr[y][x+i];
    }
    return product;
  }

  function getDownProduct(arr, y, x){
    if(y+4 > arr.length)
      return 0;
    var product = 1;
    for(var i=0; i<4; i++){
      product *= arr[y+i][x];
    }
    return product;
  }

  function getDownRightProduct(arr, y, x){
    if(y+4 > arr.length || x+4 > arr.length)
      return 0;
    var product = 1;
    for(var i=0; i<4; i++){
      product *= arr[y+i][x+i];
    }
    return product;
  }

  function getDownLeftProduct(arr, y, x){
    if(y+4 > arr.length || x-3 < 0)
      return 0;
    var product = 1;
    for(var i=0; i<4; i++){
      product *= arr[y+i][x-i];
    }
    return product;
  }
  function createArray(input){
    var tempArr = input.split(" ");
    var length = Math.sqrt(tempArr.length);
    var arr = new Array(length);
    var count = 0;
    for(var i=0; i<length; i++){
      arr[i] = new Array(length);
      for(var j=0; j<length; j++){
        arr[i][j] = tempArr[count];
        count++;
      }
    }
    return arr;
  }

  var input = "08 02 22 97 38 15 00 40 00 75 04 05 07 78 52 12 50 77 91 08 49 49 99 40 17 81 18 57 60 87 17 40 98 43 69 48 04 56 62 00 81 49 31 73 55 79 14 29 93 71 40 67 53 88 30 03 49 13 36 65 52 70 95 23 04 60 11 42 69 24 68 56 01 32 56 71 37 02 36 91 22 31 16 71 51 67 63 89 41 92 36 54 22 40 40 28 66 33 13 80 24 47 32 60 99 03 45 02 44 75 33 53 78 36 84 20 35 17 12 50 32 98 81 28 64 23 67 10 26 38 40 67 59 54 70 66 18 38 64 70 67 26 20 68 02 62 12 20 95 63 94 39 63 08 40 91 66 49 94 21 24 55 58 05 66 73 99 26 97 17 78 78 96 83 14 88 34 89 63 72 21 36 23 09 75 00 76 44 20 45 35 14 00 61 33 97 34 31 33 95 78 17 53 28 22 75 31 67 15 94 03 80 04 62 16 14 09 53 56 92 16 39 05 42 96 35 31 47 55 58 88 24 00 17 54 24 36 29 85 57 86 56 00 48 35 71 89 07 05 44 44 37 44 60 21 58 51 54 17 58 19 80 81 68 05 94 47 69 28 73 92 13 86 52 17 77 04 89 55 40 04 52 08 83 97 35 99 16 07 97 57 32 16 26 26 79 33 27 98 66 88 36 68 87 57 62 20 72 03 46 33 67 46 55 12 32 63 93 53 69 04 42 16 73 38 25 39 11 24 94 72 18 08 46 29 32 40 62 76 36 20 69 36 41 72 30 23 88 34 62 99 69 82 67 59 85 74 04 36 16 20 73 35 29 78 31 90 01 74 31 49 71 48 86 81 16 23 57 05 54 01 70 54 71 83 51 54 69 16 92 33 48 61 43 52 01 89 19 67 48"
  var newArr = createArray(input);
  var target = document.getElementById("example-anchor");
  var row;
  for(var i=0; i<newArr.length; i++){
    row = document.createElement("div");
    row.setAttribute('class', 'row');
    target.append(row);
    var elem;
    for(var j=0; j<newArr[i].length; j++){
      elem = document.createElement("span");
      elem.setAttribute('id', 'num-'+i+"-"+j);
      elem.textContent = newArr[i][j];
      row.append(elem);
    }
  }
  function runDemo(){
    var anchor = document.getElementById("example-anchor");
    var currentValue = document.getElementById("current-anchor");
    var highest = document.getElementById("highest-anchor");
    var input = "08 02 22 97 38 15 00 40 00 75 04 05 07 78 52 12 50 77 91 08 49 49 99 40 17 81 18 57 60 87 17 40 98 43 69 48 04 56 62 00 81 49 31 73 55 79 14 29 93 71 40 67 53 88 30 03 49 13 36 65 52 70 95 23 04 60 11 42 69 24 68 56 01 32 56 71 37 02 36 91 22 31 16 71 51 67 63 89 41 92 36 54 22 40 40 28 66 33 13 80 24 47 32 60 99 03 45 02 44 75 33 53 78 36 84 20 35 17 12 50 32 98 81 28 64 23 67 10 26 38 40 67 59 54 70 66 18 38 64 70 67 26 20 68 02 62 12 20 95 63 94 39 63 08 40 91 66 49 94 21 24 55 58 05 66 73 99 26 97 17 78 78 96 83 14 88 34 89 63 72 21 36 23 09 75 00 76 44 20 45 35 14 00 61 33 97 34 31 33 95 78 17 53 28 22 75 31 67 15 94 03 80 04 62 16 14 09 53 56 92 16 39 05 42 96 35 31 47 55 58 88 24 00 17 54 24 36 29 85 57 86 56 00 48 35 71 89 07 05 44 44 37 44 60 21 58 51 54 17 58 19 80 81 68 05 94 47 69 28 73 92 13 86 52 17 77 04 89 55 40 04 52 08 83 97 35 99 16 07 97 57 32 16 26 26 79 33 27 98 66 88 36 68 87 57 62 20 72 03 46 33 67 46 55 12 32 63 93 53 69 04 42 16 73 38 25 39 11 24 94 72 18 08 46 29 32 40 62 76 36 20 69 36 41 72 30 23 88 34 62 99 69 82 67 59 85 74 04 36 16 20 73 35 29 78 31 90 01 74 31 49 71 48 86 81 16 23 57 05 54 01 70 54 71 83 51 54 69 16 92 33 48 61 43 52 01 89 19 67 48"
    var arr = createArray(input);
    var highest = 0;
    var timer = 0;
    for(var i=0; i<arr.length; i++){
      for(var j=0; j<arr[i].length; j++){
        (function(i,j,timer){
          setTimeout(function(){
              var currentClasses = document.getElementsByClassName("current");
              while(currentClasses.length > 0){
                currentClasses.item(0).classList.remove("current");
              }
              document.getElementById("num-"+i+"-"+j).classList.add("current");
              var right = getRightProduct(arr, j, i);
              var down = getDownProduct(arr, j, i);
              var downRight = getDownRightProduct(arr, j, i);
              var downLeft = getDownLeftProduct(arr, j, i);
              document.getElementById("current-anchor").innerHTML = "right:"+right+"<br/>"+
                                                                    "down:"+down+"<br/>"+
                                                                    "downRight:"+downRight+"<br/>"+
                                                                    "downLeft:"+downLeft
              var tempMax = Math.max(right, down, downRight, downLeft);
              if(tempMax > highest){
                var highestClasses = document.getElementsByClassName("highest");
                while(highestClasses.length > 0){
                  highestClasses.item(0).classList.remove("highest");
                }
                document.getElementById("num-"+i+"-"+j).classList.add("highest");
                switch(tempMax){
                  case right:
                    document.getElementById("num-"+i+"-"+(j+1)).classList.add("highest");
                    document.getElementById("num-"+i+"-"+(j+2)).classList.add("highest");
                    document.getElementById("num-"+i+"-"+(j+3)).classList.add("highest");
                    break;
                  case down:
                    document.getElementById("num-"+(i+1)+"-"+j).classList.add("highest");
                    document.getElementById("num-"+(i+2)+"-"+j).classList.add("highest");
                    document.getElementById("num-"+(i+3)+"-"+j).classList.add("highest");
                    break;
                  case downRight:
                    document.getElementById("num-"+(i+1)+"-"+(j+1)).classList.add("highest");
                    document.getElementById("num-"+(i+2)+"-"+(j+2)).classList.add("highest");
                    document.getElementById("num-"+(i+3)+"-"+(j+3)).classList.add("highest");
                    break;
                  case downLeft:
                    document.getElementById("num-"+(i+1)+"-"+(j-1)).classList.add("highest");
                    document.getElementById("num-"+(i+2)+"-"+(j-2)).classList.add("highest");
                    document.getElementById("num-"+(i+3)+"-"+(j- 3)).classList.add("highest");
                    break;
                }
                document.getElementById("highest-anchor").innerHTML = "Highest:"+tempMax;
              }
              highest = (tempMax > highest) ? tempMax : highest;
            }, timer)
          })(i,j,timer)
        timer += 100;
      }
    }
    setTimeout(function(){
        var currentClasses = document.getElementsByClassName("current");
        while(currentClasses.length > 0){
          currentClasses.item(0).classList.remove("current");
        }
      }, timer+50)
    return highest;
  }
  document.getElementById("run-demo").onclick = runDemo;
</script>
