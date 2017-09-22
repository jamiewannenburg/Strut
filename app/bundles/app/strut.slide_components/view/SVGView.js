define(["./ComponentView", './Mixers'],
	function(ComponentView,Mixers) {

		/**
		 * @class SVGView
		 * @augments ComponentView
		 */
		return ComponentView.extend({
			className: "component svgView",

			/**
			 * Initialize SVGView component view.
			 */
			initialize: function() {
				ComponentView.prototype.initialize.apply(this, arguments);
                this.scale = Mixers.scaleObjectEmbed;
                this.model.off("change:scale", this._setUpdatedTransform, this);
                this.model.on('change:scale', Mixers.scaleChangeInlineSvg, this);
			},

			/**
			 * Render element based on component model.
			 *
			 * @returns {*}
			 */
			render: function() {
				ComponentView.prototype.render.call(this);
                var obj = this.model.get('markup')
                this.$object = $(obj);

                var scale = this.model.get('scale');

                var $content = this.$el.find('.content');
                $content.append(this.$object);

                if (scale && scale.width) {
                    this.$object.attr(scale);
                } else {
                    scale = {
                        width: this.$object.attr('width'),
                        height: this.$object.attr('height')
                    };
                    this.model.attributes.scale = scale;
                    this.$object.attr(scale);
                    this.model.setInt("x", 0);
                    this.model.setInt("y", 0);
                }
                
                return this.$el;
			},
            
		});
	});