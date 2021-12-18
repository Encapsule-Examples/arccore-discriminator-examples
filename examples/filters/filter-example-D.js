// @encapsule-examples/dmr-hello-world/examples/filters/filter-example-D.js

(function() {

    const arccore = require("@encapsule/arccore");

    const factoryResponse = arccore.filter.create({
        // Create a v4 UUID-based IRUT by calling @encapsule/arccore.identifier.irut.fromEther()
        operationID: "Nn58s-nVT1WxpVjaPu4Tow",
        operationName: "Filter Example D",
        operationDescription: "Another slightly more complex inputFilterSpec and bodyFunction example.",

        inputFilterSpec: {
            ____types: "jsObject",
            fizbaz: {
                ____types: "jsObject",
                value: {
                    ____accept: "jsNumber",
                    ____defaultValue: 0
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
