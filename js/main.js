var toto = {}, titi = {};
//var apiUrl = "https://api.openstreetmap.org/api/0.6/";
//var node = 2756579027;

var apiUrl = "https://master.apis.dev.openstreetmap.org/api/0.6/"
var testNodeId = 4316641109;


var osmSpellCheck = {

    init: function() {
        //bind controls
        var nodeId = $("#nodeId").val(testNodeId);
        $("#btnGetOverpass").on("click", this.getOverpassNodeInfo);
        $("#btnGetApi").on("click", this.getApiNodeInfo);
    },

    getOverpassNodeInfo: function() {
        var nodeId = $("#nodeId").val();
        var time = new Date().toLocaleTimeString();
        osmSpellCheck.overpass.getNode(nodeId);
        $("#result").text(time);
    },

    getApiNodeInfo: function() {
        var nodeId = $("#nodeId").val();
        var time = new Date().toLocaleTimeString();
        osmSpellCheck.omsapi.getNode(nodeId);
        //$("#result").text(time);
    },

    overpass: {
        getNode: function(nodeId) {
            /*
                [out:json];
                area[name="Grenoble"]->.a;
                node[amenity=atm](area.a);
                out;
            */
           var overpassUrl = "https://overpass-api.de/api/interpreter?data=";
           var query = "[out:json];node("+ nodeId +");out;";
           $.getJSON(overpassUrl, {"data": query}, function(data) {
               console.log(data);
           });
           
        },
    },
   
    omsapi: {
        getNode: function(nodeId) {
            var query = "node/" + nodeId;
            var url = apiUrl + query;
            console.log(url);
            $.ajax({
                method: "GET",
                url: url
            })
            .done(function(xml) {
                $("#result").text(xml);
                console.log(xml);
                var tag = xml.querySelector("tag[k='operator']");
                console.log(tag);
                tag.setAttribute("v", "CAISSE EPARGNE");
                console.log(tag);
                toto = xml;
                titi = tag;
            })
            .fail(function(data) {
                $("#result").text(data);
            });
        },
    },
};

/*
var o, m = new Map();
var data = JSON.parse($(".data").innerHTML);
for (o of data.elements){ var t = o.tags["operator"]; if(t){ var n = m[t]; if(n){m[t] = n+1;}else{m[t]=1;} } }
*/

$(function() {
    osmSpellCheck.init();
});