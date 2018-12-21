/**************************************************************************************/
// Bootstrap functions
// copyright 2018 NS BASIC Corporation. All rights reserved.

var NSB = NSB || {}; // setup the NSB namespace, if needed

NSB.bs = {};

NSB.bs.addProperties = function(ctrl, type){

    if (type != "DataTable_bs") {
        $('#' + ctrl.id).addClass('collapse in');
        ctrl.collapse = function(arg) {
            if (!arg)
                arg = $('#' + ctrl.id).hasClass('in') ? 'hide' : 'show';
            $('#' + ctrl.id).collapse(arg);
        }
    };
    
    ctrl.hide = function(options) {
        // if the BS control has an overlay (popover, dropdown, etc.), BS calls
        // hide for the control  when it closes. NSB.overlayShowing
        // flags that the hide is coming from Bootstrap and not the user,
        // so it clears the flag and ignores the hide request.
        if (NSB.overlayShowing) {
            NSB.overlayShowing = false;
        } else {
            $('#' + ctrl.id).hide(options);
        }
    };

    $('[data-toggle="popover"]').on('show.bs.popover', function () {
      NSB.overlayShowing = true;
    })

    $('[data-toggle="tooltip"]').on('show.bs.tooltip', function () {
      NSB.overlayShowing = true;
    })

    ctrl.show = function(options) {
        $('#' + ctrl.id).show(options);
    };
    ctrl.toggle = function(options) {
        if ($(ctrl).hasClass('modal'))
            $(ctrl).modal('toggle');
        else
            $('#' + ctrl.id).toggle(options);
    };
    
    NSB.bs.define.badge(ctrl, type);
    ctrl.fadeIn = function(a,c,d) {$("#"+ctrl.id).fadeIn(a,c,d);};
    ctrl.fadeOut = function(a,c,d) {$("#"+ctrl.id).fadeOut(a,c,d);};
    ctrl.slideUp = function(a,c,d) {$("#"+ctrl.id).slideUp(a,c,d);};
    ctrl.slideDown = function(a,c,d) {$("#"+ctrl.id).slideDown(a,c,d);};
    NSB.addProperties.addChild(ctrl);
    NSB.addProperties.bounds(ctrl);
    
    switch (type) {
    case "Alert_bs":         NSB.bs.alert.init(ctrl); break;
    case "Breadcrumbs_bs":   NSB.bs.breadcrumbs.init(ctrl); break;
    case "Button_bs":        NSB.bs.button.init(ctrl); break;
    case "Checkbox_bs":      NSB.bs.checkbox.init(ctrl); break;
    case "DataTable_bs":     NSB.bs.datatable.init(ctrl); break;
    case "Dropdown_bs":      NSB.bs.dropdown.init(ctrl); break;
    case "Fliptoggle_bs":    NSB.bs.fliptoggle.init(ctrl); break;
    case "GridColumn_bs":    NSB.bs.gridcolumn.init(ctrl); break;
    case "Hamburger_bs":     NSB.bs.dropdown.init(ctrl); break; //Added by BT
    case "Heading_bs":       NSB.bs.define.text(ctrl, 'value', ''); break;
    case "Input_bs":         NSB.bs.input.init(ctrl); break;
    case "Jumbotron_bs":     NSB.bs.jumbotron.init(ctrl); break;
    case "Label_bs":         NSB.bs.label.init(ctrl); break;
    case "Listgroup_bs":     NSB.bs.listgroup.init(ctrl); break;
    case "Media_bs":         NSB.bs.define.src(ctrl); break;
    case "Modal_bs":         NSB.bs.modal.init(ctrl); break;
    case "Pagination_bs":    NSB.bs.pagination.init(ctrl); break;
    case "Panel_bs":         NSB.bs.panel.init(ctrl); break;
    case "Progressbar_bs":   NSB.bs.progressbar.init(ctrl); break;
    case "Radiobutton_bs":   NSB.bs.radiobutton.init(ctrl); break;
    case "Select_bs":        NSB.bs.select.init(ctrl); break;
    case "Tabs_bs":          NSB.bs.tabs.init(ctrl); break;
    case "Textarea_bs":      NSB.bs.input.init(ctrl); break;
    case "Thumbnail_bs":     NSB.bs.define.src(ctrl); break;
    }
};

NSB.bs.alert = {
    
    init: function(ctrl){
        NSB.bs.define.appearance(ctrl); 
        NSB.bs.define.text(ctrl, 'value', '');
    }
};
    
NSB.bs.breadcrumbs = {
    
    init: function(ctrl){
        NSB.bs.define.length(ctrl); 
        NSB.bs.define.disabled_contents(ctrl);
        
        ctrl.setValue = function(arrItems){
            var i, s, onclick;
            if (arrItems === '') arrItems = [];
            s = onclick = '';         
            for (i = 0; i < arrItems.length; i++) {
                onclick = " onclick='if (!this.disabled) " + this.id + ".onclick(this.textContent);'";
                if (i != arrItems.length-1 && !this.disabled) {
                    s += "  <li id=" + ctrl.id + "_" + i + onclick + " style='cursor:pointer'><a>" + arrItems[i] + "</a></li>\n";
                 } else {
                    s += "  <li id=" + ctrl.id + "_" + i + " class='active'" + onclick + " style='cursor:not-allowed'>" + arrItems[i] + "</li>\n";
                 }
            }
            //console.log(s);
            this.innerHTML = s;
        };
    }
};

