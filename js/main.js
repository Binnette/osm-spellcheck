var toto = {};

var osmSpellCheck = {

    init: function() {
        //bind controls
        $("#btnGetOverpass").on("click", this.getOverpassNodeInfo);
        $("#btnGetApi").on("click", this.getApiNodeInfo);
    },

    getOverpassNodeInfo: function() {
        var nodeId = $("#nodeId").val();
        var time = new Date().toLocaleTimeString();
        osmSpellCheck.overpass.getNode(2756579027);
        $("#result").text(time);
    },

    getApiNodeInfo: function() {
        var nodeId = $("#nodeId").val();
        var time = new Date().toLocaleTimeString();
        osmSpellCheck.omsapi.getNode(2756579027);
        $("#result").text(time);
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
           var apiUrl = "https://api.openstreetmap.org/api/0.6/";
           var query = "node/" + nodeId;
           var url = apiUrl + query;
           $.get(url, function(data) {
               console.log(data);
               var tag = data.querySelector("tag[k='operator']");
               tag.setAttribute("v", "CAISSE EPARGNE");
               console.log(data);
               toto = data;
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