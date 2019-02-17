var toto = {}, titi = {};
//var apiUrl = "https://api.openstreetmap.org/api/0.6/";
//var node = 2756579027;

var apiUrl = "https://master.apis.dev.openstreetmap.org/api/0.6/"
//var testNodeId = 4316641109;


var osmSpellCheck = {

    init: function() {
        //bind controls
        //var nodeId = $("#nodeId").val(testNodeId);
        $("#btnGetApi").on("click", osmSpellCheck.getApiNodeInfo);
        $("#btnOpenChangeset").on("click", osmSpellCheck.openChangeset);
    },

    getApiNodeInfo: function() {
        var nodeId = $("#nodeId").val();
        var time = new Date().toLocaleTimeString();
        osmSpellCheck.getNode(nodeId);
        //$("#result").text(time);
    },

    openChangeset: function(){
        
    },

    getNode: function(nodeId) {
        var options = {
            username: "Binnette",
            password: "********",
            methodUrl: "node/" + nodeId,
            method: "GET"
        };
        
        var callbackOk = function(xml) {
            $("#result").text(xml);
            console.log(xml);
            var tag = xml.querySelector("tag[k='operator']");
            console.log("current operator");
            console.log(tag);
            tag.setAttribute("v", "CAISSE EPARGNE");
            console.log("new operator");
            console.log(tag);
            toto = xml;
            titi = tag;
        };

        var callbackKo = function(data) {
            $("#result").text(data);
        };

        osmSpellCheck.callApi(options, callbackOk, callbackKo);
    },

    callApi(options, callbackOk, callbackKo) {
        var url = apiUrl + options.methodUrl;
        var autorization = btoa(options.username + ":" + options.password);
        console.log("Url = " + url);
        $.ajax({
            /*xhrFields: {
                withCredentials: true
            },*/
            headers: {
                'Authorization': 'Basic ' + autorization
            },
            method: options.method,
            url: url
        })
        .done(callbackOk)
        .fail(callbackKo);
    }
};

/*
var o, m = new Map();
var data = JSON.parse($(".data").innerHTML);
for (o of data.elements){ var t = o.tags["operator"]; if(t){ var n = m[t]; if(n){m[t] = n+1;}else{m[t]=1;} } }
*/

$(function() {
    osmSpellCheck.init();
});