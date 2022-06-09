export const joinData = function(countryData, joinData, leftAtt = "GID_0", rightAtt = "iso3") {
    countryData.features.forEach((x) => {
        let name = x.properties[leftAtt];
        let element = x;
        joinData.forEach((y) => {
            if (y[rightAtt] == name) {
                Object.keys(y).forEach((z) => {
                element.properties[z] = y[z];
                });
            }
        });
    });

    return countryData;
};

export const getColor = function(property, colorize, colorField = "COLOR") {
    if (property[colorField] && colorize) {
        return property[colorField];
    } else {
        return '#bcbcbc';
    }
};

export const getBorderColor = function(property, colorField = "COLOR") {
    if (property[colorField]) {
        return "black";
    } else {
        return "white";
    }
};

export const createGeoJson = function(pointData, L, info, filterCountriesIncluded, colorize, filterCountries = ["BFA", "MLI", "MRT", "TCD", "NER"]) {
    
    let geojson = L.geoJson(pointData, {
         style: function (feature) {
             return {
                 fillColor: getColor(feature.properties, colorize),
                 weight: 2,
                 opacity: 1,
                 color: getBorderColor(feature.properties),
                 dashArray: '2',
                 fillOpacity: 0.7
             };
         },
         onEachFeature: function (feature, layer) {
             layer.on({
                 mouseover: function highlightFeature(e) {
                    var layer = e.target;
                    const countryName = layer.feature.properties.NAME_0;
                    const countryCount = layer.feature.properties.count;
                    const countryFatalities = layer.feature.properties.fatalities;

                    let props = {};
                    props.countryName = countryName;
                    props.countryCount = countryCount;
                    props.countryFatalities = countryFatalities;
                    info.update(props);
                    
                    layer.setStyle({
                        fillOpacity: 1
                    });
                 },
                 mouseout: function (e) {
                     info.update();
                     geojson.resetStyle(e.target);
                 }
             });
         },
         filter: function(feature, layer) {
             if (!filterCountriesIncluded) {
                 return !(filterCountries.includes(feature.properties.GID_0))
             } else {
                 return (filterCountries.includes(feature.properties.GID_0))
             }
         }
     });

     return geojson;
 };

 export const createInfo = function(L, map) {
    let info = L.control();
    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        // @ts-ignore
        this.update();
        return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = function (props) {
        this._div.innerHTML = '<h4>Additional Information:</h4>' +  (props ?
            `
            <b>Countryname: </b> ${props.countryName}<br/>
            <b>Event count: </b> ${props.countryCount}<br/>
            <b>Event fatalities: </b> ${props.countryFatalities}
            `
            : 'Hover over a state');
    };

    return info;
  };