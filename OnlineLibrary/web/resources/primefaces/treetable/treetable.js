PrimeFaces.widget.TreeTable=PrimeFaces.widget.DeferredWidget.extend({init:function(a){this._super(a);this.thead=$(this.jqId+"_head");this.tbody=$(this.jqId+"_data");this.renderDeferred()},_render:function(){if(this.cfg.scrollable){this.setupScrolling()}if(this.cfg.resizableColumns){this.setupResizableColumns()}this.bindEvents()},refresh:function(a){this.columnWidthsFixed=false;this.init(a)},bindEvents:function(){var c=this,a="> tr > td:first-child > .ui-treetable-toggler";this.tbody.off("click.treeTable-toggle",a).on("click.treeTable-toggle",a,null,function(g){var f=$(this),d=f.closest("tr");if(!d.data("processing")){d.data("processing",true);if(f.hasClass("ui-icon-triangle-1-e")){c.expandNode(d)}else{c.collapseNode(d)}}});if(this.cfg.selectionMode){this.jqSelection=$(this.jqId+"_selection");var b=this.jqSelection.val();this.selections=b===""?[]:b.split(",");this.bindSelectionEvents()}this.bindSortEvents()},bindSelectionEvents:function(){var c=this,a="> tr.ui-treetable-selectable-node";this.tbody.off("mouseover.treeTable mouseout.treeTable click.treeTable",a).on("mouseover.treeTable",a,null,function(f){var d=$(this);if(!d.hasClass("ui-state-highlight")){d.addClass("ui-state-hover");if(c.isCheckboxSelection()&&!c.cfg.nativeElements){d.find("> td:first-child > div.ui-chkbox > div.ui-chkbox-box").addClass("ui-state-hover")}}}).on("mouseout.treeTable",a,null,function(f){var d=$(this);if(!d.hasClass("ui-state-highlight")){d.removeClass("ui-state-hover");if(c.isCheckboxSelection()&&!c.cfg.nativeElements){d.find("> td:first-child > div.ui-chkbox > div.ui-chkbox-box").removeClass("ui-state-hover")}}}).on("click.treeTable",a,null,function(d){c.onRowClick(d,$(this))});if(this.isCheckboxSelection()){var b=this.cfg.nativeElements?"> tr.ui-treetable-selectable-node > td:first-child :checkbox":"> tr.ui-treetable-selectable-node > td:first-child div.ui-chkbox-box";this.tbody.off("click.treeTable-checkbox",b).on("click.treeTable-checkbox",b,null,function(f){var d=$(this).closest("tr.ui-treetable-selectable-node");c.toggleCheckboxNode(d)});if(this.cfg.nativeElements){this.indeterminateNodes(this.tbody.children("tr.ui-treetable-partialselected"))}}},bindSortEvents:function(){var a=this;this.sortableColumns=this.thead.find("> tr > th.ui-sortable-column");this.sortableColumns.filter(".ui-state-active").each(function(){var c=$(this),d=c.children("span.ui-sortable-column-icon"),b=null;if(d.hasClass("ui-icon-triangle-1-n")){b="ASCENDING"}else{b="DESCENDING"}c.data("sortorder",b)});this.sortableColumns.on("mouseenter.treeTable",function(){var b=$(this);if(!b.hasClass("ui-state-active")){b.addClass("ui-state-hover")}}).on("mouseleave.treeTable",function(){var b=$(this);if(!b.hasClass("ui-state-active")){b.removeClass("ui-state-hover")}}).on("click.treeTable",function(d){if($(d.target).is("th,span:not(.ui-c)")){PrimeFaces.clearSelection();var c=$(this),b=c.data("sortorder")||"DESCENDING";if(b==="ASCENDING"){b="DESCENDING"}else{if(b==="DESCENDING"){b="ASCENDING"}}a.sort(c,b)}})},sort:function(d,a){var e=this,b={source:this.id,update:this.id,process:this.id,params:[{name:this.id+"_sorting",value:true},{name:this.id+"_sortKey",value:d.attr("id")},{name:this.id+"_sortDir",value:a}],onsuccess:function(h,f,g){PrimeFaces.ajax.Response.handle(h,f,g,{widget:e,handle:function(i){this.tbody.html(i);d.siblings().filter(".ui-state-active").removeData("sortorder").removeClass("ui-state-active").find(".ui-sortable-column-icon").removeClass("ui-icon-triangle-1-n ui-icon-triangle-1-s");d.removeClass("ui-state-hover").addClass("ui-state-active").data("sortorder",a);var j=d.find(".ui-sortable-column-icon");if(a==="DESCENDING"){j.removeClass("ui-icon-triangle-1-n").addClass("ui-icon-triangle-1-s")}else{if(a==="ASCENDING"){j.removeClass("ui-icon-triangle-1-s").addClass("ui-icon-triangle-1-n")}}}});return true},oncomplete:function(h,f,g){if(e.cfg.selectionMode&&g.selection){e.selections=g.selection.split(",");e.writeSelections()}}};if(this.hasBehavior("sort")){var c=this.cfg.behaviors.sort;c.call(this,b)}else{PrimeFaces.ajax.Request.handle(b)}},expandNode:function(c){var d=this,b=c.attr("data-rk"),a={source:this.id,process:this.id,update:this.id,params:[{name:this.id+"_expand",value:b}],onsuccess:function(h,f,g){PrimeFaces.ajax.Response.handle(h,f,g,{widget:d,handle:function(j){var i=c.next();c.after(j);c.find(".ui-treetable-toggler:first").addClass("ui-icon-triangle-1-s").removeClass("ui-icon-triangle-1-e");c.attr("aria-expanded",true);d.indeterminateNodes(d.tbody.children("tr.ui-treetable-partialselected"));if(this.cfg.scrollable){this.alignScrollBody()}}});return true},oncomplete:function(){c.data("processing",false)}};if(this.hasBehavior("expand")){var e=this.cfg.behaviors.expand;e.call(this,a)}else{PrimeFaces.ajax.Request.handle(a)}},collapseNode:function(g){var d=g.attr("data-rk"),h=g.nextAll();for(var e=0;e<h.length;e++){var b=h.eq(e),c=b.attr("data-rk");if(c.indexOf(d)!==-1){b.remove()}else{break}}g.attr("aria-expanded",false).find(".ui-treetable-toggler:first").addClass("ui-icon-triangle-1-e").removeClass("ui-icon-triangle-1-s");g.data("processing",false);if(this.cfg.scrollable){this.alignScrollBody()}if(this.hasBehavior("collapse")){var a=this.cfg.behaviors.collapse,d=g.attr("data-rk");var f={params:[{name:this.id+"_collapse",value:d}]};a.call(this,f)}},onRowClick:function(d,c){if($(d.target).is("td,span:not(.ui-c)")){var b=c.hasClass("ui-state-highlight"),e=d.metaKey||d.ctrlKey,a=d.shiftKey;if(this.isCheckboxSelection()){this.toggleCheckboxNode(c)}else{if(b&&e){this.unselectNode(c)}else{if(this.isSingleSelection()||(this.isMultipleSelection()&&!e)){this.unselectAllNodes()}if(this.isMultipleSelection()&&a){this.selectNodesInRange(c)}else{this.selectNode(c);this.cursorNode=c}}}PrimeFaces.clearSelection()}},onRowRightClick:function(c,b){var a=b.hasClass("ui-state-highlight");if(this.isCheckboxSelection()){if(!a){this.toggleCheckboxNode(b)}}else{if(this.isSingleSelection()||!a){this.unselectAllNodes()}this.selectNode(b)}PrimeFaces.clearSelection()},selectNode:function(c,a){var b=c.attr("data-rk");c.removeClass("ui-state-hover ui-treetable-partialselected").addClass("ui-state-highlight").attr("aria-selected",true);this.addToSelection(b);this.writeSelections();if(this.isCheckboxSelection()){if(this.cfg.nativeElements){c.find("> td:first-child > :checkbox").prop("checked",true).prop("indeterminate",false)}else{c.find("> td:first-child > div.ui-chkbox > div.ui-chkbox-box").removeClass("ui-state-hover").children("span.ui-chkbox-icon").removeClass("ui-icon-blank ui-icon-minus").addClass("ui-icon-check")}}if(!a){this.fireSelectNodeEvent(b)}},unselectNode:function(c,a){var b=c.attr("data-rk");c.removeClass("ui-state-highlight ui-treetable-partialselected").attr("aria-selected",false);this.removeSelection(b);this.writeSelections();if(this.isCheckboxSelection()){if(this.cfg.nativeElements){c.find("> td:first-child > :checkbox").prop("checked",false).prop("indeterminate",false)}else{c.find("> td:first-child > div.ui-chkbox > div.ui-chkbox-box > span.ui-chkbox-icon").addClass("ui-icon-blank").removeClass("ui-icon-check ui-icon-minus")}}if(!a){this.fireUnselectNodeEvent(b)}},unselectAllNodes:function(){var b=this.tbody.children("tr.ui-state-highlight");for(var a=0;a<b.length;a++){this.unselectNode(b.eq(a),true)}this.selections=[];this.writeSelections()},selectNodesInRange:function(d){if(this.cursorNode){this.unselectAllNodes();var g=d.index(),c=this.cursorNode.index(),f=(g>c)?c:g,e=(g>c)?(g+1):(c+1),a=this.tbody.children();for(var b=f;b<e;b++){this.selectNode(a.eq(b),true)}}else{this.selectNode(d)}},indeterminateNodes:function(a){for(var b=0;b<a.length;b++){a.eq(b).find("> td:first-child > :checkbox").prop("indeterminate",true)}},toggleCheckboxNode:function(e){var d=e.hasClass("ui-state-highlight"),g=e.data("rk");if(d){this.unselectNode(e,true)}else{this.selectNode(e,true)}var f=this.getDescendants(e);for(var b=0;b<f.length;b++){var c=f[b];if(d){this.unselectNode(c,true)}else{this.selectNode(c,true)}}if(d){this.removeDescendantsFromSelection(e.data("rk"))}var a=this.getParent(e);if(a){this.propagateUp(a)}this.writeSelections();if(d){this.fireUnselectNodeEvent(g)}else{this.fireSelectNodeEvent(g)}},getDescendants:function(e){var c=e.attr("data-rk"),g=e.nextAll(),f=[];for(var d=0;d<g.length;d++){var a=g.eq(d),b=a.attr("data-rk");if(b.indexOf(c)!=-1){f.push(a)}else{break}}return f},getChildren:function(f){var c=f.attr("data-rk"),g=f.nextAll(),e=[];for(var d=0;d<g.length;d++){var a=g.eq(d),b=a.attr("data-prk");if(b===c){e.push(a)}}return e},propagateUp:function(d){var b=this.getChildren(d),j=true,f=false,g=this.cfg.nativeElements?d.find("> td:first-child > :checkbox"):d.find("> td:first-child > div.ui-chkbox > div.ui-chkbox-box > span.ui-chkbox-icon");for(var e=0;e<b.length;e++){var a=b[e],c=a.hasClass("ui-state-highlight");j=j&&c;f=f||c||a.hasClass("ui-treetable-partialselected")}if(j){d.removeClass("ui-treetable-partialselected");this.selectNode(d,true)}else{if(f){d.removeClass("ui-state-highlight").addClass("ui-treetable-partialselected");if(this.cfg.nativeElements){g.prop("indeterminate",true)}else{g.removeClass("ui-icon-blank ui-icon-check").addClass("ui-icon-minus")}this.removeSelection(d.attr("data-rk"))}else{d.removeClass("ui-state-highlight ui-treetable-partialselected");if(this.cfg.nativeElements){g.prop("indeterminate",false).prop("checked",false)}else{g.addClass("ui-icon-blank").removeClass("ui-icon-check ui-icon-minus")}this.removeSelection(d.attr("data-rk"))}}var h=this.getParent(d);if(h){this.propagateUp(h)}},getParent:function(b){var a=$(this.jqId+"_node_"+b.attr("data-prk"));return a.length===1?a:null},hasBehavior:function(a){if(this.cfg.behaviors){return this.cfg.behaviors[a]!=undefined}return false},removeDescendantsFromSelection:function(a){this.selections=$.grep(this.selections,function(b){return b.indexOf(a+"_")!==0})},removeSelection:function(a){this.selections=$.grep(this.selections,function(b){return b!==a})},addToSelection:function(a){if(!this.isSelected(a)){this.selections.push(a)}},isSelected:function(a){return PrimeFaces.inArray(this.selections,a)},isSingleSelection:function(){return this.cfg.selectionMode=="single"},isMultipleSelection:function(){return this.cfg.selectionMode=="multiple"},isCheckboxSelection:function(){return this.cfg.selectionMode=="checkbox"},writeSelections:function(){this.jqSelection.val(this.selections.join(","))},fireSelectNodeEvent:function(b){if(this.isCheckboxSelection()){var e=this,a={source:this.id,process:this.id};a.params=[{name:this.id+"_instantSelection",value:b}];a.oncomplete=function(k,f,g){if(g.descendantRowKeys&&g.descendantRowKeys!==""){var j=g.descendantRowKeys.split(",");for(var h=0;h<j.length;h++){e.addToSelection(j[h])}e.writeSelections()}};if(this.hasBehavior("select")){var d=this.cfg.behaviors.select;d.call(this,a)}else{PrimeFaces.ajax.AjaxRequest(a)}}else{if(this.hasBehavior("select")){var d=this.cfg.behaviors.select,c={params:[{name:this.id+"_instantSelection",value:b}]};d.call(this,c)}}},fireUnselectNodeEvent:function(b){if(this.hasBehavior("unselect")){var a=this.cfg.behaviors.unselect,c={params:[{name:this.id+"_instantUnselection",value:b}]};a.call(this,c)}},setupScrolling:function(){this.scrollHeader=this.jq.children("div.ui-treetable-scrollable-header");this.scrollBody=this.jq.children("div.ui-treetable-scrollable-body");this.scrollFooter=this.jq.children("div.ui-treetable-scrollable-footer");this.scrollStateHolder=$(this.jqId+"_scrollState");this.scrollHeaderBox=this.scrollHeader.children("div.ui-treetable-scrollable-header-box");this.scrollFooterBox=this.scrollFooter.children("div.ui-treetable-scrollable-footer-box");this.headerTable=this.scrollHeaderBox.children("table");this.bodyTable=this.scrollBody.children("table");this.footerTable=this.scrollFooterBox.children("table");this.headerCols=this.headerTable.find("> thead > tr > th");this.footerCols=this.footerTable.find("> tfoot > tr > td");var c=this;if(this.cfg.scrollHeight){if(this.cfg.scrollHeight.indexOf("%")!==-1){this.adjustScrollHeight()}var b=this.getScrollbarWidth();this.scrollHeaderBox.css("margin-right",b);this.scrollFooterBox.css("margin-right",b);this.alignScrollBody()}this.fixColumnWidths();if(this.cfg.scrollWidth){if(this.cfg.scrollWidth.indexOf("%")!==-1){this.adjustScrollWidth()}else{this.setScrollWidth(parseInt(this.cfg.scrollWidth))}}this.cloneHead();this.restoreScrollState();this.scrollBody.scroll(function(){var d=c.scrollBody.scrollLeft();c.scrollHeaderBox.css("margin-left",-d);c.scrollFooterBox.css("margin-left",-d);c.saveScrollState()});this.scrollHeader.on("scroll.treeTable",function(){c.scrollHeader.scrollLeft(0)});this.scrollFooter.on("scroll.treeTable",function(){c.scrollFooter.scrollLeft(0)});var a="resize."+this.id;$(window).unbind(a).bind(a,function(){if(c.jq.is(":visible")){if(c.percentageScrollHeight){c.adjustScrollHeight()}if(c.percentageScrollWidth){c.adjustScrollWidth()}}})},cloneHead:function(){this.theadClone=this.headerTable.children("thead").clone();this.theadClone.find("th").each(function(){var a=$(this);a.attr("id",a.attr("id")+"_clone")});this.theadClone.removeAttr("id").addClass("ui-treetable-scrollable-theadclone").height(0).prependTo(this.bodyTable)},fixColumnWidths:function(){var a=this;if(!this.columnWidthsFixed){if(this.cfg.scrollable){this.headerCols.each(function(){var e=$(this),b=e.index(),c=e.width();e.width(c);if(a.footerCols.length>0){var d=a.footerCols.eq(b);d.width(c)}})}else{this.jq.find("> table > thead > tr > th").each(function(){var b=$(this);b.width(b.width())})}this.columnWidthsFixed=true}},adjustScrollHeight:function(){var d=this.jq.parent().innerHeight()*(parseInt(this.cfg.scrollHeight)/100),e=this.jq.children(".ui-treetable-header").outerHeight(true),b=this.jq.children(".ui-treetable-footer").outerHeight(true),c=(this.scrollHeader.outerHeight(true)+this.scrollFooter.outerHeight(true)),a=(d-(c+e+b));this.scrollBody.height(a)},adjustScrollWidth:function(){var a=parseInt((this.jq.parent().innerWidth()*(parseInt(this.cfg.scrollWidth)/100)));this.setScrollWidth(a)},setOuterWidth:function(a,b){var c=a.outerWidth()-a.width();a.width(b-c)},hasVerticalOverflow:function(){return(this.cfg.scrollHeight&&this.bodyTable.outerHeight()>this.scrollBody.outerHeight())},setScrollWidth:function(a){var b=this;this.jq.children(".ui-widget-header").each(function(){b.setOuterWidth($(this),a)});this.scrollHeader.width(a);this.scrollBody.css("padding-right",0).width(a);this.scrollFooter.width(a)},alignScrollBody:function(){if(!this.cfg.scrollWidth){if(this.hasVerticalOverflow()){this.scrollBody.css("padding-right",0)}else{this.scrollBody.css("padding-right",this.getScrollbarWidth())}}},getScrollbarWidth:function(){return $.browser.webkit?"15":PrimeFaces.calculateScrollbarWidth()},restoreScrollState:function(){var a=this.scrollStateHolder.val(),b=a.split(",");this.scrollBody.scrollLeft(b[0]);this.scrollBody.scrollTop(b[1])},saveScrollState:function(){var a=this.scrollBody.scrollLeft()+","+this.scrollBody.scrollTop();this.scrollStateHolder.val(a)},setupResizableColumns:function(){this.fixColumnWidths();if(!this.cfg.liveResize){this.resizerHelper=$('<div class="ui-column-resizer-helper ui-state-highlight"></div>').appendTo(this.jq)}this.thead.find("> tr > th.ui-resizable-column:not(:last-child)").prepend('<span class="ui-column-resizer">&nbsp;</span>');var a=this.thead.find("> tr > th > span.ui-column-resizer"),b=this;a.draggable({axis:"x",start:function(){if(b.cfg.liveResize){b.jq.css("cursor","col-resize")}else{var c=b.cfg.scrollable?b.scrollBody.height():b.thead.parent().height()-b.thead.height()-1;b.resizerHelper.height(c);b.resizerHelper.show()}},drag:function(c,d){if(b.cfg.liveResize){b.resize(c,d)}else{b.resizerHelper.offset({left:d.helper.offset().left+d.helper.width()/2,top:b.thead.offset().top+b.thead.height()})}},stop:function(d,f){var e=f.helper.parent();f.helper.css("left","");if(b.cfg.liveResize){b.jq.css("cursor","default")}else{b.resize(d,f);b.resizerHelper.hide()}var c={source:b.id,process:b.id,params:[{name:b.id+"_colResize",value:true},{name:b.id+"_columnId",value:e.attr("id")},{name:b.id+"_width",value:e.width()},{name:b.id+"_height",value:e.height()}]};if(b.hasBehavior("colResize")){b.cfg.behaviors.colResize.call(b,c)}},containment:this.jq})},resize:function(a,i){var c=i.helper.parent(),e=c.next(),h=null,d=null,f=null;if(this.cfg.liveResize){h=c.outerWidth()-(a.pageX-c.offset().left),d=(c.width()-h),f=(e.width()+h)}else{h=(i.position.left-i.originalPosition.left),d=(c.width()+h),f=(e.width()-h)}if(d>15&&f>15){c.width(d);e.width(f);var j=c.index();if(this.cfg.scrollable){this.theadClone.find(PrimeFaces.escapeClientId(c.attr("id")+"_clone")).width(d);this.theadClone.find(PrimeFaces.escapeClientId(e.attr("id")+"_clone")).width(f);if(this.footerCols.length>0){var g=this.footerCols.eq(j),b=g.next();g.width(d);b.width(f)}}}}});