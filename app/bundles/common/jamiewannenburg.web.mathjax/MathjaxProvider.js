define(['libs/backbone','mathjax'],function(Backbone) {
    
	function MathjaxProvider() {
		this.id = "mathjax";
		this.name = "Mathjax";
        this.setup = false;
	}

	MathjaxProvider.prototype = {
		activate: function(registry) {
            // only the first time
            if (!this.setup) {
                registry.on('registered:jamiewannenburg.mathjax', this._registered, this);
                registry.on('jamiewannenburg:updateMath', this.updateMath, this);
            }
		},
        _registered: function() {
            // mathjax config
            MathJax.Hub.Config({
                TeX: {
                    Macros: {
                        bdot: "\\mathbin{\\boldsymbol{\\cdot}}"
                    }
                },
                MatchWebFonts: {
                    matchFor: {
                      "HTML-CSS": true,
                    }
                },
                tex2jax: {
                    inlineMath: [['$','$'], ['\\(','\\)']],
                    displayMath: [ 
                        ['$$','$$'], 
                        //['\[','\]'],
                        ['\begin{equation}','\end{equation}'],
                        ['\begin{equation*}','\end{equation*}'] 
                    ],
                    processEnvironments: true
                }
            });
        },
        updateMath: function() {
            // let everything finish first
            setTimeout(function() {
                MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
            }, 500);
            
        }

	};

	return MathjaxProvider;
});