define(['libs/backbone','./ComponentButton', 'jamiewannenburg/web/widgets/SVGImportModal','jquery'],
	function(Backbone,ComponentButton,SVGImportModal) {
		'use strict';

		/**
		 * @class SVGComponentButton
		 * @augments ComponentButton
		 */
		return ComponentButton.extend({
			/**
			 * Initialize SVGComponentButton.
			 */
			initialize: function() {
				ComponentButton.prototype.initialize.apply(this, arguments);

				this._modal = SVGImportModal.get(this.options);
				this._itemImported = this._itemImported.bind(this);
                
			},

			/**
			 * React on button click.
			 * @private
			 */
			_clicked: function() {
				this._modal.show(this._itemImported);
			},

			/**
			 * Add importent component to the slide.
			 * @private
			 */
			_itemImported: function(src) {
                var _this = this;
                $.get(src, function(response,status){
                    if (status != "error") {
                        var $svg = $(response).find('svg').first();
                        _this._finishImport($svg);
                    }
                });
			},
            
			/**
			 * Add importent component to the slide.
			 * @private
			 */
			_finishImport: function($svg) {
                $svg.find('animateTransform').each(function(){
                    $(this).attr('begin','indefinite');
                });
                
				this.options.editorModel.addComponent({
					markup: $svg.prop('outerHTML'),
					type: this.options.componentType
				});
			},

			constructor: function SVGComponentButton() {
				ComponentButton.prototype.constructor.apply(this, arguments);
			}
		});
	})