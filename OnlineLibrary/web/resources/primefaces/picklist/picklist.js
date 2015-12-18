PrimeFaces.widget.PickList=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);this.sourceList=this.jq.find("ul.ui-picklist-source");this.targetList=this.jq.find("ul.ui-picklist-target");this.sourceInput=$(this.jqId+"_source");this.targetInput=$(this.jqId+"_target");this.items=this.jq.find(".ui-picklist-item:not(.ui-state-disabled)");if(this.cfg.showCheckbox){this.checkboxes=this.items.find("div.ui-chkbox > div.ui-chkbox-box")}this.generateItems(this.sourceList,this.sourceInput);this.generateItems(this.targetList,this.targetInput);if(this.cfg.disabled){$(this.jqId+" li.ui-picklist-item").addClass("ui-state-disabled");$(this.jqId+" button").attr("disabled","disabled").addClass("ui-state-disabled")}else{var c=this,b=true;$(this.jqId+" ul").sortable({cancel:".ui-state-disabled,.ui-chkbox-box",connectWith:this.jqId+" .ui-picklist-list",revert:1,update:function(d,e){c.unselectItem(e.item);c.saveState();if(b){c.fireReorderEvent();b=false}},receive:function(d,e){c.fireTransferEvent(e.item,e.sender,e.item.parents("ul.ui-picklist-list:first"),"dragdrop")},start:function(d,e){c.itemListName=c.getListName(e.item);c.dragging=true},stop:function(d,e){c.dragging=false},beforeStop:function(d,e){if(c.itemListName!==c.getListName(e.item)){b=false}else{b=true}}});this.bindItemEvents();this.bindButtonEvents();this.bindFilterEvents()}},bindItemEvents:function(){var a=this;this.items.on("mouseover.pickList",function(c){var b=$(this);if(!b.hasClass("ui-state-highlight")){$(this).addClass("ui-state-hover")}}).on("mouseout.pickList",function(b){$(this).removeClass("ui-state-hover")}).on("click.pickList",function(f){if(a.checkboxClick||a.dragging){a.checkboxClick=false;return}var l=$(this),g=(f.metaKey||f.ctrlKey);if(!f.shiftKey){if(!g){a.unselectAll()}if(g&&l.hasClass("ui-state-highlight")){a.unselectItem(l,true)}else{a.selectItem(l,true);a.cursorItem=l}}else{a.unselectAll();if(a.cursorItem&&(a.cursorItem.parent().is(l.parent()))){var h=l.index(),m=a.cursorItem.index(),k=(h>m)?m:h,d=(h>m)?(h+1):(m+1),j=l.parent();for(var c=k;c<d;c++){var b=j.children("li.ui-picklist-item").eq(c);if(b.is(":visible")){if(c===(d-1)){a.selectItem(b,true)}else{a.selectItem(b)}}}}else{a.selectItem(l,true);a.cursorItem=l}}}).on("dblclick.pickList",function(){var b=$(this);if($(this).parent().hasClass("ui-picklist-source")){a.transfer(b,a.sourceList,a.targetList,"dblclick")}else{a.transfer(b,a.targetList,a.sourceList,"dblclick")}PrimeFaces.clearSelection()});if(this.cfg.showCheckbox){this.checkboxes.on("mouseover.pickList",function(c){var b=$(this);if(!b.hasClass("ui-state-active")){b.addClass("ui-state-hover")}}).on("mouseout.pickList",function(b){$(this).removeClass("ui-state-hover")}).on("click.pickList",function(c){a.checkboxClick=true;var b=$(this).closest("li.ui-picklist-item");if(b.hasClass("ui-state-highlight")){a.unselectItem(b,true)}else{a.selectItem(b,true)}})}},selectItem:function(b,a){b.removeClass("ui-state-hover").addClass("ui-state-highlight");if(this.cfg.showCheckbox){this.selectCheckbox(b.find("div.ui-chkbox-box"))}if(a){this.fireItemSelectEvent(b)}},unselectItem:function(b,a){b.removeClass("ui-state-hover ui-state-highlight");if(PrimeFaces.isIE(8)){b.css("filter","")}if(this.cfg.showCheckbox){this.unselectCheckbox(b.find("div.ui-chkbox-box"))}if(a){this.fireItemUnselectEvent(b)}},unselectAll:function(){var b=this.items.filter(".ui-state-highlight");for(var a=0;a<b.length;a++){this.unselectItem(b.eq(a))}},selectCheckbox:function(a){a.removeClass("ui-state-hover").addClass("ui-state-active").children("span.ui-chkbox-icon").removeClass("ui-icon-blank").addClass("ui-icon-check")},unselectCheckbox:function(a){a.removeClass("ui-state-active").children("span.ui-chkbox-icon").addClass("ui-icon-blank").removeClass("ui-icon-check")},generateItems:function(b,a){b.children(".ui-picklist-item").each(function(){var e=$(this),f=PrimeFaces.escapeHTML(e.attr("data-item-value")),d=e.attr("data-item-label"),c=(d)?PrimeFaces.escapeHTML(d):"";a.append('<option value="'+f+'" selected="selected">'+c+"</option>")})},bindButtonEvents:function(){var a=this;PrimeFaces.skinButton(this.jq.find(".ui-button"));$(this.jqId+" .ui-picklist-button-add").click(function(){a.add()});$(this.jqId+" .ui-picklist-button-add-all").click(function(){a.addAll()});$(this.jqId+" .ui-picklist-button-remove").click(function(){a.remove()});$(this.jqId+" .ui-picklist-button-remove-all").click(function(){a.removeAll()});if(this.cfg.showSourceControls){$(this.jqId+" .ui-picklist-source-controls .ui-picklist-button-move-up").click(function(){a.moveUp(a.sourceList)});$(this.jqId+" .ui-picklist-source-controls .ui-picklist-button-move-top").click(function(){a.moveTop(a.sourceList)});$(this.jqId+" .ui-picklist-source-controls .ui-picklist-button-move-down").click(function(){a.moveDown(a.sourceList)});$(this.jqId+" .ui-picklist-source-controls .ui-picklist-button-move-bottom").click(function(){a.moveBottom(a.sourceList)})}if(this.cfg.showTargetControls){$(this.jqId+" .ui-picklist-target-controls .ui-picklist-button-move-up").click(function(){a.moveUp(a.targetList)});$(this.jqId+" .ui-picklist-target-controls .ui-picklist-button-move-top").click(function(){a.moveTop(a.targetList)});$(this.jqId+" .ui-picklist-target-controls .ui-picklist-button-move-down").click(function(){a.moveDown(a.targetList)});$(this.jqId+" .ui-picklist-target-controls .ui-picklist-button-move-bottom").click(function(){a.moveBottom(a.targetList)})}},bindFilterEvents:function(){this.setupFilterMatcher();this.sourceFilter=$(this.jqId+"_source_filter");this.targetFilter=$(this.jqId+"_target_filter");var a=this;PrimeFaces.skinInput(this.sourceFilter);PrimeFaces.skinInput(this.targetFilter);this.sourceFilter.on("keyup",function(b){a.filter(this.value,a.sourceList)}).on("keydown",this.blockEnterKey);this.targetFilter.on("keyup",function(b){a.filter(this.value,a.targetList)}).on("keydown",this.blockEnterKey)},blockEnterKey:function(c){var a=c.which,b=$.ui.keyCode;if((a===b.ENTER||a===b.NUMPAD_ENTER)){c.preventDefault()}},setupFilterMatcher:function(){this.cfg.filterMatchMode=this.cfg.filterMatchMode||"startsWith";this.filterMatchers={startsWith:this.startsWithFilter,contains:this.containsFilter,endsWith:this.endsWithFilter,custom:this.cfg.filterFunction};this.filterMatcher=this.filterMatchers[this.cfg.filterMatchMode]},filter:function(h,e){var g=$.trim(h).toLowerCase(),f=e.children("li.ui-picklist-item"),b=this.isAnimated();if(g===""){f.filter(":hidden").show()}else{for(var c=0;c<f.length;c++){var j=f.eq(c),a=j.attr("data-item-label"),d=this.filterMatcher(a,g);if(d){if(b){j.fadeIn("fast")}else{j.show()}}else{if(b){j.fadeOut("fast")}else{j.hide()}}}}},startsWithFilter:function(b,a){return b.toLowerCase().indexOf(a)===0},containsFilter:function(b,a){return b.toLowerCase().indexOf(a)!==-1},endsWithFilter:function(b,a){return b.indexOf(a,b.length-a.length)!==-1},add:function(){var a=this.sourceList.children("li.ui-picklist-item.ui-state-highlight");this.transfer(a,this.sourceList,this.targetList,"command")},addAll:function(){var a=this.sourceList.children("li.ui-picklist-item:visible:not(.ui-state-disabled)");this.transfer(a,this.sourceList,this.targetList,"command")},remove:function(){var a=this.targetList.children("li.ui-picklist-item.ui-state-highlight");this.transfer(a,this.targetList,this.sourceList,"command")},removeAll:function(){var a=this.targetList.children("li.ui-picklist-item:visible:not(.ui-state-disabled)");this.transfer(a,this.targetList,this.sourceList,"command")},moveUp:function(f){var b=this,e=b.isAnimated(),c=f.children(".ui-state-highlight"),a=c.length,d=0;if(a){c.each(function(){var g=$(this);if(!g.is(":first-child")){if(e){g.hide(b.cfg.effect,{},b.cfg.effectSpeed,function(){g.insertBefore(g.prev()).show(b.cfg.effect,{},b.cfg.effectSpeed,function(){d++;if(d===a){b.saveState();b.fireReorderEvent()}})})}else{g.hide().insertBefore(g.prev()).show()}}});if(!e){this.saveState();this.fireReorderEvent()}}},moveTop:function(f){var b=this,e=b.isAnimated(),c=f.children(".ui-state-highlight"),a=c.length,d=0;if(a){c.each(function(){var g=$(this);if(!g.is(":first-child")){if(e){g.hide(b.cfg.effect,{},b.cfg.effectSpeed,function(){g.prependTo(g.parent()).show(b.cfg.effect,{},b.cfg.effectSpeed,function(){d++;if(d===a){b.saveState();b.fireReorderEvent()}})})}else{g.hide().prependTo(g.parent()).show()}}});if(!e){this.saveState();this.fireReorderEvent()}}},moveDown:function(f){var b=this,e=b.isAnimated(),c=f.children(".ui-state-highlight"),a=c.length,d=0;if(a){$(c.get().reverse()).each(function(){var g=$(this);if(!g.is(":last-child")){if(e){g.hide(b.cfg.effect,{},b.cfg.effectSpeed,function(){g.insertAfter(g.next()).show(b.cfg.effect,{},b.cfg.effectSpeed,function(){d++;if(d===a){b.saveState();b.fireReorderEvent()}})})}else{g.hide().insertAfter(g.next()).show()}}});if(!e){this.saveState();this.fireReorderEvent()}}},moveBottom:function(f){var b=this,e=b.isAnimated(),c=f.children(".ui-state-highlight"),a=c.length,d=0;if(a){c.each(function(){var g=$(this);if(!g.is(":last-child")){if(e){g.hide(b.cfg.effect,{},b.cfg.effectSpeed,function(){g.appendTo(g.parent()).show(b.cfg.effect,{},b.cfg.effectSpeed,function(){d++;if(d===a){b.saveState();b.fireReorderEvent()}})})}else{g.hide().appendTo(g.parent()).show()}}});if(!e){this.saveState();this.fireReorderEvent()}}},saveState:function(){this.sourceInput.children().remove();this.targetInput.children().remove();this.generateItems(this.sourceList,this.sourceInput);this.generateItems(this.targetList,this.targetInput);this.cursorItem=null},transfer:function(b,g,f,d){var e=this,a=b.length,c=0;if(this.isAnimated()){b.hide(this.cfg.effect,{},this.cfg.effectSpeed,function(){var h=$(this);e.unselectItem(h);h.appendTo(f).show(e.cfg.effect,{},e.cfg.effectSpeed,function(){c++;if(c==a){e.saveState();e.fireTransferEvent(b,g,f,d)}})})}else{b.hide();if(this.cfg.showCheckbox){b.each(function(){e.unselectItem($(this))})}b.appendTo(f).show();this.saveState();this.fireTransferEvent(b,g,f,d)}},fireTransferEvent:function(e,g,h,f){if(this.cfg.onTransfer){var c={};c.items=e;c.from=g;c.to=h;c.type=f;this.cfg.onTransfer.call(this,c)}if(this.cfg.behaviors){var a=this.cfg.behaviors.transfer;if(a){var b={params:[]},d=this.id+"_transferred",i=g.hasClass("ui-picklist-source");e.each(function(j,k){b.params.push({name:d,value:$(k).attr("data-item-value")})});b.params.push({name:this.id+"_add",value:i});a.call(this,b)}}},getListName:function(a){return a.parent().hasClass("ui-picklist-source")?"source":"target"},hasBehavior:function(a){if(this.cfg.behaviors){return this.cfg.behaviors[a]!=undefined}return false},fireItemSelectEvent:function(b){if(this.hasBehavior("select")){var c=this.cfg.behaviors.select,a={params:[{name:this.id+"_itemIndex",value:b.index()},{name:this.id+"_listName",value:this.getListName(b)}]};c.call(this,a)}},fireItemUnselectEvent:function(c){if(this.hasBehavior("unselect")){var a=this.cfg.behaviors.unselect,b={params:[{name:this.id+"_itemIndex",value:c.index()},{name:this.id+"_listName",value:this.getListName(c)}]};a.call(this,b)}},fireReorderEvent:function(){if(this.hasBehavior("reorder")){this.cfg.behaviors.reorder.call(this)}},isAnimated:function(){return(this.cfg.effect&&this.cfg.effect!="none")}});