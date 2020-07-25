---
title: Let's Solve Project Euler Problem 4
date: "2017-06-14T20:00:00.000Z"
description: Euler Problem 4
---
### Largest palindrome product
>A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
Find the largest palindrome made from the product of two 3-digit numbers.

A Palindrome! Let's ignore spaces, punctuation, and anything else scary for now...we only care about numbers!

Let's figure out what we need to do: A palindromic number reads the same both ways.

If we happen to take that at face value, we might get something along the lines of:

```javascript
function isPalindrome(n){
  if(typeof n == "number")
    n = n.toString();
  return n == n.split("").reverse().join("");
}
```

Or if we decide we will only have string inputs and we're feeling fancy/concise, we can use a one-liner:
```javascript
const isPalindrome = (n) => {return n == n.split("").reverse().join("");}
```

So we put our string down, split it, and reverse it. Then rejoin the array and compare it to the old one.
Let's just take a quick cursory examination of each of those tasks.

1. Splitting the string
  * Minimum O(n)
  * Let's assume we're just splitting on "", the empty string. No complex regex.
2. Reversing the array
  * Minimum O(n)
  * "Here's a wrapper that indexes the array reversed so you don't reverse the array" - No
3. Joining the array
  * Minimum O(n)
  * Still need to iterate through each element to add them together.

Do we really need to iterate through the string 3 times before we can determine whether or not it's a palindrome?
That looks like complexity added through unnecessary conciseness disguised as elegance. Would it be better if we substituted the Array.prototype.split & Array.prototype.join for string iteration and concatenation? A little bit, but we can figure out something better!

Let's break it down:

>A palindromic number reads the same both ways

We were taking the entire word, reversing it, and comparing it against itself.
It sounds like we don't need to read the string more than once though...
Can we just iterate the string and compare the paired end values? (compare the first and last, then second and second from last, etc)

```javascript
function isPalindrome(n){
  for(var i=0; i<n.length - 1; i++){
    if(n[i] !== n[n.length - 1 - i])
      return false;
  }
  return true;
}
```

Alrighty, now we're getting somewhere. Iterating the length of the string once. But we're still comparing each set of values twice! We're comparing the first and last indexes on the first and last iteration! We don't even need to iterate through the entire string! Just iterate through half and compare to the other half; if the number has an odd number of digits then the middle value is moot because it will always be equal to itself (101, 1 == 1, 0 will always equal itself, regardless of what value it takes)!

```javascript
function isPalindrome(n){
  for(var i=0, l=Math.floor(n/2); i<l; i++){
    if(n[i] !== n[n.length - 1 - i])
      return false;
  }
  return true;
}
```

[Here](https://hodrobond.github.io/project-euler/docs/0001_0010/0004.html) is an example which I hope generally illustrates the difference between the first and last approaches.
