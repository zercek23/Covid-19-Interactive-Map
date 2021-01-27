import React, { memo } from "react";
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

// const rounded = num => {
//     if (num > 1000000000) {
//         return Math.round(num / 100000000) / 10 + "Bn";
//     } else if (num > 1000000) {
//         return Math.round(num / 100000) / 10 + "M";
//     } else {
//         return Math.round(num / 100) / 10 + "K";
//     }
// };

const MapChart = ({ countryDatas, setTooltipContent }) => {
    return (
        <>
            <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
                <ZoomableGroup>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map(geo => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onMouseEnter={() => {
                                        const { ISO_A2 } = geo.properties;
                                        countryDatas.map(country => {
                                            if (ISO_A2 === country.code) {
                                                setTooltipContent(`${country.name} — ${country.totalCase}`);
                                            }                                            
                                        })

                                    }}
                                    onMouseLeave={() => {
                                        setTooltipContent("");
                                    }}
                                    style={{
                                        default: {
                                            fill: "#D6D6DA",
                                            outline: "none"
                                        },
                                        hover: {
                                            fill: "#F53",
                                            outline: "none"
                                        },
                                        pressed: {
                                            fill: "#E42",
                                            outline: "none"
                                        }
                                    }}
                                />
                            ))
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
        </>
    );
};

export default memo(MapChart);
