import { Link } from "react-router"; 
import { Container, Row, Col, Image } from "react-bootstrap";
import mapImage from "../assets/map.png";

function Map() {
    return (
        <Container fluid="xl" className="page-center page-enter py-4">
            <div className="metro-card map-container-card m-3 d-flex flex-column w-100">
                {/* header map */}
                <Row className="mb-3">
                    <Col>
                        <p className="text-accent font-mono-custom small fw-bold mb-1">
                            TOPOLOGY VIEWER
                        </p>
                        <h2 className="text-uppercase m-0">Network Map</h2>
                    </Col>
                </Row>

                {/* map layout */}
                <Row className="g-4">
                    {/* map */}
                    <Col xs={12} lg={8} xl={7} >
                        <div className="map-display p-2">
                            <Image src={mapImage} fluid alt="Metro Network Map" className="map-image-content" />
                        </div>
                    </Col>

                    {/* sidebar */}
                    <Col xs={12} lg={4} xl={5} className="d-flex flex-column gap-3">
                        <div className="phase-card w-100 flex-grow-0 p-4">
                            <div className="phase-number">01</div>
                            <div className="phase-icon"><i className="bi bi-map" /></div>
                            <h3 className="sidebar-section-title text-accent border-0 p-0 m-0 mb-3">Setup Phase</h3>
                            
                            <p className="text-muted-custom small mb-4">
                                Review the metro map before initializing your game session.<br />
                                Upon activation, you will have exactly <strong className="text-accent">90 seconds</strong> to find the correct route. 
                                You will start the game with 20 coins. <br /><br />
                                <strong className="text-white">Are you ready to proceed?</strong>
                            </p>
                            <Link to="/game/plan" className="btn-metro w-100">
                                <i className="bi bi-play-fill me-2"></i>START GAME
                            </Link>
                        </div>

                        {/* legend */}
                        <div className="phase-card flex-grow-1 p-4">
                            <h3 className="sidebar-section-title">Active Lines</h3>
                            <ul className="legend-list d-flex flex-column">
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
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default Map;