NSB.bs.button = {
    
    init: function(ctrl){
        NSB.bs.define.appearance(ctrl); 
        NSB.bs.define.text(ctrl, 'value', '');
    }
};
        
NSB.bs.checkbox = {

    make: function (id, style, disabled, items, inline, value) {
        var i, s, arrItems, item, type;
        arrItems = items.split("\n");
        if (items === '') {
            arrItems = [];
        }

        s = '';
        if(inline) s+="<br>\n";
        s += "  <div id='" + id + "_contents' class='checkbox'>\n";
        for (i = 0; i < arrItems.length; i++) {
            item = arrItems[i];
            type = '';
            if (item.substr(0,1) == '*') {
                type = "disabled";
                item = item.substr(1);}
            if (item.substr(0,1) == '>') {
                type = 'checked';
                item = item.substr(1);}
            if (disabled !== '') type = 'disabled';

            s += this.getHTML(id, i, item, type, inline);
        }
        s += "  </div>\n";
        //console.log(s);
        return s;
    },
    
    init: function(ctrl){
        NSB.bs.define.disabled_contents(ctrl);
        NSB.bs.define.length(ctrl);     
        NSB.bs.define.header_control_label(ctrl);
        NSB.bs.define.footer_help_block(ctrl);
        NSB.bs.define.placeholder(ctrl);
        ctrl.addItem = this.addItem;
        ctrl.clear = function() {$('#'+this.id+'_contents').empty();};

        ctrl.getValue = function (n) {
            try {
                return NSB.$(ctrl.id + "_" + n).checked;
            } catch (err) {
                alert(err.message);
            }
        };
        ctrl.setValue = function (n, val) {
            if (typeof (val) !== "boolean") return;
            try {
                NSB.$(ctrl.id + "_" + n).checked = val;
            } catch (err) {
                alert(err.message);
            }
        };
    },
    
    getHTML: function(id, i, item, type, inline) {
        // type can be '', disabled or checked.
        var s = '';
        if (type !== '') type = ' ' + type;
        if(!inline) {
            s += "    <div class='checkbox'>\n";
            s += "      <label><input id=" + id + "_" + i + " type='checkbox'" + type +">" + item + "</label>\n";
            s += "    </div>\n";
          } else {
            s += "    <label class='checkbox-inline'><input id=" + id + "_" + i + " type='checkbox'" + type +">" + item + "</label>\n";
            }
        return s;
        },
            
    addItem: function(item, type) {
        var inline = $('#'+this.id+'_0').parent().hasClass('checkbox-inline');
        var s = NSB.bs.checkbox.getHTML(this.id, this.length, item, type, inline);
        NSB.$(this.id+'_contents').insertAdjacentHTML('beforeend', s);
    }
    
};

NSB.bs.datatable = {

    init: function(ctrl){ 
        ctrl.clear = function(){
            if (this.innerHTML!='') {
                $('#'+this.id).DataTable().destroy();
                $('#'+this.id).empty();	
                $('#'+this.id).off( 'click', 'td');
            }
        }   
        
        ctrl.build = function(){
            this.clear();
            $('#'+this.id).DataTable(this.settings);
        }   
    }
    
};

