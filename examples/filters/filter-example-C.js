// @encapsule-examples/dmr-hello-world/examples/filters/filter-example-C.js

(function() {

    const arccore = require("@encapsule/arccore");

    const factoryResponse = arccore.filter.create({
        // Create a v4 UUID-based IRUT by calling @encapsule/arccore.identifier.irut.fromEther()
        operationID: "6zqeZC0lTJWUuLN6TRNu4Q",
        operationName: "Filter Example C",
        operationDescription: "A slightly more complex inputFilterSpec and bodyFunction.",

        inputFilterSpec: {
            ____types: "jsObject",
            foobar: {
                ____types: "jsObject",
                value: {
                    ____accept: "jsString",
                    ____defaultValue: "<default string value - none specified>"
                }
            }
        },
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

    module.exports = factoryResponse.result;

})();
