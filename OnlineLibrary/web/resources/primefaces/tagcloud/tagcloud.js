PrimeFaces.widget.TagCloud=PrimeFaces.widget.BaseWidget.extend({init:function(b){this._super(b);var a=this;this.jq.find("a").mouseover(function(){$(this).addClass("ui-state-hover")}).mouseout(function(){$(this).removeClass("ui-state-hover")}).click(function(d){var c=$(this);if(c.attr("href")==="#"){a.fireSelectEvent(c);d.preventDefault()}})},fireSelectEvent:function(b){if(this.cfg.behaviors){var c=this.cfg.behaviors.select;if(c){var a={params:[{name:this.id+"_itemIndex",value:b.parent().index()}]};c.call(this,a)}}}});