NSB.bs.dropdown = {
    //also used by Hamburger
    
    dropdowngroup: "",
    
    make: function (id, value, dropdown, klass, disabled, style, styleb, buttonStyle, size, icon, 
            align, items, grouping, groupStyle, bsBadge, bsPopover) {
        var i, s, gs, gr, arrItems, item, type;
        arrItems = items.split("\n");
        if (items === '') {
            arrItems = [];
        }

        if(klass !== '') klass = ' ' + klass;
        s = '';
        if (grouping !== '' && grouping !== 'end') {
            gs = (groupStyle === '') ? '' : " style='" + groupStyle + "'";
            gr = (grouping === 'vertical') ? 'btn-group-vertical' : 'btn-group';
            s += "<div id='" + id + "_group' class='" + gr + klass + "' role='group'" + gs + ">\n";
            this.dropdowngroup = "btn-group ";
            }
            
        s += "<div id='"+ id + "' class='" + this.dropdowngroup + dropdown + klass +"' value='" + value + "'";
        s += " style='"+ style + "' onclick=''" + bsPopover + ">\n";
        s += "  <button id='"+ id + "_button' class='btn dropdown-toggle " + buttonStyle + size + "'";
        if (styleb !== '') s += " style='" + styleb + "'";
        s += " type='button' data-toggle='dropdown'" + disabled + ">\n";
        s += "    " + value + "\n";
        s += "    " + bsBadge + "\n";
        if (icon == 'caret') {
            s += "    <span class='" + icon + "'></span>\n";
        } else {
            s += "    <span class='fa fa-" + icon + "'></span>\n";
        }
        s += "  </button>\n";
        s += "  <ul id='" + id + "_contents' class='dropdown-menu" + align + "' >\n";
        for (i = 0; i < arrItems.length; i++) {
            item = arrItems[i];
            type = '';
            if ('-!*'.indexOf(item.substr(0,1)) >= 0) {
                type = ["divider", "header", "disabled"][('-!*'.indexOf(item.substr(0,1)))];
                item = item.substr(1);
            }
            s += this.getHTML(id, i, item, type);
        }    
        s += "  </ul>\n";
        s += "</div>\n";
        
        if (grouping == 'end') {
            s += "</div>\n";
            this.dropdowngroup = "";
            }
            
        //console.log(s);
        return s;
    },
    
    init: function(ctrl) {
        NSB.bs.define.length(ctrl);
        NSB.bs.define.disabled_button(ctrl);
        ctrl.addItem = this.addItem;
        ctrl.enable = this.enable; //Added by BT
        ctrl.clear = function() {$('#'+this.id+'_contents').empty();};
        NSB.defineProperty(ctrl, 'value', {
            set: function (n) {
                NSB.$(ctrl.id + "_button").innerHTML = NSB.$(ctrl.id + "_button").innerHTML.replace(ctrl.value, n);
            },
            get: function () {
                return $('#' + ctrl.id + "_button").text().trim();
            }
        });
          $('#'+ctrl.id).on('show.bs.dropdown', function () {
          NSB.overlayShowing = true;
        })
    },
        
    getHTML: function(id, i, item, type) {
        var s, onclick, idprop;
        idprop = "id='" + id + "_" + i + "'";
        switch(type){
            case "divider":
                s = "    <li " + idprop + " class='divider'></li>\n";
                break;
            case "selected":
                s = "    <li " + idprop + " class='dropdown-header' style='cursor:default'>" + item + "</li>\n";
                break;
            case "disabled":
                s = "    <li " + idprop + " class='disabled'><a>" + item + "</a></li>\n";
                break;
            default:
                onclick = " onclick='" + id + ".selection=this.textContent;" + id + ".onclick(this.textContent);'";
                s = "    <li " + idprop + onclick + " style='cursor:default'><a>" + item + "</a></li>\n";
        }
        return s;
    },
            
    addItem: function(item, type) {
        var s = NSB.bs.dropdown.getHTML(this.id, this.length, item, type);
        NSB.$(this.id+'_contents').insertAdjacentHTML('beforeend', s);
    },

    enable: function (index, enable) { //Added by BT
        var i;
        var type = '';
        var cntl;
        if (typeof index === 'boolean') {
            enable = index;
            index = 'ALL';
        }
        if (enable === false) {
            type = 'disabled';
        }

        function toggleEnable(cntl, type) {
            var obj = $('#' + cntl);
            obj = obj[0];
            var pobj = obj.parentElement.parentElement;
            if (obj.classList.contains('divider')) return;
            
            $('#' + cntl).removeClass('disabled');

            if (type === '') {
                $('#' + cntl).attr('onclick', pobj.id + '.selection = this.textContent; ' + pobj.id + '.onclick(this.textContent);')
            } else {
                obj.removeAttribute('onclick');
            }
            $('#' + cntl).addClass(type);
            $('#' + cntl).attr('style','cursor:default');
        }

        if (typeof index === 'number') {
            cntl = this.id + '_' + index;
            toggleEnable(cntl, type);
        } else if (typeof index === 'object') {
            for (i = 0; i < index.length; i++) {
                cntl = this.id + '_' + index[i];
                toggleEnable(cntl, type);
            }
        } else {
            //assume ALL controls get set the same
            for (i = 0; i < this.length; i++) {
                cntl = this.id + '_' + i;
                toggleEnable(cntl, type);
            }
        }
    }

};

NSB.bs.fliptoggle = {
    
    init: function(ctrl){
        NSB.bs.define.prop(ctrl, 'value', ' input', 'checked');
        NSB.bs.define.text(ctrl, 'text', ' span');
        NSB.defineProperty(ctrl, 'disabled', {
            set: function (n) {
                NSB.$(ctrl.id+'_value').disabled = n;
            },
            get: function () {
                return NSB.$(ctrl.id+'_value').disabled;
            }
        });
    }
};

NSB.bs.gridcolumn = {
    
    init: function(ctrl){
        ctrl.style.float = 'none';
    }
};

