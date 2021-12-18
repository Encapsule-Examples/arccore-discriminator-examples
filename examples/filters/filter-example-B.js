// @encapsule-examples/dmr-hello-world/examples/filters/filter-example-B.js

(function() {

    const arccore = require("@encapsule/arccore");

    // See: https://encapsule.io/docs/ARCcore/filter

    const factoryResponse = arccore.filter.create({
        operationID: "fxxkCdsSQ6CfQxMBQRbspQ",
        operationName: "Filter Example B",
        operationDescription: "A filter object that accepts a number and returns a string value.",

        inputFilterSpec: { ____accept: "jsNumber" },
        outputFilterSpec: { ____accept: "jsString" },

        bodyFunction: function(request_) {
            return {
                error: null,
                result: `Filter [${this.filterDescriptor.operationID}::${this.filterDescriptor.operationName}] received request "${JSON.stringify(request_)}".`
            };
        }

   });

    if (factoryResponse.error) {
        throw new Error(factoryResponse.error);
    }


    module.exports = factoryResponse.result; // filter object

})();
