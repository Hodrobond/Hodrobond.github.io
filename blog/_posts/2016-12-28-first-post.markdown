---
layout: default
title:  "Hello Mr. Hyde"
date:   2016-12-28 14:31:41 -0800
---
Hello, probably me looking back in time, welcome to your first "github post".

Here's some things I'll probably want to reference eventually:

-bundle exec jekyll serve

-date convention:`YYYY-MM-DD-name-of-post.ext`

-include "front-matter" (3 dashes)

-code snippets:

  {% highlight javascript %}
    function shiftRowRight(a){
      var row = a.map(x => x);
      var previousIndex = row.length - 1;
      for(let i = previousIndex; i >= 0 ; i--){
        if(row[i] !== 0){
          row[previousIndex] = row[i];
          if(i !== previousIndex)
            row[i] = 0;
          previousIndex--;
        }
      }
      return row;
    }
  {% endhighlight %}
