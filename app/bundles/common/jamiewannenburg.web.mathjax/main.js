// this is the syntax of Require.js
// it cleverly loads what only what is needed for each function
define(['./MathjaxProvider'],
function(MathjaxProvider) {
    // this is a service that will be added to the registry
	var service = new MathjaxProvider();

	return {
        // this function is called when this feature is loaded in scripts/features.js
        // where registry is defined in scripts/framework/ServiceRegistry.js, it is an extension of EventEmitter
        // one can use the registry to find other services
		initialize: function(registry) {
            // I am providing our service with the registry so it
            // listen to when it is registered and find other services
            service.activate(registry);
            // this command registers the feature on the registry
            // it will emit a regitered:interface event on the registry once this is done
			registry.register({
                interfaces: 'jamiewannenburg.mathjax'
            }, service);
		}
	};
});