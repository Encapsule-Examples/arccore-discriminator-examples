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
$ npm start

> dmr-hello-world@1.0.1 start
> node examples/dmr-hello-world.js

================================================================
DMR request #0:
request: '"Hello, World!"'
response: '{"error":null,"result":"Filter [wxmcHUTQQfi_kDEhblH2kA::Filter Example A] received request \"\"Hello, World!\"\"."}'
================================================================
================================================================
DMR request #1:
request: '3.141592653589793'
response: '{"error":null,"result":"Filter [fxxkCdsSQ6CfQxMBQRbspQ::Filter Example B] received request \"3.141592653589793\"."}'
================================================================
================================================================
DMR request #2:
request: '{"foobar":{"value":"Hello again, world!"}}'
response: '{"error":null,"result":"Filter [6zqeZC0lTJWUuLN6TRNu4Q::Filter Example C] received request \"{\"foobar\":{\"value\":\"Hello again, world!\"}}\"."}'
================================================================
================================================================
DMR request #3:
request: '{"fizbaz":{"value":3.141592653589793}}'
response: '{"error":null,"result":"Filter [Nn58s-nVT1WxpVjaPu4Tow::Filter Example D] received request \"{\"fizbaz\":{\"value\":3.141592653589793}}\"."}'
================================================================
================================================================
DMR request #4:
request: 'true'
response: '{"error":"Filter [FYEJo-0nQLyymfjZ-5zGfQ::Example DMR Filter A Request Discriminator] failed while performing main operation. Sorry. There is no filter registered that will accept a request of the provided type.","result":{"name":"[FYEJo-0nQLyymfjZ-5zGfQ::Example DMR Filter A] Filter Set Runtime Discriminator Model","description":"Digraph model of undefined filter object input specs merged together for analysis.","vlist":[{"u":"~","p":{"jsString":"wxmcHUTQQfi_kDEhblH2kA","jsNumber":"fxxkCdsSQ6CfQxMBQRbspQ"}},{"u":"~.foobar","p":{"jsObject":"6zqeZC0lTJWUuLN6TRNu4Q"}},{"u":"~.fizbaz","p":{"jsObject":"Nn58s-nVT1WxpVjaPu4Tow"}}],"elist":[{"e":{"u":"~","v":"~.foobar"}},{"e":{"u":"~","v":"~.fizbaz"}}]}}'
================================================================
================================================================
DMR request #5:
request: '{"noFilter":true}'
response: '{"error":"Filter [FYEJo-0nQLyymfjZ-5zGfQ::Example DMR Filter A Request Discriminator] failed while performing main operation. Sorry. There is no filter registered that will accept a request of the provided type.","result":{"name":"[FYEJo-0nQLyymfjZ-5zGfQ::Example DMR Filter A] Filter Set Runtime Discriminator Model","description":"Digraph model of undefined filter object input specs merged together for analysis.","vlist":[{"u":"~","p":{"jsString":"wxmcHUTQQfi_kDEhblH2kA","jsNumber":"fxxkCdsSQ6CfQxMBQRbspQ"}},{"u":"~.foobar","p":{"jsObject":"6zqeZC0lTJWUuLN6TRNu4Q"}},{"u":"~.fizbaz","p":{"jsObject":"Nn58s-nVT1WxpVjaPu4Tow"}}],"elist":[{"e":{"u":"~","v":"~.foobar"}},{"e":{"u":"~","v":"~.fizbaz"}}]}}'
================================================================
Thank you for playing DMR! And, happy hacking :)

```
