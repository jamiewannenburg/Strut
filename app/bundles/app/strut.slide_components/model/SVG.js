define(['strut/deck/Component',
	'common/FileUtils'],
	function(Component, FileUtils) {
		'use strict';

		/**
		 * @class SVG
		 * @augments Component
		 */
		return Component.extend({
			initialize: function() {
				Component.prototype.initialize.apply(this, arguments);
				this.set('type', 'SVG');
			},

			constructor: function SVG(attrs) {
				Component.prototype.constructor.call(this, attrs);
			}
		});
	});