NSB.bs.input = {
    
    init: function(ctrl){
        NSB.bs.define.header_control_label(ctrl);
        NSB.bs.define.footer_help_block(ctrl);
        NSB.bs.define.placeholder(ctrl);
        NSB.defineProperty(ctrl, 'value', {
            set: function (n) {
                $('#'+ctrl.id+'_contents').val(n);
            },
            get: function () {
                return $('#'+ctrl.id+'_contents').val();
            }
        });
        NSB.defineProperty(ctrl, 'disabled', {
            set: function (n) {
                NSB.$(ctrl.id+'_contents').disabled = n;
            },
            get: function () {
                return NSB.$(ctrl.id+'_contents').disabled;
            }
        });
        NSB.defineProperty(ctrl, 'files', {
            get: function () {
                return NSB.$(ctrl.id+'_contents').files;
            }
        });
        NSB.defineProperty(ctrl, 'selectionStart', {
            set: function (n) {
                NSB.$(ctrl.id+'_contents').selectionStart = n;
            },
            get: function () {
                return NSB.$(ctrl.id+'_contents').selectionStart;
            }
        });
        NSB.defineProperty(ctrl, 'selectionEnd', {
            set: function (n) {
                NSB.$(ctrl.id+'_contents').selectionEnd = n;
            },
            get: function () {
                return NSB.$(ctrl.id+'_contents').selectionEnd;
            }
        });
        NSB.$(ctrl.id).select = function() {NSB.$(ctrl.id+'_contents').select()};
        NSB.$(ctrl.id).focus = function() {NSB.$(ctrl.id+'_contents').focus()};
    }
};

NSB.bs.jumbotron = {
    
    init: function(ctrl){
        NSB.bs.define.disabled_button(ctrl);
        NSB.bs.define.text(ctrl, 'header', ' h1');
        NSB.bs.define.text(ctrl, 'value', ' p:nth-child(2)');
        NSB.bs.define.text(ctrl, 'buttonValue', '_button');
    }

};

NSB.bs.label = {
    
    init: function(ctrl){
        NSB.bs.define.appearance(ctrl); 
        NSB.bs.define.text(ctrl, 'value', '');
    }
};

NSB.bs.listgroup = {

    make: function (id, style, klass, disabled, items, itemBadges, appearances, listStyle, bsPopover) {
        var i, s, arrItems, arrBadges, arrAppearances, item, type;
        arrItems = items.split("\n");
        arrBadges = itemBadges.split("\n");
        arrAppearances = appearances.split("\n");
        if (items === '') arrItems = arrBadges = arrAppearances = [];

        if(klass !== '') klass = ' ' + klass;
        s = "<" + listStyle + " id='" + id + "' class='list-group" + klass + "' style='" + style + "'" + disabled + bsPopover + " onclick=''>\n";
        for (i = 0; i < arrItems.length; i++) {
           item = arrItems[i];
           type = '';
           if (item.substr(0,1) == '>') {
                type = ' active';
                item = item.substr(1);}
           if (disabled !== '' && item.substr(0,1) !== '*') item = '*' + item;
           if (item.substr(0,1) == '*') {
                type = ' disabled';
                item = item.substr(1);
           }
           if (i>appearances.length - 1) arrAppearances[i] = 'default';
           if (i>arrBadges.length - 1) arrBadges[i] = '';
        
           s += this.getHTML(id, i, item, type, arrBadges[i], arrAppearances[i], listStyle);
           }
        s += "</" + listStyle + ">";
        //console.log(s);
        return s;
    },
    
    init: function(ctrl) {
        ctrl.value = -1;
        NSB.bs.define.length(ctrl);     
        NSB.bs.define.disabled_contents(ctrl);
        ctrl.addItem = this.addItem;
        ctrl.badge = this.badge;
        ctrl.clear = function() {$('#'+this.id).empty();};
    },
    
    getHTML: function(id, i, item, type, badge, appearance, listStyle) {
        var s, idprop, onclick, style, k;
        badge = "<span id='" + id + "_" + i + "_badge' class='badge'>" + badge+ "</span>";
        idprop = "id='" + id + "_" + i + "'";  
        
        if (type != ' disabled') {
            onclick = " onclick='if (!" + id + ".disabled) {" + id + ".value=" + i + ";" 
                + id + ".selection=\"" + item + "\";"
                + id + ".onclick(" + i + ");}'";
            style = " style='cursor:pointer'";
        } else {
            style = " style='cursor:not-allowed'";
        }

        k = " class = 'list-group-item" + type;
        if (listStyle == 'div') {
            if (appearance !== 'default') k += ' btn-' + appearance;
            s = "  <button " + idprop + " type='button'" + k + "'" + onclick + style + ">" + badge + item + "</button>\n";
            } else {
            if (appearance !== 'default') k += ' list-group-item-' + appearance;
            s = "  <li " + idprop + k + "'" + onclick + style + ">" + item + badge +"</li>\n";
            }
        return s;
        },
            
    addItem: function(item, type, appearance) {
        // type can be empty, active or disabled.
        if (!type) type ='';
        if (type !== '') type = ' ' + type;
        if (!appearance || appearance === '') appearance = 'default';
        var listStyle = (NSB.$(this.id).tagName === 'UL') ? 'ul' : 'div';
        var s = NSB.bs.listgroup.getHTML(this.id, this.length, item, type, '', appearance, listStyle);
        NSB.$(this.id).insertAdjacentHTML('beforeEnd', s);
    },
    
     badge: function(i, n) {     
        if (!n) {
            return $('#'+this.id+'_' + i + '_badge').text();
        } else {
            $('#'+this.id+'_' + i + '_badge').text(n);
        }
     }            

};

