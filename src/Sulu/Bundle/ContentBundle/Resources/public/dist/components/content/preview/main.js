define(["app-config"],function(a){"use strict";var b={initiated:!1,init:function(){var a=this.sandbox.data.deferred();return b.initiated||(this.sandbox.dom.on(this.$el,"focusout",g.bind(this),".preview-update"),b.start.call(this,a),b.initiated=!0),a},update:function(a){var b="/admin/content/preview/"+this.data.id+"/update?webspace="+this.options.webspace+"&language="+this.options.language;this.sandbox.util.ajax({url:b,type:"POST",data:{changes:a}})},start:function(a){var b="/admin/content/preview/"+this.data.id+"/start?webspace="+this.options.webspace+"&language="+this.options.language;this.sandbox.util.ajax({url:b,type:"POST",data:{data:this.data},success:function(){a.resolve()}})},stop:function(a){var b="/admin/content/preview/"+this.data.id+"/stop?webspace="+this.options.webspace+"&language="+this.options.language;this.sandbox.util.ajax({url:b,type:"GET",success:function(){a.resolve()}})}},c={detection:function(){var a="MozWebSocket"in window?"MozWebSocket":"WebSocket"in window?"WebSocket":null;return null===a?(this.sandbox.logger.log("Your browser doesn't support Websockets."),!1):(window.MozWebSocket&&(window.WebSocket=window.MozWebSocket),!0)},init:function(){var d=a.getSection("sulu-content"),e=d.wsUrl+":"+d.wsPort,f=this.sandbox.data.deferred();return this.sandbox.logger.log("Connect to url: "+e),c.socket=new WebSocket(e),c.socket.onopen=function(){this.sandbox.logger.log("Connection established!"),this.opened=!0,this.sandbox.dom.on(this.formId,"keyup change",this.updateEvent.bind(this),".preview-update"),this.start(),f.resolve()}.bind(this),c.socket.onclose=function(){this.opened||(this.method="ajax",b.init.call(this).then(function(){f.resolve()}.bind(this)))}.bind(this),c.socket.onmessage=function(a){var b=JSON.parse(a.data);this.sandbox.logger.log("Message:",b)}.bind(this),c.socket.onerror=function(a){this.sandbox.logger.warn(a),this.method="ajax",b.init.call(this).then(function(){f.resolve()}.bind(this))}.bind(this),f},update:function(b){if("ws"===this.method&&c.socket.readyState===c.socket.OPEN){var d={command:"update",content:this.data.id,type:"form",user:a.getUser().id,webspaceKey:this.options.webspace,languageCode:this.options.language,params:{changes:b}};c.socket.send(JSON.stringify(d))}},start:function(){if("ws"===this.method){var b={command:"start",content:this.data.id,type:"form",user:a.getUser().id,webspaceKey:this.options.webspace,languageCode:this.options.language,params:{}};c.socket.send(JSON.stringify(b))}},stop:function(){if("ws"===this.method){var b={command:"stop",content:this.data.id,type:"form",user:a.getUser().id,webspaceKey:this.options.webspace,languageCode:this.options.language,params:{}};c.socket.send(JSON.stringify(b))}}},d=function(){var a;if(!this.initiated)return a=c.detection()?c.init.call(this):b.init.call(this),this.initiated=!0,this.sandbox.on("sulu.preview.update",function(a,b,c){if(this.data.id){var d=this.getSequence(a);"ws"!==this.method&&c||e.call(this,d,b)}},this),a.promise()},e=function(a,d){if(this.initiated){var e={};a&&d?e[a]=d:e=this.sandbox.form.getData(this.formId),"ws"===this.method?c.update.call(this,e):b.update.call(this,e)}},f=function(){if(this.initiated){var a={};"ws"===this.method?c.update.call(this,a):b.update.call(this,a)}},g=function(a){if(this.data.id&&this.initiated){var b=$(a.currentTarget),c=this.sandbox.dom.data(b,"element");e.call(this,this.getSequence(b),c.getValue())}},h=function(){this.sandbox.on("sulu.preview.update-property",function(a,b){e.call(this,a,b)}.bind(this)),this.sandbox.on("sulu.preview.update-only",function(){f.call(this)}.bind(this))};return{sandbox:null,options:null,data:null,$el:null,initiated:!1,opened:!1,method:"ws",formId:"#content-form",initialize:function(a,b,c,e){this.sandbox=a,this.options=b,this.data=c,this.$el=e,d.call(this).then(function(){h.call(this),this.sandbox.emit("sulu.preview.initiated")}.bind(this))},getSequence:function(a){a=$(a);for(var b,c=this.sandbox.dom.data(a,"mapperProperty"),d=a.parents("*[data-mapper-property]"),e=a.parents("*[data-mapper-property-tpl]")[0];!a.data("element");)a=a.parent();return d.length>0&&(b=this.sandbox.dom.data(d[0],"mapperProperty"),"string"!=typeof b&&(b=this.sandbox.dom.data(d[0],"mapperProperty")[0].data),c=[b,$(e).index(),this.sandbox.dom.data(a,"mapperProperty")]),c}}});