# What to take away from this:
  - If you need access to a function/method:
    - Only in the template:
      - Use: globalProperties
      - OR : Provide/Inject
    - In setup (or/and the template):
      - Add an object on globalProperties with the function/method
      - OR : Provide/Inject


### Recommended: Use Provide/Inject

 Referenced in this issue is the suggestion that Provide/Inject is more 
 along the lines of what is standard practice:
   - https://github.com/vuejs/core/issues/4403


# Why this exists:

When trying to figure out how to add global state/functionality to an
application, it may be tempting to look at the Plugin documentation and
believe you can attach functions/methods to globalProperties.
You can...BUT. You can not use those functions/methods in script setup.

It took me longer than it should have to figure that out. I eventually
found this issue that describes the nature of this in more detail:
- https://github.com/vuejs/core/issues/4403

Therefore...

There are limitations to the scope of how you can use globalProperties.
I have put this together to demonstrate those limitations, including
some things you might be tempted to try, like using 'this.' in your
script setup.

Finally, while this is called "vue-plugin-exceptions", it is more
specifically related to the scope limitations of globalProperties.

I've chosen to keep the name relating to plugins, as this is where I
encountered it, and it also tests the issue in the context of plugins
as well.