NSB.bs.modal = {
    
    init: function(ctrl){
        $(ctrl).removeClass('collapse in');
        NSB.defineProperty(ctrl, 'header', {
            set: function (n) {
                if ($('#'+ctrl.id+' .modal-title').length === 0)
                    $(ctrl).prepend("<h4 class='modal-title'><span id=" + ctrl.id + "_badge class=badge></span></h4>");
                $('#'+ctrl.id+' .modal-title').text(n);
            },
            get: function () {
                return $('#'+ctrl.id+' .modal-title').text();
            }
        });
    
        NSB.defineProperty(ctrl, 'value', {
            set: function (n) {
                if ($('#'+ctrl.id+' .modal-body').length === 0)
                    $(ctrl).append("<div class='modal-body'></div>");
                $('#'+ctrl.id+' .modal-body').text(n);
            },
            get: function () {
                return $('#'+ctrl.id+' .modal-body').text();
            }
        });
    
        NSB.defineProperty(ctrl, 'footer', {
            set: function (n) {
                if ($('#'+ctrl.id+' .modal-footer').length === 0)
                    $(ctrl).append("<div class='modal-footer'></div>");
                $('#'+ctrl.id+' .modal-footer').text(n);
            },
            get: function () {
                return $('#'+ctrl.id+' .modal-footer').text();
            }
        });       
    }
};

NSB.bs.pagination = {

    make: function (id, disabled, items, size) {
        var i, s, k, arrItems, item, onclick, idprop;
        items = "&laquo;\n" + items + "\n&raquo;";
        arrItems = items.split("\n");
        if (items === '') arrItems = [];

        s = '';
        for (i = 0; i < arrItems.length; i++) {
           item = arrItems[i];
           k = 'pagination' + size;
           if (item.substr(0,1) == '>') {
                k += ' active';
                item = item.substr(1);}
           if (disabled !== '' && item.substr(0,1) !== '*') item = '*' + item;
           if (item.substr(0,1) == '*') {
                k += ' disabled';
                item = item.substr(1);
           }
           s += this.getHTML(id, i, item, k);
           }
        //console.log(s);
        return s;
    },
    
    init: function(ctrl){
        NSB.bs.define.length(ctrl); 
        NSB.bs.define.disabled_contents(ctrl);
        ctrl.addItem = this.addItem;
        ctrl.clear = function() {$('#'+this.id+'_contents').empty();};
        NSB.defineProperty(ctrl, 'value', {
            set: function (n) {
                if (n>=ctrl.length) return;
                $('[id^='+ctrl.id+'_'+']').removeClass('active'); 
                if (n>=0) $('#'+ctrl.id+'_'+n).addClass('active'); 
            },
            get: function () {
                for (var i = 0; i < ctrl.length; i++) {
                   if ($('#'+ctrl.id + '_' + i).hasClass('active')) return i;
                }
                return -1;
            }
        });
   },
    getHTML: function(id, i, item, type) {
        var onclick, idprop, s;
        if (type !== '') type = ' ' + type;
        onclick = "onclick='if (!" + id + ".disabled) {" + id + ".value=" + i + ";" + id + ".onclick(" + i + ");}'";
        idprop = "id='" + id + "_" + i + "'";
        s = "  <li " + idprop + " class='" + type + "' " + onclick + " style='cursor:pointer'><a>" + item + "</a></li>\n";
        return s;
        },
            
    addItem: function(item, type) {
        var s = NSB.bs.pagination.getHTML(this.id, this.length, item, type);
        NSB.$(this.id+'_contents').insertAdjacentHTML('beforeend', s);
        //console.log(s);
    }
};


NSB.bs.panel = {
    
    init: function(ctrl){
        NSB.bs.define.appearance(ctrl);
        NSB.defineProperty(ctrl, 'header', {
            set: function (n) {
                if ($('#'+ctrl.id+' .panel-heading').length === 0)
                    $(ctrl).prepend("<div class='panel-heading'><span id=" + ctrl.id + "_badge class=badge></div>");
                $('#'+ctrl.id+' .panel-heading').text(n);
            },
            get: function () {
                return $('#'+ctrl.id+' .panel-heading').text();
            }
        });
    
        NSB.defineProperty(ctrl, 'value', {
            set: function (n) {
                if ($('#'+ctrl.id+' .panel-body').length === 0)
                    $(ctrl).append("<div class='panel-body'></div>");
                $('#'+ctrl.id+' .panel-body').text(n);
            },
            get: function () {
                return $('#'+ctrl.id+' .panel-body').text();
            }
        });
    
        NSB.defineProperty(ctrl, 'footer', {
            set: function (n) {
                if ($('#'+ctrl.id+' .panel-footer').length === 0)
                    $(ctrl).append("<div class='panel-footer'></div>'></div>");
                $('#'+ctrl.id+' .panel-footer').text(n);
            },
            get: function () {
                return $('#'+ctrl.id+' .panel-footer').text();
            }
        });       

    }
};

