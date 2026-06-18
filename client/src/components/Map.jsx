import { Link } from "react-router"; 

function Map() {
    const networkLines = [
        { id: 'l-red', colorClass: 'stroke-red', path: "100,250 300,250 400,250 500,250 700,250" },
        { id: 'l-blue', colorClass: 'stroke-blue', path: "400,50 400,150 400,250 400,350 400,450" },
        { id: 'l-green', colorClass: 'stroke-green', path: "150,100 250,160 400,250 550,340 650,400" },
        { id: 'l-yellow', colorClass: 'stroke-yellow', path: "300,250 300,150 200,50" }
    ];

    const networkStations = [
        // Interscambio Centrale
        { id: 'st-00', name: 'SYS_CORE', cx: 400, cy: 250, type: 'interchange', colorClass: 'stroke-red', labelOffsetX: 15, labelOffsetY: -15 },
        
        // Linea Rossa (Orizzontale)
        { id: 'st-r1', name: 'WEST_GATE', cx: 100, cy: 250, type: 'station', colorClass: 'stroke-red', labelOffsetX: -30, labelOffsetY: -15 },
        { id: 'st-r2', name: 'SEC_01', cx: 300, cy: 250, type: 'station', colorClass: 'stroke-red', labelOffsetX: -20, labelOffsetY: -15 },
        { id: 'st-r3', name: 'SEC_02', cx: 500, cy: 250, type: 'station', colorClass: 'stroke-red', labelOffsetX: -20, labelOffsetY: -15 },
        { id: 'st-r4', name: 'EAST_GATE', cx: 700, cy: 250, type: 'station', colorClass: 'stroke-red', labelOffsetX: -30, labelOffsetY: -15 },

        // Linea Blu (Verticale)
        { id: 'st-b1', name: 'NORTH_HUB', cx: 400, cy: 50, type: 'station', colorClass: 'stroke-blue', labelOffsetX: 15, labelOffsetY: 5 },
        { id: 'st-b2', name: 'UPPER_MID', cx: 400, cy: 150, type: 'station', colorClass: 'stroke-blue', labelOffsetX: 15, labelOffsetY: 5 },
        { id: 'st-b3', name: 'LOWER_MID', cx: 400, cy: 350, type: 'station', colorClass: 'stroke-blue', labelOffsetX: 15, labelOffsetY: 5 },
        { id: 'st-b4', name: 'SOUTH_HUB', cx: 400, cy: 450, type: 'station', colorClass: 'stroke-blue', labelOffsetX: 15, labelOffsetY: 5 },

        // Linea Verde (Diagonale)
        { id: 'st-g1', name: 'NW_TERM', cx: 150, cy: 100, type: 'station', colorClass: 'stroke-green', labelOffsetX: -60, labelOffsetY: -10 },
        { id: 'st-g2', name: 'NW_MID', cx: 250, cy: 160, type: 'station', colorClass: 'stroke-green', labelOffsetX: -55, labelOffsetY: -10 },
        { id: 'st-g3', name: 'SE_MID', cx: 550, cy: 340, type: 'station', colorClass: 'stroke-green', labelOffsetX: 15, labelOffsetY: 15 },
        { id: 'st-g4', name: 'SE_TERM', cx: 650, cy: 400, type: 'station', colorClass: 'stroke-green', labelOffsetX: 15, labelOffsetY: 15 },
        
        // Linea Gialla (Diramazione)
        { id: 'st-y1', name: 'Y_BRANCH', cx: 200, cy: 50, type: 'station', colorClass: 'stroke-yellow', labelOffsetX: -70, labelOffsetY: 0 }
    ];


    return (
        <div className="page-center page-enter">
            <div className="metro-card map-container-card">
                
                {/* header map */}
                <div className="d-flex justify-content-between align-items-end mb-2">
                    <div>
                        <p className="text-accent font-mono-custom small fw-bold mb-1">
                            TOPOLOGY VIEWER
                        </p>
                        <h2 className="text-uppercase m-0">Network Map</h2>
                    </div>
                </div>

                {/* map + sidebar */}
                <div className="map-layout">
                    
                    {/* MAP */}
                    <div className="map-display">
                        <svg viewBox="0 0 800 500" className="map-svg-container" xmlns="http://www.w3.org/2000/svg">
                            
                            {/* 1. DISEGNO DELLE LINEE (Tracciati) */}
                            {networkLines.map(line => (
                                <polyline 
                                    key={line.id} 
                                    points={line.path} 
                                    className={`svg-line ${line.colorClass}`} 
                                />
                            ))}

                            {/* 2. DISEGNO DELLE STAZIONI ED ETICHETTE */}
                            {networkStations.map(station => (
                                <g key={station.id}>
                                    <circle 
                                        cx={station.cx} 
                                        cy={station.cy} 
                                        r={station.type === 'interchange' ? 8 : 5} 
                                        className={station.type === 'interchange' ? 'svg-interchange' : `svg-station ${station.colorClass}`}
                                    />
                                    <text 
                                        x={station.cx + station.labelOffsetX} 
                                        y={station.cy + station.labelOffsetY} 
                                        className="svg-label"
                                    >
                                        {station.name}
                                    </text>
                                </g>
                            ))}
                        </svg>
                    </div>

                    {/* sidebar */}
                    <div className="map-sidebar">
                        <div>
                            <h3 className="sidebar-section-title">Setup</h3>
                            <p className="text-muted-custom small mb-4">
                                Review the metro map before initializing your game session.<br />
                                Upon activation, you will have exactly <strong className="text-accent">90 seconds</strong> to find the correct route. 
                                You will start the game with 20 coins. <br />
                                <strong className="text-accent"> Are you ready?</strong>
                            </p>
                            <Link to="/game/plan" className="btn-metro w-100">Play</Link>
                        </div>

                        {/* legend */}
                        <div className="mt-auto">
                            <h3 className="sidebar-section-title">Lines</h3>
                            <ul className="legend-list">
                                <li className="legend-item">
                                    <div className="legend-dot line-purple"></div>
                                    <span className="font-mono-custom small text-uppercase">Purple Line</span>
                                </li>
                                <li className="legend-item">
                                    <div className="legend-dot line-blue"></div>
                                    <span className="font-mono-custom small text-uppercase">Blue Line</span>
                                </li>
                                <li className="legend-item">
                                    <div className="legend-dot line-green"></div>
                                    <span className="font-mono-custom small text-uppercase">Green Line</span>
                                </li>
                                <li className="legend-item">
                                    <div className="legend-dot line-yellow"></div>
                                    <span className="font-mono-custom small text-uppercase">Yellow Line</span>
                                </li>
                                <li className="legend-item">
                                    <div className="legend-dot line-orange"></div>
                                    <span className="font-mono-custom small text-uppercase">Orange Line</span>
                                </li>
                                <li className="legend-item">
                                    <div className="legend-dot line-red"></div>
                                    <span className="font-mono-custom small text-uppercase">Red Line</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Map;