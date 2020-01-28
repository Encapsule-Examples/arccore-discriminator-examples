#!/usr/bin/env node

"use strict";

// ================================================================
/*
  Discriminated Message Routing (DMR) "Hello, World!" demo.

  This script uses the @encapsule/arccore package distribution
  runtime libraries `filter` and `discriminator` to implement
  a simple example of DMR in JavaScript.

  RTL distribution:
  https://www.npmjs.com/package/@encapsule/arccore/v/0.1.8
  git clone git@github.com:Encapsule/ARCcore.git

  RTL documentation:
  https://encapsule.io/docs/ARCcore
  https://encapsule.io/docs/ARCcore/filter
  https://encapsule.io/docs/ARCcore/discriminator
*/
// ================================================================

const arccore = require("@encapsule/arccore");

// We need some filters. At a minimum, two.

// CONSTRUCT FILTER 1
let filterFactoryResponse = arccore.filter.create({
    operationID: "demo", // random IRUT
    operationName: "FILTER #1",
    operationDescription: "Accepts a string value and returns string value.",
    inputFilterSpec: {
        ____types: "jsObject",
        function1: {
            ____types: "jsObject",
            value: {
                ____accept: "jsString",
                ____defaultValue: "<please specify a string value>"
            }
        }
    },
    outputFilterSpec: { ____accept: "jsString" },
    bodyFunction: (request_) => {
        console.log("This is FILTER #1 that accepts only a string value and always returns a string value.");
        switch (request_.function1.value) {
        case "TRIGGER-ERROR":
            return { error: "AN ERROR HAS OCCURRED INSIDE YOUR BODY FUNCTION!" };
        case "TRIGGER-BUG":
            return { error: null, result: { message: "The contract is that this filter is only allowed to return a string." } };
        default:
            return { error: null, result: request_.function1.value };
        }
    }
});
if (filterFactoryResponse.error) {
    console.log("Well, that didn't work out so well.");
    throw new Error(filterFactoryResponse.error);
}
const filter1 = filterFactoryResponse.result;

// CONSTRUCT FILTER 2
filterFactoryResponse = arccore.filter.create({
    operationID: "demo", // random IRUT
    operationName: "FILTER #2",
    operationDescription: "Accepts a numerical value and returns string value.",
    inputFilterSpec: {
        ____types: "jsObject",
        function2: {
            ____types: "jsObject",
            value: {
                ____accept: "jsNumber",
                ____defaultValue: 0
            }
        }
    },
    outputFilterSpec: { ____accept: "jsString" },
    bodyFunction: (request_) => {
        console.log("This is filter 2 that accepts only a numerical value and always returns a string value.");
        return { error: null, result: "" + request_.function2.value };
    }
});
if (filterFactoryResponse.error) {
    console.log("Well, that didn't work out so well.");
    throw new Error(filterFactoryResponse.error);
}
const filter2 = filterFactoryResponse.result;

// CONSTRUCT DISCRIMINATOR

filterFactoryResponse = arccore.discriminator.create({
    options: { action: "routeRequest" }, // ____inValueSet: [ "getFilterID", "getFilter", "routeRequest" ]
    filters: [ filter1, filter2 ]
});
if (filterFactoryResponse.error) {
    console.log("Well, that didn't work out so well.");
    throw new Error(filterFactoryResponse.error);
}
const dmr = filterFactoryResponse.result;

const dmrRequests = [
    { function1: { value: "Hello, world!" }  },
    { function2: { value: Math.PI } },
    { function1: { value: {} } }, // nope
    { function2: { value: "Ah, no." } }, // nope
    "going... nowhere...", // nope
    { function1: { } }, // should get filled in w/default value
    { function1: { value: "TRIGGER-ERROR" } }, // routed but failed explicitly inside the filter
    { function1: { value: "TRIGGER-BUG" } } // routed but failed due to response.result constraint violation
];

let index = 0;
dmrRequests.forEach((dmrRequest_) => {
    console.log("================================================================");
    console.log(`DMR request #${index++}:`);
    const dmrResponse = dmr.request(dmrRequest_);
    console.log(`request: '${JSON.stringify(dmrRequest_)}'`);
    console.log(`response: '${JSON.stringify(dmrResponse)}'`);
    console.log("================================================================");
});

console.log("Thank you for playing DMR! And, happy hacking :)");








