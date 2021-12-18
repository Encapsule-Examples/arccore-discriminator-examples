#!/usr/bin/env node

"use strict";

(function() {


    /*
      Discriminated Message Routing (DMR) "Hello, World!" demo.

      This script uses the @encapsule/arccore package distribution runtime libraries `filter`
      and `discriminator` to implement a simple example of the Discriminated Message Routing (DMR)
      function delegation/dispatch pattern JavaScript.

      @encapsule/arccore npm package distribution:
      https://www.npmjs.com/package/@encapsule/arccore

      @encapsule/arccore runtime library documentation:
      https://encapsule.io/docs/ARCcore
      https://encapsule.io/docs/ARCcore/filter
      https://encapsule.io/docs/ARCcore/discriminator
      https://encapsule.io/docs/ARCcore/identifier
    */

    // Load and dereference the discriminator runtime library from the @encapsule/arccore distribution package.
    const { discriminator } = require("@encapsule/arccore");

    /* Load a small collection of "filter objects" for use in this example.
       Each filter object is assigned a unique 22-character IRUT hash string (derived from a random v4 UUID) when it is defined.
       Each filter object has a request property that is a function that accepts a single in-parameter value that is "filtered"
       (i.e. validated and normalized) according to a "filter specification" schema object that's specified as part of each filter
       object's definition.
    */

    const exampleFilters = [
        require("./filters/filter-example-A"), // operationID "wxmcHUTQQfi_kDEhblH2kA"
        require("./filters/filter-example-B"), // operationID "fxxkCdsSQ6CfQxMBQRbspQ"
        require("./filters/filter-example-C"), // operationID "6zqeZC0lTJWUuLN6TRNu4Q"
        require("./filters/filter-example-D")  // operationID "Nn58s-nVT1WxpVjaPu4Tow"
    ];

    /* Create a new "discriminator filter object" instance that routes (i.e. delegates) calls made to its request function property
       to the request function property of one of the filter(s) specified in its definition based on runtime analysis of the value
       passed to the discriminator's request function.

       The discriminator filter object factory function accepts an object w/array property `filters` that contains one or more filter
       objects that are required to have inputFilterSpec (i.e. a filter specification schema applied to the filter's request in-parameter
       value) that can be "discriminated" from every other filter's inputFilterSpec by virtue of at least one unique feature
       (e.g a type, a namespace name etc.) The discriminator factory function will let you know via response.error if it cannot discriminate
       between each of your filter's request signatures at runtime.
    */

    const factoryResponse = discriminator.create({
        id: "FYEJo-0nQLyymfjZ-5zGfQ",
        name: "Example DMR Filter A",
        description: "Route filter object's request to 1:N based on runtime analysis of in-parameter value.",
        filters: exampleFilters, // An array of filter objects.
        options: {
            action: "routeRequest" // one of "getFilterID" (default), "getFilter", or "routeRequest"
        }
    });

    /* If response.error is a string then either the factory request is incorrect (not the case here).
       Or, the filter objects in the filters array cannot be dicriminated one from another due to ambiguous overlap in their
    */

    if (factoryResponse.error) {
        throw new Error(factoryResponse.error);
    }

    const exampleDiscriminatorA = factoryResponse.result; // exampleDiscriminatorA is a filter object with property request that is a function.

    const dmrRequests = [
        "Hello, World!",
        Math.PI,
        { foobar: { value: "Hello again, world!" }  },
        { fizbaz: { value: Math.PI } },
        true, // ERROR -- there's no filter that accepts a Boolean request
        { noFilter: true } // ERROR - there's no filter that accepts an object w/Boolean property noFilter
    ];

    let index = 0;
    dmrRequests.forEach((dmrRequest_) => {
        console.log("================================================================");
        console.log(`DMR request #${index++}:`);
        const dmrResponse = exampleDiscriminatorA.request(dmrRequest_);
        console.log(`request: '${JSON.stringify(dmrRequest_)}'`);
        console.log(`response: '${JSON.stringify(dmrResponse)}'`);
        console.log("================================================================");
    });

    console.log("Thank you for playing DMR! And, happy hacking :)");

})();







