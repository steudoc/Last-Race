import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { Alert, Col, Container, ProgressBar, Row } from "react-bootstrap";

export function GameExecute() {
    const { state } = useLocation();

    if (!state?.gameResult) return <Navigate to='/notFound' />
    const { gameResult } = state;
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (currentIndex < gameResult.connections.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                navigate('/game/result', { state: { gameResult } });
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, [currentIndex, gameResult]);

    if (!gameResult.valid) {
        return (
            <Alert className="metro-alert metro-alert-danger text-center py-5 w-50 shadow-lg">
                <div className="mb-4">
                    <i className="bi bi-x-octagon-fill display-1 text-danger"></i>
                </div>
                <span className="text-muted-custom font-mono-custom small fw-bold mb-1 d-block">
                    INVALID ROUTE
                </span>
                <h2 className="mb-3 text-uppercase">Route Rejected</h2>
                <p className="text-white mb-0">
                    The submitted sequence was invalid or incomplete. <br/>
                </p>
            </Alert>
        )
    }

    const leg = gameResult.connections[currentIndex];
    const progressPercentage = ((currentIndex + 1) / gameResult.connections.length) * 100;

    return(
        <div className="metro-card shadow-lg w-50">
            <Row className="mb-4 align-items-center border-bottom border-urban pb-3">
                <Col xs={8} className="d-flex align-items-center gap-3">
                        <div className="text-accent display-6 lh-1"><i className="bi bi-lightning"></i></div>
                        <div>
                            <div className="text-mono font-mono-custom fw-bold small lh-1">PHASE 03</div>
                            <h3 className="text-uppercase m-0 fs-5">Execution</h3>
                        </div>
                    </Col>
                    <Col xs={4} className="text-end">
                        <span className="text-muted-custom font-mono-custom small fw-bold">
                            LEG: {currentIndex + 1} / {gameResult.connections.length}
                        </span>
                    </Col>
            </Row>

            <div className="execution-progress-track my-5">
                <ProgressBar now={progressPercentage} className="h-100 rounded-pill " />
            </div>

            <div className="execution-leg-display page-enter" key={currentIndex}>
                <div className="execution-route d-flex align-items-center g-1 mb-3">
                    <span className="execution-station">{leg.fromName}</span>
                    <i className="bi bi-arrows execution-arrow"></i>
                    <span className="execution-station">{leg.toName}</span>
                </div>

                <span className="text-muted-custom font-mono-custom small fw-bold d-block mb-1">EVENT</span>
                <div className="execution-event mb-4">
                    <i className="bi bi-lightning-charge-fill me-2 text-accent"></i>
                    <span>{leg.event}</span>
                </div>

                <Row className="align-items-end border-top border-urban pt-4">
                    <Col xs={6}>
                        <span className="text-muted-custom font-mono-custom small fw-bold d-block mb-1">EVENT EFFECT</span>
                        <div className={`execution-effect ${leg.effect > 0 ? 'effect-positive' : leg.effect < 0 ? 'effect-negative' : 'effect-neutral'}`}>
                            {leg.effect > 0 ? `+${leg.effect}` : leg.effect} <i className="bi bi-coin"></i>
                        </div>
                    </Col>
                    <Col xs={6} className="text-end">
                        <span className="text-muted-custom font-mono-custom small fw-bold d-block mb-1">TOTAL BALANCE</span>
                        <div className="execution-total">
                            {leg.coinsAfter} <i className="bi bi-coin"></i>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export function GameResult() {
    const { state } = useLocation();

    if (!state?.gameResult) return <Navigate to='/notFound' />
    const { gameResult } = state;
    const isValid = gameResult.valid;

    return(
        <div className="metro-card home-container" >
            <Row className="mb-4 align-items-center border-bottom border-urban pb-3 m-0">
                <Col className="d-flex align-items-center gap-3 p-0">
                    <div className="text-accent display-6 lh-1"><i className="bi bi-trophy"></i></div>
                    <div>
                        <div className="text-mono font-mono-custom fw-bold small lh-1">PHASE 04</div>
                        <h3 className="text-uppercase m-0 fs-5">Result</h3>
                    </div>
                </Col>
            </Row>

            <div className="text-center">
                <div className="mb-5">
                    {isValid ? (
                        <div className="status-valid page-enter">
                            <i className="bi bi-check-circle-fill display-2 d-block mb-3"></i>
                            <h2 className="font-mono-custom text-uppercase mb-1">Correct route</h2>
                            <p className="text-muted-custom small m-0">All connections successfully verified.</p>
                        </div>
                    ) : (
                        <div className="status-invalid page-enter">
                            <i className="bi bi-x-octagon-fill display-2 d-block mb-3"></i>
                            <h2 className="font-mono-custom text-uppercase mb-1">Invalid route</h2>
                            <p className="text-muted-custom small m-0">The submitted sequence was invalid or incomplete.</p>
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <p className="font-mono-custom text-uppercase small text-muted-custom mb-2">FINAL RESULT</p>
                    <div className="display-1 font-mono-custom fw-bold lh-1 score-valid">
                        {gameResult.finalScore} <i className="bi bi-coin"></i>
                    </div>
                </div>

                <Row className="g-3 m-0">
                    <Col xs={12} md={4} className="p-0 pe-sm-2">
                        <Link to="/game/setup" className="btn-metro-outline w-100 d-inline-block">
                            <i className="bi bi-play-fill me-2"></i>START NEW GAME
                        </Link>
                    </Col>
                    <Col xs={12} md={4} className="p-0 px-sm-2">
                        <Link to="/ranking" className="btn-metro w-100 d-inline-block">
                            <i className="bi bi-list-ol me-2"></i>VIEW STANDINGS
                        </Link>
                    </Col>
                    <Col xs={12} md={4} className="p-0 ps-sm-2">
                        <Link to="/" className="btn-metro-outline w-100 d-inline-block">
                            <i className="bi bi-house-door me-2"></i>RETURN HOME
                        </Link>
                    </Col>
                </Row>
            </div>
        </div>
    );
}