---
title: Let's Solve Project Euler Problem 9
date: "2017-06-20T01:00:00.000Z"
description: Euler Problem 9
---

### Special Pythagorean triplet
>A Pythagorean triplet is a set of three natural numbers, $$a < b < c$$, for which,
$$a^2 + b^2 = c^2$$
For example, $$3^2 + 4^2 = 9 + 16 = 25 = 5^2$$.
There exists exactly one Pythagorean triplet for which $$a + b + c = 1000$$.
Find the product $$a * b * c$$.

Brute force: Iterate two loops from 1-1000. Take the square root of the sum of their squares, verify it's a whole number. if A, B, and C sum to 1000, you're done!

```javascript
function getSolution() {
  for(var i=1; i<1000; i++){
    for(var j=1; j<1000; j++){
      var k = Math.sqrt(i*i+j*j);
      if( k === Math.floor(k) && k<1000){
        if(i+j+k === 1000){
          return i*j*k
        }
      }
    }
  }
}
```

Elegant sidestep: $$a^2 + b^2 = c^2$$ and $$a + b + c = 1000$$ are given.<br/>
Let's do a substitution for $$a=2mn$$<br/>
Because $$a^2 + b^2 = c^2$$ we know that $$b=m^2-n^2$$ and $$c=m^2+n^2$$<br/>
Because $$a + b + c = 1000$$ we can do $$2mn + (m^2 -n^2) + (m^2 + n^2) = 1000$$<br/>
Which boils down to $$m(m+n) = 500$$<br/>
Or $$n = (500/m) - m$$<br/>
Because $$m > n$$ and neither can be negative, our solution must be $$m=20, n=5$$<br/>
$$a = 2mn = 2 * 20 * 5 = 200$$<br/>
$$b = m^2 - n^2 = 20^2 - 5^2 = 375$$<br/>
$$c = m^2 + n^2 = 20^2 + 5^2 = 425$$<br/>
