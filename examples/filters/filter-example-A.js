// @encapsule-examples/dmr-hello-world/examples/filters/filter-example-A.js

(function() {

    const arccore = require("@encapsule/arccore");

    /*
      See: https://encapsule.io/docs/ARCcore/filter

      A "filter object" is a JavaScript object that has a `filterDescriptor` object property
      containing metadata. And, a `request` function property that provides strong value type
      guarantees over the input data processed by the function. And, the output data returned
      by the function.
    */

    // Filter objects are constructed using a factory function.
    const factoryResponse = arccore.filter.create({

        // operationID is an Internet-Routable Unique Token (IRUT) format v4 UUID allocated for and assigned to this specifc filter.
        // Read about IRUTs here: https://encapsule.io/docs/ARCcore/identifier
        // Make some IRUTs of your own by executing `npm run make_iruts` script in this package.
        operationID: "wxmcHUTQQfi_kDEhblH2kA",
        operationName: "Filter Example A",
        operationDescription: "A filter object that accepts a string and returns another string.",

        // A filter object's `request` function always accepts a single value we refer to as `request`.
        // The `request` value is "filtered" (validated/normalized) using a schema called a "filter specification object"
        // passed to the filter object factory function via `inputFilterSpec` below.

        inputFilterSpec: { ____accept: "jsString" }, // Optional for filters. But, is required for filters used w/discriminator!

        // A filter object's `request` function always returns an object w/`error` and `result` properties.
        // The `error` property is always either the null value type, or an error string. If it's an error string
        // then `result` is invalid and should not be used. Otherwise, `result` is "filtered" using the
        // "filter specification object" (schema) provided via `outputFilterSpec` below.

        outputFilterSpec: { ____accept: "jsString" }, // Optional for filters.

        // A filter object's `request` function can do whatever you need it do do.
        // Note that it will not be called if `request` cannot be validated/normalized per inputFilterSpec.
        // And, that it must always return a response object w/error and optional result properties.

        bodyFunction: function(request_) {
            /*
              Iff bodyFunction gets called by the filter object, then request_ value will always be a string
              as per our inputFilterSpec. Otherwise, bodyFunction will not be called and the caller will receive
              a response.error string explaining why/how the request value they specified is not valid.
            */

            // Here we just return the string length in order to demonstrate the basic requirements of all filter objects.
            return {
                error: null,
                result: `Filter [${this.filterDescriptor.operationID}::${this.filterDescriptor.operationName}] received request "${JSON.stringify(request_)}".`
            };

        }
    });

    // If an error occurred then factoryResponse.error is an error string.
    // If no error occurred then factoryResponse.error === null.
    if (factoryResponse.error) {
        throw new Error(factoryResponse.error);
    }

    // No error occurred meaning that factoryResponse.result is valid and can be used.

    // Being extra verbose here to make it obvious what's going on...
    const filterObject = factoryResponse.result;

    // So, if we:
    const filterResponse = filterObject.request("The length of this string is 32.");

    // We expect filterResponse.error === null unless the call above to filterObject.request is modified.
    if (filterResponse.error) {
        throw new Error(filterResponse.error); // Try changing the call above to invalid input and see for yourself.
    }

    // console.log(filterResponse.result); // prints "32" to the console

    module.exports = filterObject;

})();
