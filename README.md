# DMR "Hello, World!"

**DMR** stands for **D**iscriminated **M**essage **R**outing (DMR) which is a cool way to automate the tedious job of maintaining complex function dispatch logic. And, it rides along atop [filter](https://encapsule.io/docs/ARCcore/filter) that provides strong runtime guarantees for the data.

See also: [**@encapsule/arccore Docs**](https://encapsule.io/docs/ARCcore)

```
$ git clone git@github.com:Encapsule/dmr-hello-world.git
$ cd dmr-hello-world
$ yarn install
$ ./index.js
```

... will print the following to the console:

Take a look at the source. I hope you find this interesting :)


```
================================================================
DMR request #0:
This is FILTER #1 that accepts only a string value and always returns a string value.
request: '{"function1":{"value":"Hello, world!"}}'
response: '{"error":null,"result":"Hello, world!"}'
================================================================
================================================================
DMR request #1:
This is filter 2 that accepts only a numerical value and always returns a string value.
request: '{"function2":{"value":3.141592653589793}}'
response: '{"error":null,"result":"3.141592653589793"}'
================================================================
================================================================
DMR request #2:
request: '{"function1":{"value":{}}}'
response: '{"error":"Filter [2zQtZNHz0Ht4_elp0WtX6A::Discriminator Filter] failed while performing main operation. Filter [f0ntQOZ-QCiqiUV7IUUTiw::FILTER #1] failed while normalizing request input. Error at path '~.function1.value': Value of type 'jsObject' not in allowed type set [jsString]."}'
================================================================
================================================================
DMR request #3:
request: '{"function2":{}}'
response: '{"error":"Filter [2zQtZNHz0Ht4_elp0WtX6A::Discriminator Filter] failed while performing main operation. Filter [wHfGr3ajTVyX3tKessJRvQ::FILTER #2] failed while normalizing request input. Error at path '~.function2.value': Value of type 'jsFunction' not in allowed type set [jsNumber]."}'
================================================================
================================================================
DMR request #4:
request: '"going... nowhere..."'
response: '{"error":"Filter [2zQtZNHz0Ht4_elp0WtX6A::Discriminator Filter] failed while performing main operation. Unrecognized request format. Request signature must match one of filter set {[f0ntQOZ-QCiqiUV7IUUTiw::FILTER #1], [wHfGr3ajTVyX3tKessJRvQ::FILTER #2]}."}'
================================================================
================================================================
DMR request #5:
This is FILTER #1 that accepts only a string value and always returns a string value.
request: '{"function1":{}}'
response: '{"error":null,"result":"<please specify a string value>"}'
================================================================
================================================================
DMR request #6:
This is FILTER #1 that accepts only a string value and always returns a string value.
request: '{"function1":{"value":"TRIGGER-ERROR"}}'
response: '{"error":"Filter [2zQtZNHz0Ht4_elp0WtX6A::Discriminator Filter] failed while performing main operation. Filter [f0ntQOZ-QCiqiUV7IUUTiw::FILTER #1] failed while performing main operation. AN ERROR HAS OCCURRED INSIDE YOUR BODY FUNCTION!"}'
================================================================
================================================================
DMR request #7:
This is FILTER #1 that accepts only a string value and always returns a string value.
request: '{"function1":{"value":"TRIGGER-BUG"}}'
response: '{"error":"Filter [2zQtZNHz0Ht4_elp0WtX6A::Discriminator Filter] failed while performing main operation. Filter [f0ntQOZ-QCiqiUV7IUUTiw::FILTER #1] failed while normalizing response result. Error at path '~': Value of type 'jsObject' not in allowed type set [jsString]."}'
================================================================
Thank you for playing DMR! And, happy hacking :)
```
