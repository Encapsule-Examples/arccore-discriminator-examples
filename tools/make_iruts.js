(function() {

    const arccore = require("@encapsule/arccore");
    for (let i = 0 ; i < 20 ; i++) {
        console.log(`"${arccore.identifier.irut.fromEther()}"`);
    }

})();