NSB.bs.progressbar = {

    init: function(ctrl){
        NSB.bs.define.appearance(ctrl); 
        NSB.defineProperty(ctrl, 'value', {
        set: function (n) {
            $('#'+ctrl.id+'_contents').attr('valuenow', n);
            $('#'+ctrl.id+'_contents').html(n + '%');
            $('#'+ctrl.id+'_contents').css('width', n + '%');     
        },
        get: function () {
            return $('#'+ctrl.id+'_contents').attr('valuenow');
        }
        });
    }
};

NSB.bs.radiobutton = {

    make: function (id, style, disabled, items, inline) {
        var i, s, arrItems, item, type;
        arrItems = items.split("\n");
        if (items === '') {
            arrItems = [];
        }

        s = '';
        if(inline !== '') s+="<br>\n";
        s += "  <div id='" + id + "_contents' class='radio'>\n";
        for (i = 0; i < arrItems.length; i++) {
            item = arrItems[i];
            type = '';
            if (item.substr(0,1) == '*') {
                type = "disabled";
                item = item.substr(1);}
            if (item.substr(0,1) == '>') {
                type = 'checked';
                item = item.substr(1);}
            if (disabled !== '') type = 'disabled';

            s += this.getHTML(id, i, item, type, inline);
            }
        s += "  </div>\n";       
        //console.log(s);
        return s;
    },
    
    init: function(ctrl) {
        NSB.bs.define.disabled_contents(ctrl);
        NSB.bs.define.length(ctrl);     
        NSB.bs.define.header_control_label(ctrl);
        NSB.bs.define.footer_help_block(ctrl);
        NSB.bs.define.placeholder(ctrl);
        ctrl.addItem = this.addItem;
        ctrl.clear = function() {$('#'+this.id+'_contents').empty();};
        NSB.defineProperty(ctrl, 'value', {
            set: function (n) {
                for (var i = 0; i < ctrl.length; i++) {
                   NSB.$(ctrl.id + '_' + i).checked = (i === n);}
            },
            get: function () {
                for (var i = 0; i < ctrl.length; i++) {
                   if (NSB.$(ctrl.id + '_' + i).checked) return i;
                }
                return -1;
            }
        });
    },
    
    getHTML: function(id, i, item, type, inline) {
        // type can be '', disabled or checked.
        var s = '';
        if (type !== '') type = ' ' + type;
        if(!inline) {
            s += "    <div class='radio'>\n";
            s += "      <label><input id=" + id + "_" + i + " type='radio'" + type + " name=" + id + ">" + item + "</label>\n";
            s += "    </div>\n";
          } else {
            s += "    <label class='radio-inline'><input id=" + id + "_" + i + " type='radio'" + type + " name=" + id + ">" + item + "</label>\n";
            }
        return s;
        },
            
    addItem: function(item, selected, disabled) {
        var inline = $('#'+this.id+'_0').parent().hasClass('radio-inline');
        var s = NSB.bs.radiobutton.getHTML(this.id, this.length, item, selected, disabled, inline);
        NSB.$(this.id+'_contents').insertAdjacentHTML('beforeend', s);
    }
        
};

