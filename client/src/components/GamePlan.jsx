import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Alert, Spinner, Button, Container, Row, Col, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import API from "../API/API";
import mapImage from "../assets/map_no_connections.png";

dayjs.extend(duration);

function GamePlan() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    // data states
    const [stations, setStations] = useState([]);
    const [connections, setConnections] = useState([]);
    const [startStation, setStartStation] = useState(null);
    const [endStation, setEndStation] = useState(null);
    // game states
    const [timeLeft, setTimeLeft] = useState(90);
    const [selectedSegments, setSelectedSegments] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const navigate = useNavigate();

    // retrieve data
    useEffect(() =>{
        const initGame = async () => {
            try {
                const [fetchedStations, fetchedConnections, gameParams] = await Promise.all([
                    API.getStations(),
                    API.getConnections(),
                    API.startGame()
                ]);
                setStations(fetchedStations);
                setConnections(fetchedConnections);
                setStartStation(gameParams.startStation);
                setEndStation(gameParams.endStation);
                setLoading(false);
            } catch(err) {
                console.warn(err);
                setError("ERROR: FAILED TO ESTABLISH CONNECTION WITH SERVER.");
                setLoading(false);
            }
        };
        initGame();
    }, []);

    //submit
    const handleSubmitRoute = async () => {
        setIsSubmitted(true);
        setLoading(true);
        try {
            const gameResult = await API.executeGame(selectedSegments, startStation.id, endStation.id);
            navigate('/game/execute', { state: { gameResult } });
        } catch(err) {
            console.warn(err);
            setError("ERROR: DATA REJECTED BY THE SERVER.");
        }
        setLoading(false);
    }

    // time
    useEffect(() => {
        if (loading || isSubmitted) return;

        if (timeLeft <= 0) {
            handleSubmitRoute();
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft, isSubmitted, loading]);

    const formatTime = (seconds) => {
        return dayjs.duration(seconds, "seconds").format("mm:ss");
    };

    // add segment
    const handleAddSegment = (segment) => {
        const isSelected = selectedSegments.some(s => s.id1 === segment.id1 && s.id2 === segment.id2);
        if (isSelected) {
            setSelectedSegments(prev => prev.filter(s => !(s.id1 === segment.id1 && s.id2 === segment.id2)));
        } else {
            setSelectedSegments(prev => [...prev, segment]);
        }
    };

    // loading rendering 
    if (loading) {
        return (
            <Container className="page-center page-enter d-flex justify-content-center align-items-center">
                <Alert className="metro-alert metro-alert-warning text-center py-5" style={{width: '100%', maxWidth: '600px'}}>
                    <Spinner animation="border" className="me-3" size="sm"/>
                    LOADING...
                </Alert>
            </Container>
        );
    }

    // error rendering
    if (error) {
        return (
            <Container className="page-center page-enter d-flex justify-content-center align-items-center">
                <Alert className="metro-alert metro-alert-danger text-center py-5" style={{width: '100%', maxWidth: '600px'}}>
                    <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
                    <div className="mt-4">
                        <Link to="/" className="btn-metro-outline">RETURN TO HOME</Link>
                    </div>
                </Alert>
            </Container>
        );
    }

    // game 
    return (
        <Container fluid="xl" className="page-center page-enter py-3 d-flex flex-column">
            <div className="metro-card m-3 d-flex flex-column">
                <Row className="align-items-center m-0 w-100 mb-4">
                    <Col xs={12} lg={8} className="d-flex flex-column flex-md-row align-items-md-center gap-4">
                        <div className="d-flex align-items-center gap-3 pe-md-4 border-end-md border-urban">
                            <div className="text-accent display-6 lh-1"><i className="bi bi-clock"></i></div>
                            <div>
                                <div className="text-mono font-mono-custom fw-bold small lh-1">PHASE 02</div>
                                <h3 className="text-uppercase m-0 fs-5">Planning</h3>
                            </div>
                        </div>

                        <div>
                            <p className="text-muted-custom font-mono-custom small fw-bold mb-1">ROUTE ASSIGNED</p>
                            <div className="mission-target">
                                <span className="target-station">{startStation?.name}</span>
                                <i className="bi bi-arrow-right text-secondary mx-2"></i>
                                <span className="target-station">{endStation?.name}</span>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} lg={4}>
                        <div className="timer-box w-100 text-lg-end">
                            <p className="text-muted-custom font-mono-custom small fw-bold mb-1 m-0">REMAINING TIME</p>
                            <div className={`timer-value ${timeLeft <= 15 ? 'text-danger' : ''}`} style={timeLeft > 15 ? {color: "var(--accent)", textShadow: "0 0 12px rgba(255, 87, 34, 0.5)"} : {}}>
                                {formatTime(timeLeft)}
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row className="g-4 flex-grow-1 align-items-stretch">
                    {/* map */}
                    <Col xs={12} lg={5} xl={4} className="d-flex">
                        <div className="map-display p-2 w-100 h-100 d-flex justify-content-center align-items-center">
                            <Image src={mapImage} fluid alt="Metro Network Map" className="map-image-content" />
                        </div>
                    </Col>

                    {/* game board */}
                    <Col xs={12} lg={7} xl={8} className="d-flex">
                        <div className="segments-panel w-100 h-100 d-flex flex-column">
                            <Row className="h-100 g-3">
                                <Col xs={12} md={5} className="d-flex flex-column h-100">
                                    <p className="font-mono-custom small text-accent mb-2">SELECTED ROUTE</p>
                                    <div className="current-route-box flex-grow-1 align-content-start overflow-auto">
                                        {selectedSegments.length === 0 ? (
                                            <span className="text-muted-custom font-mono-custom small w-100 text-center mt-3">AWAITING STATIONS...</span>
                                        ) : (
                                            selectedSegments.map(segment => {
                                                const segmentId = `${segment.id1}-${segment.id2}`; 
                                                return (
                                                    <div key={segmentId} className="route-chip w-100 mb-2">
                                                        <span className="text-truncate">{segment.name1} - {segment.name2}</span>
                                                        <button className="route-chip-remove" onClick={() => handleAddSegment(segment)}>
                                                            <i className="bi bi-x fs-5" />
                                                        </button>
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                </Col>

                                <Col xs={12} md={7} className="d-flex flex-column h-100">
                                    <p className="font-mono-custom small text-accent border-bottom border-urban pb-2 mb-3">
                                        AVAILABLE SEGMENTS ({connections.length})
                                    </p>
                                    
                                    <div className="segment-list flex-grow-1 mb-3">
                                        {connections.map(segment => {
                                            const segmentId = `${segment.id1}-${segment.id2}`;
                                            const isSelected = selectedSegments.some(s => s.id1 === segment.id1 && s.id2 === segment.id2);

                                            return(
                                                <Segment key={segmentId} segmentId={segmentId} isSelected={isSelected} isSubmitted={isSubmitted} segment={segment} handleAddSegment={handleAddSegment}/>
                                            );
                                        })}
                                    </div>

                                    <SubmitButton isSubmitted={isSubmitted} handleSubmitRoute={handleSubmitRoute} />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

function Segment(props) {
    return(
        <Button className="segment-btn" onClick={() => props.handleAddSegment(props.segment)} disabled={props.isSelected || props.isSubmitted}>
            <span className="text-truncate pe-2">{props.segment.name1} - {props.segment.name2}</span>
            {props.isSelected ? (
                <i className="bi bi-check2-square text-accent"></i>
            ) : (
                <i className="bi bi-plus-square"></i>
            )}
        </Button>
    );
}

function SubmitButton(props) {
    return(
        <Button className="btn-metro w-100 mt-2" onClick={props.handleSubmitRoute} disabled={props.isSubmitted}>
            {props.isSubmitted ? (
                <><Spinner animation="border" size="sm" className="me-2"/> PROCESSING...</>
            ) : (
                <>SUBMIT ROUTE</>
            )}
        </Button>
    );
}

export default GamePlan;