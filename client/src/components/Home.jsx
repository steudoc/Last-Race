import { Link } from "react-router";

function Home(props) {
    return (
        <div className="game-wrapper">
            <div className="metro-card metro-card-lg">
                <div className="text-center mb-5">
                    <i className="bi bi-train-front metro-icon-xl d-block"></i>
                    <h1 className="metro-title display-5 fw-bold mb-3">Welcome to Last Race</h1>
                </div>

                {/* rules */}
                <div className="row g-4 mb-5">
                    <div className="col-md-4 text-center">
                        <i className="bi bi-geo-alt metro-icon-large d-block"></i>
                        <h5 className="fw-bold">1. Find the route</h5>
                        <p className="metro-text-muted">
                            Plan the journey between two random stations that are at least 3 stops apart.
                        </p>
                    </div>
                    <div className="col-md-4 text-center">
                        <i className="bi bi-sign-turn-right metro-icon-large d-block"></i>
                        <h5 className="fw-bold">2. Manage transfers</h5>
                        <p className="metro-text-muted">
                            Switch between lines carefully: you can only change lines at interchange stations!
                        </p>
                    </div>
                    <div className="col-md-4 text-center">
                        <i className="bi bi-lightning-charge metro-icon-large d-block"></i>
                        <h5 className="fw-bold">3. Unexpected events</h5>
                        <p className="metro-text-muted">
                            You start with 20 coins. Each route hides a random event that will affect your budget.
                        </p>
                    </div>
                </div>

                {/* buttons */}
                <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                    {props.loggedIn ? (
                        <>
                            <Link to="/game" className="btn metro-btn-primary px-5 py-3 fs-5">
                                <i className="bi bi-play-fill me-2"></i> Play Now
                            </Link>
                            <Link to="/map" className="btn metro-btn-outline px-5 py-3 fs-5">
                                <i className="bi bi-map me-2"></i> View Map
                            </Link>
                        </>
                    ) : (
                        <Link to="/login" className="btn metro-btn-primary px-5 py-3 fs-5">
                            <i className="bi bi-person-badge me-2"></i> Login to Play
                        </Link>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Home;