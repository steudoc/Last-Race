import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Alert, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router";
import API from "../API/API";

dayjs.extend(duration);

export function GamePage(props) {
    // GAME STATES 
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
    const [gameResult, setGameResult] = useState(null);

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
            const result = await API.executeGame(selectedSegments, startStation.id, endStation.id);
            setGameResult(result);
        } catch(err) {
            console.warn(err);
        }
        setLoading(false);
    }

    // TIME
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
        if (!selectedSegments.includes(segment)) {
            setSelectedSegments([...selectedSegments, segment]);
        }
    };

    // STATE RENDERING ===
    if (loading) {
        return (
            <div className="page-center page-enter">
                <Alert className="metro-alert text-center py-5" style={{width: '100%', maxWidth: '600px'}}>
                    <Spinner animation="border" className="me-3" size="sm"/>
                    LOADING...
                </Alert>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page-center page-enter">
                <Alert className="metro-alert metro-alert-danger text-center py-5" style={{width: '100%', maxWidth: '600px'}}>
                    {error}
                    <div className="mt-4">
                        <Link to="/" className="btn-metro-outline">ABORT MISSION</Link>
                    </div>
                </Alert>
            </div>
        );
    }


    // GAME RENDERING
    return (
        <div className="page-center page-enter">
            <div className="container-fluid">
                
                <div className="mission-header">
                    <div>
                        <p className="text-muted-custom font-mono-custom small fw-bold mb-1">
                            ROUTE PLANNING
                        </p>
                        <div className="mission-target">
                            <span className="target-station">{startStation?.name}</span>
                            <i className="bi bi-arrow-right text-secondary mx-2"></i>
                            <span className="target-station">{endStation?.name}</span>
                        </div>
                    </div>
                    <div className="timer-box">
                        <p className="text-muted-custom font-mono-custom small fw-bold mb-1 m-0">REMAINING TIME</p>
                        <div className="timer-value">
                            {formatTime(timeLeft)}
                        </div>
                    </div>
                </div>

                <div className="game-dashboard">
                    
                    {/* MAP */}
                    <div className="blind-map-container flex-column text-center">
                        <i className="bi bi-motherboard display-1 text-secondary opacity-50 mb-4 d-block"></i>
                        <p className="text-accent font-mono-custom fw-bold fs-5 mb-1">&gt; MAP_MODULE_OFFLINE</p>
                        <p className="text-muted-custom font-mono-custom small">Awaiting structural topology data...</p>
                    </div>

                    {/* ROUTE BUILD & RESULT */}
                    {gameResult ? (
                        // REPORT
                        <div className="segments-panel justify-content-center text-center">
                            <h3 className="font-mono-custom text-uppercase text-accent mb-2">RESULT</h3>
                            <p className="text-muted-custom font-mono-custom mb-5">Data validated by server.</p>
                            
                            <div className="mb-5">
                                <p className="font-mono-custom text-uppercase small text-muted-custom mb-1">COINS COLLECTED</p>
                                <div className="display-3 font-mono-custom fw-bold" style={{ color: '#eab308' }}>
                                    {gameResult.finalScore} ¢
                                </div>
                            </div>
                            
                            <Link to="/ranking" className="btn-metro w-100 mb-3">VIEW STANDINGS</Link>
                            <Link to="/" className="btn-metro-outline w-100">RETURN TO HOME</Link>
                        </div>
                    ) : (
                        // GAME BOARD
                        <div className="segments-panel d-flex">
                            <div className="col-5">
                                <p className="font-mono-custom small text-accent mb-2">SELECTED ROUTE</p>
                                <div className="current-route-box">
                                    {selectedSegments.length === 0 ? (
                                        <span className="text-muted-custom font-mono-custom small">AWAITING INPUT...</span>
                                    ) : (
                                        selectedSegments.map(segment => {
                                            const segmentId = `${segment.id1}-${segment.id2}`; 
                                            return (
                                                <div key={segmentId} className="route-chip">
                                                    <span>{segment.name1} - {segment.name2}</span>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>

                            <div className="d-flex flex-column h-100 overflow-hidden col-6">
                                <p className="font-mono-custom small text-accent border-bottom border-urban pb-2 mb-3">
                                    AVAILABLE SEGMENTS ({connections.length})
                                </p>
                                
                                <div className="segment-list">
                                    {connections.map(segment => {
                                        const segmentId = `${segment.id1}-${segment.id2}`;
                                        const isSelected = selectedSegments.includes(segment);

                                        return(<Segment key={segmentId} segmentId={segmentId} isSelected={isSelected} isSubmitted={isSubmitted} segment={segment} handleAddSegment={handleAddSegment}/>);
                                    })}
                                </div>

                                <SubmitButton isSubmitted={isSubmitted} handleSubmitRoute={handleSubmitRoute} />
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

function Segment(props) {
    return(
        <Button className="segment-btn" onClick={() => props.handleAddSegment(props.segment)} disabled={props.isSelected || props.isSubmitted}>
            <span>{props.segment.name1} - {props.segment.name2}</span>
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
            {props.isSubmitted ? "PROCESSING..." : "SUBMIT ROUTE"}
        </Button>
    );
}

export function GameSetup() {
    return(
        <div className="page-center page-enter">
            <div className="metro-card home-container text-center p-4 p-md-5 w-50" > 
                {/* title */}
                <i className="bi bi-train-front display-1 text-accent mb-3 d-block opacity-75"></i>
                <h2 className="font-mono-custom text-uppercase mb-3">READY?</h2>
                
                {/* description */}
                <div className="text-muted-custom mb-4 text-start">
                    <p>Upon activation, you will have exactly <strong className="text-accent">90 seconds</strong> to find the correct route.</p>
                    <p>Are you ready to play, or do you need to review the <strong className="text-accent">network map</strong> first?</p>
                </div>

                <div className="border-bottom border-urban mb-4"></div>

                {/* call to action */}
                <div className="d-flex flex-column gap-3">
                    <Link to="/game/plan" className="btn-metro w-100 py-3 fw-bold">
                        <i className="bi bi-play-fill me-2"></i> START NEW GAME
                    </Link>
                    <Link to="/map" className="btn-metro-outline w-100">
                        <i className="bi bi-map me-2"></i> REVIEW MAP
                    </Link>
                </div>
            </div>
        </div>
    );
}