import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { ProgressBar } from "react-bootstrap";

export function GameExecute() {
    const { state } = useLocation();

    if (!state?.gameResult) return <Navigate to='/' />
    const { gameResult } = state;
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!gameResult.valid) {  // check
            const timer = setTimeout(() => {
                navigate('/game/result', { state: { gameResult } });
            }, 5000);   // 5 secs
            return () => clearTimeout(timer);
        }

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
            <div className="page-center page-enter">
                <div className="metro-card result-card text-center">
                    <span className="eyebrow">Invalid route</span>
                    <h2 className="mb-3">Route rejected</h2>
                    <p className="text-muted-custom text-sm">
                        Your route was  invalid or incomplete.
                    </p>
                </div>
            </div>
        )
    }

    const leg = gameResult.connections[currentIndex];

    return(
        <div className="page-center page-enter">
            <div className="metro-card execution-card">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <span className="eyebrow">Phase 3 — Execution</span>
                    <span className="text-muted-custom text-sm">
                        {currentIndex + 1} / {gameResult.connections.length}
                    </span>
                </div>

                <div className="execution-progress-track mb-4">
                    <ProgressBar now={ ((currentIndex + 1) / gameResult.connections.length) * 100 } />
                </div>

                <div className="execution-leg-display page-enter" key={currentIndex}>
                    <div className="execution-route mb-3">
                        <span className="execution-station">{leg.fromName}</span>
                        <i className="bi bi-arrow-right execution-arrow"></i>
                        <span className="execution-station">{leg.toName}</span>
                    </div>

                    <div className="execution-event mb-4">
                        <i className="bi bi-lightning-charge-fill me-2 text-accent"></i>
                        <span>{leg.event}</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-end">
                        <div>
                            <span className="eyebrow">Event Effect</span>
                            <div className={`execution-effect ${leg.effect > 0 ? 'effect-positive' : leg.effect < 0 ? 'effect-negative' : 'effect-neutral'}`}>
                                {leg.effect > 0 ? `+${leg.effect}` : leg.effect} 🪙
                            </div>
                        </div>
                        <div className="text-end">
                            <span className="eyebrow">Total Coins</span>
                            <div className="execution-total">
                                🪙 {leg.coinsAfter}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function GameResult() {
    const { state } = useLocation();

    if (!state?.gameResult) return <Navigate to='/' />
    const { gameResult } = state;

    return(
        <div className="page-center page-enter">
            <div className="metro-card home-container" >
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
            </div>
        </div>
    );
}