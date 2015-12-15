PrimeFaces.widget.OrderList=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);this.list=this.jq.find(".ui-orderlist-list"),this.items=this.list.children(".ui-orderlist-item");this.input=$(this.jqId+"_values");this.cfg.effect=this.cfg.effect||"fade";this.cfg.disabled=this.jq.hasClass("ui-state-disabled");var b=this;if(!this.cfg.disabled){this.generateItems();this.setupButtons();this.bindEvents();this.list.sortable({revert:1,start:function(c,d){PrimeFaces.clearSelection()},update:function(c,d){b.onDragDrop(c,d)}})}},generateItems:function(){var a=this;this.list.children(".ui-orderlist-item").each(function(){var b=$(this),c=b.data("item-value");a.input.append('<option value="'+c+'" selected="selected">'+c+"</option>")})},bindEvents:function(){var a=this;this.items.on("mouseover.orderList",function(c){var b=$(this);if(!b.hasClass("ui-state-highlight")){$(this).addClass("ui-state-hover")}}).on("mouseout.orderList",function(c){var b=$(this);if(!b.hasClass("ui-state-highlight")){$(this).removeClass("ui-state-hover")}}).on("mousedown.orderList",function(c){var b=$(this),d=(c.metaKey||c.ctrlKey);if(!d){b.removeClass("ui-state-hover").addClass("ui-state-highlight").siblings(".ui-state-highlight").removeClass("ui-state-highlight");a.fireItemSelectEvent(b,c)}else{if(b.hasClass("ui-state-highlight")){b.removeClass("ui-state-highlight");a.fireItemUnselectEvent(b)}else{b.removeClass("ui-state-hover").addClass("ui-state-highlight");a.fireItemSelectEvent(b,c)}}})},setupButtons:function(){var a=this;PrimeFaces.skinButton(this.jq.find(".ui-button"));this.jq.find(" .ui-orderlist-controls .ui-orderlist-button-move-up").click(function(){a.moveUp(a.sourceList)});this.jq.find(" .ui-orderlist-controls .ui-orderlist-button-move-top").click(function(){a.moveTop(a.sourceList)});this.jq.find(" .ui-orderlist-controls .ui-orderlist-button-move-down").click(function(){a.moveDown(a.sourceList)});this.jq.find(" .ui-orderlist-controls .ui-orderlist-button-move-bottom").click(function(){a.moveBottom(a.sourceList)})},onDragDrop:function(a,b){b.item.removeClass("ui-state-highlight");this.saveState();this.fireReorderEvent()},saveState:function(){this.input.children().remove();this.generateItems()},moveUp:function(){var b=this,d=this.items.filter(".ui-state-highlight"),c=d.length,a=0;d.each(function(){var e=$(this);if(!e.is(":first-child")){e.hide(b.cfg.effect,{},"fast",function(){e.insertBefore(e.prev()).show(b.cfg.effect,{},"fast",function(){a++;if(c===a){b.saveState();b.fireReorderEvent()}})})}else{c--}})},moveTop:function(){var b=this,d=this.items.filter(".ui-state-highlight"),c=d.length,a=0;d.each(function(){var e=$(this);if(!e.is(":first-child")){e.hide(b.cfg.effect,{},"fast",function(){e.prependTo(e.parent()).show(b.cfg.effect,{},"fast",function(){a++;if(c===a){b.saveState();b.fireReorderEvent()}})})}else{c--}})},moveDown:function(){var b=this,d=$(this.items.filter(".ui-state-highlight").get().reverse()),c=d.length,a=0;d.each(function(){var e=$(this);if(!e.is(":last-child")){e.hide(b.cfg.effect,{},"fast",function(){e.insertAfter(e.next()).show(b.cfg.effect,{},"fast",function(){a++;if(c===a){b.saveState();b.fireReorderEvent()}})})}else{c--}})},moveBottom:function(){var b=this,d=this.items.filter(".ui-state-highlight"),c=d.length,a=0;d.each(function(){var e=$(this);if(!e.is(":last-child")){e.hide(b.cfg.effect,{},"fast",function(){e.appendTo(e.parent()).show(b.cfg.effect,{},"fast",function(){a++;if(c===a){b.saveState();b.fireReorderEvent()}})})}else{c--}})},hasBehavior:function(a){if(this.cfg.behaviors){return this.cfg.behaviors[a]!=undefined}return false},fireItemSelectEvent:function(b,d){if(this.hasBehavior("select")){var c=this.cfg.behaviors.select,a={params:[{name:this.id+"_itemIndex",value:b.index()},{name:this.id+"_metaKey",value:d.metaKey},{name:this.id+"_ctrlKey",value:d.ctrlKey}]};c.call(this,a)}},fireItemUnselectEvent:function(c){if(this.hasBehavior("unselect")){var a=this.cfg.behaviors.unselect,b={params:[{name:this.id+"_itemIndex",value:c.index()}]};a.call(this,b)}},fireReorderEvent:function(){if(this.hasBehavior("reorder")){this.cfg.behaviors.reorder.call(this)}}});