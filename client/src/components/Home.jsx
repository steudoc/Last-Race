import { Link } from "react-router";

function Home(props) {
    return (
        <div className="page-center page-enter">
            <div className="metro-card home-container">
                <div className="home-hero d-flex justify-content-between align-items-center gap-4 mb-5 pb-4">
                    <div>
                        <p className="text-accent text-uppercase fw-bold small mb-1">Metro Network Game</p>
                        <h1 className="home-title">Last Race</h1>
                        <p className="text-muted-custom mb-4">
                            Plan your route. Beat the clock. Collect your coins.
                        </p>
                        {props.loggedIn ?
                            <>
                                <Link to="/game/setup" className="btn-metro me-2"><i className="bi bi-play-fill me-2"></i>Play</Link>
                                <Link to="/ranking" className="btn-metro-outline"><i className="bi bi-trophy me-2"></i>Ranking</Link>
                            </> :
                            <Link to="/login" className="btn-metro">Login to Start</Link>
                        }
                    </div>
                    
                    {/* decorative metro lines */}
                    <div className="hero-lines d-flex flex-column d-none d-sm-flex">
                        <div className="hero-line line-purple" style={{ width: '40%' }}></div>
                        <div className="hero-line line-blue" style={{ width: '80%' }}></div>
                        <div className="hero-line line-green" style={{ width: '30%' }}></div>
                        <div className="hero-line line-yellow" style={{ width: '70%' }}></div>
                        <div className="hero-line line-orange" style={{ width: '50%' }}></div>
                        <div className="hero-line line-red" style={{ width: '65%' }}></div>
                    </div>
                </div>

                {/* instructions */}
                <div className="mb-5">
                    <p className="text-accent text-uppercase fw-bold small mb-1">How to play</p>
                    <h2 className="mb-4">Four Gameplay Phases</h2>
                    <div className="row g-3">
                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="phase-card">
                                <div className="phase-number">01</div>
                                <div className="phase-icon"><i className="bi bi-map" /></div>
                                <h3 className="phase-title">Setup</h3>
                                <p className="phase-desc">Study the full metro network map: lines, stations and connections.</p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="phase-card">
                                <div className="phase-number">02</div>
                                <div className="phase-icon"><i className="bi bi-clock" /></div>
                                <h3 className="phase-title">Planning</h3>
                                <p className="phase-desc">You have 90 seconds to construct your route from the assigned start to end station.</p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="phase-card">
                                <div className="phase-number">03</div>
                                <div className="phase-icon"><i className="bi bi-lightning" /></div>
                                <h3 className="phase-title">Execution</h3>
                                <p className="phase-desc">Random unpredictable events hit each leg of your journey. Gain or lose coins.</p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="phase-card">
                                <div className="phase-number">04</div>
                                <div className="phase-icon"><i className="bi bi-trophy" /></div>
                                <h3 className="phase-title">Result</h3>
                                <p className="phase-desc">Your final coin balance becomes your score. Climb the global ranking.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* network */}
                <div className="mb-5">
                    <p className="text-accent text-uppercase fw-bold small mb-1">The Infrastructure</p>
                    <h2 className="mb-4">6 Lines, 26 Stations, 7 Interchanges</h2>
                    <div className="d-flex flex-wrap gap-2">
                        <div className="line-chip line-purple">Purple Line</div>
                        <div className="line-chip line-blue">Blue Line</div>
                        <div className="line-chip line-green">Green Line</div>
                        <div className="line-chip line-yellow">Yellow Line</div>
                        <div className="line-chip line-orange">Orange Line</div>
                        <div className="line-chip line-red">Red Line</div>
                    </div>
                </div>
                <div className="pt-2 border-top border-light-subtle text-center text-sm-start">
                    {props.loggedIn ? 
                        <Link to="/game/setup" className="btn-metro"><i className="bi bi-play-fill me-2"></i>Start Game</Link> :
                        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
                            <p className="text-muted-custom small m-0">
                                Authentication required. Login to unlock the transit network map.
                            </p>
                            <Link to="/login" className="btn-metro-outline px-4">Sign In</Link>
                        </div>
                    }
                </div>

            </div>
        </div>
    );
}

export default Home;