NSB.bs.select = {

    make: function (id, style, disabled, items, multiSelect, size) {
        var i, s, arrItems, item, type;
        arrItems = items.split("\n");
        if (items === '') {
            arrItems = [];
        }

        if(multiSelect !=='') multiSelect = " multiple";
        if(size !=='') size = " size=" + size;
        s = "<select id='" + id + "_contents' class='form-control'" + disabled + multiSelect + size +">\n";
        for (i = 0; i < arrItems.length; i++) {
           item = arrItems[i];
           type = '';
           if (item.substr(0,1) == '*') {
                type = 'disabled';
                item = item.substr(1);}
           if (item.substr(0,1) == '>') {
                type = 'selected';
                item = item.substr(1);}
               
            s += this.getHTML(id, i, item, type);
            }
        s += "</select>";
        //console.log(s);
        return s;
    },
    
    init: function(ctrl) {
        NSB.bs.define.length(ctrl);     
        NSB.bs.define.header_control_label(ctrl);
        NSB.bs.define.footer_help_block(ctrl);
        NSB.bs.define.placeholder(ctrl);
        ctrl.addItem = this.addItem;
        ctrl.clear = function() {
            $('#'+this.id+'_contents').empty();
            NSB.$(this.id+'_contents').focus();
        };
        NSB.defineProperty(ctrl, 'value', {
            set: function (n) {
                for (var i = 0; i < ctrl.length; i++) {
                   NSB.$(ctrl.id + '_' + i).selected = (i === n);}
            },
            get: function () {
                var arr = [];
                for (var i = 0; i < ctrl.length; i++) {
                   if (NSB.$(ctrl.id + '_' + i).selected) arr.push(i);
                }
                if (arr.length == 0) return -1;
                if (arr.length == 1) return arr[0];
                return arr;
            }
        });
      
        NSB.defineProperty(ctrl, 'text', {
            set: function (n) {
                for (var i = 0; i < ctrl.length; i++) {
                   NSB.$(ctrl.id + '_' + i).selected = (NSB.$(ctrl.id + '_' + i).value === n);}
            },
            get: function () {
                var arr = [];
                for (var i = 0; i < ctrl.length; i++) {
                   if (NSB.$(ctrl.id + '_' + i).selected) 
                        arr.push(NSB.$(ctrl.id + '_' + i).value);
                }
                if (arr.length == 0) return -1;
                if (arr.length == 1) return arr[0];
                return arr;
            }
        });
      
        NSB.defineProperty(ctrl, 'disabled', {
            set: function (n) {
                NSB.$(ctrl.id + '_contents').disabled = n;
            },
            get: function () {
                return NSB.$(ctrl.id + '_contents').disabled;
            }
        });
    },
    
    getHTML: function(id, i, item, type) {
        var s = '';
        if (type !== '') type = ' ' + type;
        s = "    <option id=" + id + "_" + i + type +">" + item + "</option>\n";
        return s;
        },
            
    addItem: function(item, selected, disabled) {
        var type = '';
        if (selected) type = 'selected';
        if (disabled) type = 'disabled';
        var s = NSB.bs.select.getHTML(this.id, this.length, item, type);
        NSB.$(this.id+'_contents').insertAdjacentHTML('beforeend', s);
    }

};

NSB.bs.tabs = {

    make: function (id, disabled, items, color) {
        var i, s, k, arrItems, item, onclick, idprop;
        arrItems = items.split("\n");
        if (items === '') arrItems = [];

        s = '';
        for (i = 0; i < arrItems.length; i++) {
           item = arrItems[i];
           k = '';
           if (item.substr(0,1) == '>') {
                k += ' active';
                item = item.substr(1);}
           if (disabled !== '' && item.substr(0,1) !== '*') item = '*' + item;
           if (item.substr(0,1) == '*') {
                k += ' disabled';
                item = item.substr(1);
           }
           s += this.getHTML(id, i, item, k, color);
           }
        return s;
    },
    
    init: function(ctrl){
        NSB.bs.define.length(ctrl); 
        NSB.bs.define.disabled_contents(ctrl);
        ctrl.addItem = this.addItem;
        ctrl.enable = this.enable; //Added by BT
        ctrl.item = this.item; //Added by BT
        ctrl.addEventListener('onclick',function (ctrl) { return ctrl; });
        ctrl.clear = function() {$('#'+this.id).empty();};
        NSB.defineProperty(ctrl, 'value', {
            set: function (n) {
                if (n>=ctrl.length) return;
                $('[id^='+ctrl.id+'_'+']').removeClass('active'); 
                if (n>=0) $('#'+ctrl.id+'_'+n).addClass('active'); 
            },
            get: function () {
                for (var i = 0; i < ctrl.length; i++) {
                   if ($('#'+ctrl.id + '_' + i).hasClass('active')) return i;
                }
                return -1;
            }
        });
    },
    getHTML: function(id, i, item, type, color) {
        var onclick, idprop, s, c;
        if (type !== '') type = ' ' + type;
        onclick = "onclick='if (!$(\"#" + id + "_"+i+"\").hasClass(\"disabled\")) {" + id + ".value=" + i + ";" + id + ".onclick(" + i + ");}'";
        idprop = "id='" + id + "_" + i + "'";
        s = "  <li " + idprop + " class='" + type + "' " + onclick + " style='cursor:pointer'>"
        c = (color == "") ? "" : " style='color:"+color+";'";
        s += "<a" + c + ">" + item + "</a></li>\n";
        return s;
        },
            
    addItem: function(item, active, disabled) {
        var type='';
        if (active) type = 'active';
        if (disabled) type = 'disabled';
        var s = NSB.bs.tabs.getHTML(this.id, this.length, item, type);
        NSB.$(this.id).insertAdjacentHTML('beforeend', s);
        //console.log(s);
    },

    enable: function (index, enable) { //Added by BT
        var i;
        var type = '';
        var cntl;
        if (typeof index === 'boolean') {
            enable = index;
            index = 'ALL';
        }
        if (enable === false) {
            type = 'disabled';
        }

        function toggleEnable(cntl, type) {
            $('#' + cntl).removeClass('disabled');
            $('#' + cntl).addClass(type);
        }
        
        if (typeof index === 'number') {
            cntl = this.id + '_' + index;
            toggleEnable(cntl, type);
        } else if (typeof index === 'object') {
            for (i = 0; i < index.length; i++) {
                cntl = this.id + '_' + index[i];
                toggleEnable(cntl, type);
            }
        } else {
            //assume ALL controls get set the same
            for (i = 0; i < this.length; i++) {
                cntl = this.id + '_' + i;
                toggleEnable(cntl, type);
            }
        }
    },

    item: function () { //Added by BT
        return this.children[this.value].innerText;
    }

};
        
NSB.bs.define = {
     
    appearance: function(ctrl){
        NSB.defineProperty(ctrl, 'appearance', {
        set: function (n) {
            $('#' + ctrl.id).removeClass(ctrl.appearance);
            $('#' + ctrl.id).addClass(n);
        },
        get: function () {
            var i, c, w=['-danger','-default','-info','-link','-primary','-success','-warning'];
            var id = (NSB.$(ctrl.id + '_contents') == null) ? ctrl.id : ctrl.id + '_contents';
            for (i=0; i<w.length; i++) {
                c = ctrl.classList[0]+w[i];
                if (ctrl.classList[0] == 'progress') c = ctrl.classList[0]+'-bar'+w[i];
                //console.log(c);
                if ($("#"+id).hasClass(c)) return c;}
            return '';
        }
        });
    },
    
    badge: function(ctrl, type){
        if (type == 'Listgroup_bs') return;
        NSB.defineProperty(ctrl, 'badge', {
        set: function (n) {
            if (NSB.$(ctrl.id + '_badge') == null) return;
            $('#'+ctrl.id+'_badge').html(n);
        },
        get: function () {
            if (NSB.$(ctrl.id + '_badge') == null) return;
            return $('#'+ctrl.id+'_badge').html();
        }
        });
    },
    
    disabled_button: function(ctrl){        
        NSB.defineProperty(ctrl, 'disabled', {
            set: function (n) {
                NSB.$(ctrl.id+'_button').disabled = n;
            },
            get: function () {
                if (NSB.$(ctrl.id+'_button')) return NSB.$(ctrl.id+'_button').disabled;
            }
        });
    },
    
    disabled_contents: function(ctrl){
        NSB.defineProperty(ctrl, 'disabled', {
            set: function (n) {
                for (var i = 0; i < ctrl.length; i++) {
                   NSB.$(ctrl.id + '_' + i).style.cursor = n ? 'not-allowed' : 'pointer';
                   NSB.$(ctrl.id + '_' + i).disabled = n;
                   if (n) {
                       $('#' + ctrl.id + '_' + i).addClass('disabled');
                   } else {
                       $('#' + ctrl.id + '_' + i).removeClass('disabled');
                   }
                }
                ctrl.setAttribute("disabled", n.toString());
            },
            get: function() {
                return (ctrl.getAttribute("disabled") == "true");
            }
        }); 
    },
    
    header_control_label: function(ctrl){
        NSB.defineProperty(ctrl, 'header', {
            set: function (n) {
                if ($('#'+ctrl.id+' .control-label').length === 0)
                    $(ctrl).prepend("<label class='control-label' for=" + ctrl.id + "></label>");
                $('#'+ctrl.id+' .control-label').text(n);
            },
            get: function () {
                return $('#'+ctrl.id+' .control-label').text();
            }
        });
    },
    
    footer_help_block: function(ctrl){
        NSB.defineProperty(ctrl, 'footer', {
            set: function (n) {
                if ($('#'+ctrl.id+' .help-block').length === 0)
                    $(ctrl).append("<span class='help-block'></span>");
                $('#'+ctrl.id+' .help-block').text(n);
            },
            get: function () {
                return $('#'+ctrl.id+' .help-block').text();
            }
        });
    },
    
    length: function(ctrl){
        NSB.defineProperty(ctrl, 'length', {
            get: function(){
                var id = (NSB.$(ctrl.id + '_contents') == null) ? ctrl.id : ctrl.id + '_contents';
                return NSB.$(id).children.length;}
            });    
    },
    
    placeholder: function(ctrl){
        NSB.defineProperty(ctrl, 'placeholder', {
            set: function (n) {
                $('#'+ctrl.id+'_contents').attr('placeholder', n);
            },
            get: function () {
                return $('#'+ctrl.id+'_contents').attr('placeholder');
            }
        });
    },

    src: function(ctrl){
        NSB.defineProperty(ctrl, 'src', {
            set: function (n) {
                $('#'+ctrl.id+' img').attr('src', n);
            },
            get: function () {
                return $('#'+ctrl.id+' img').attr('src');
            }
        });    
    },
    
    text: function(ctrl, name, selector){
        NSB.defineProperty(ctrl, name, {
            set: function (n) {
                $('#'+ctrl.id+selector).text(n);
            },
            get: function () {
                return $('#'+ctrl.id+selector).text();
            }
        });
    },

    prop: function(ctrl, name, selector, attr){
        NSB.defineProperty(ctrl, name, {
            set: function (n) {
                $('#'+ctrl.id+selector).prop(attr, n);
            },
            get: function () {
                return $('#'+ctrl.id+selector).prop(attr);
            }
        });
    }

};
    
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
    $('[data-toggle="popover"]').popover(); 
});

