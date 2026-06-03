import { Link } from "react-router";

function Home(props) {
    return (

        <div className="col-8 p-3 p-1.5 p-5 m-0 page-enter">

            {/* HERO */}
            <div className="home-hero d-flex justify-content-between align-items-center gap-3 mb-5 pb-4">
                <div>
                    <p className="eyebrow">Metro Network Game</p>
                    <h1 className="home-title mb-3">Last Race</h1>
                    <p className="text-secondary-custom text-sm mb-4">
                        Plan your route. Beat the clock. Collect your coins.
                    </p>
                    {props.loggedIn ? 
                        <Link to="/play" className="btn-metro"><i class="bi bi-play-fill me-2"></i>Play</Link> :
                        <Link to="/login" className="btn-metro">Login</Link>
                    }
                </div>
                <div className="hero-lines d-flex flex-column">
                    <div className="hero-line" style={{ '--line-color': '#7c3aed', '--line-width': '40%' }}></div>
                    <div className="hero-line" style={{ '--line-color': '#2563eb', '--line-width': '80%' }}></div>
                    <div className="hero-line" style={{ '--line-color': '#16a34a', '--line-width': '30%' }}></div>
                    <div className="hero-line" style={{ '--line-color': '#dc2626', '--line-width': '60%' }}></div>
                    <div className="hero-line" style={{ '--line-color': '#ea580c', '--line-width': '40%' }}></div>
                    <div className="hero-line" style={{ '--line-color': '#eab308', '--line-width': '70%' }}></div>                    
                </div>
            </div>

            {/* HOW TO PLAY */}
            <div className="mb-5">
                <p className="eyebrow">How to play</p>
                <h2 className="mb-4">Four Phases</h2>
                <div className="row g-3">
                    <div className="col-3">
                        <div className="phase-card">
                            <div className="phase-number">01</div>
                            <div className="phase-icon"><i className="bi bi-map" /></div>
                            <h3 className="phase-title">Setup</h3>
                            <p className="phase-desc">Study the full metro network map: all lines, stations and connections.</p>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="phase-card">
                            <div className="phase-number">02</div>
                            <div className="phase-icon"><i className="bi bi-clock" /></div>
                            <h3 className="phase-title">Planning</h3>
                            <p className="phase-desc">You have 90 seconds to build your route from the assigned start to end station.</p>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="phase-card">
                            <div className="phase-number">03</div>
                            <div className="phase-icon"><i className="bi bi-lightning" /></div>
                            <h3 className="phase-title">Execution</h3>
                            <p className="phase-desc">Random events hit each leg of your journey. Gain or lose coins along the way.</p>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="phase-card">
                            <div className="phase-number">04</div>
                            <div className="phase-icon"><i className="bi bi-trophy" /></div>
                            <h3 className="phase-title">Result</h3>
                            <p className="phase-desc">Your final coin count is your score. Climb the leaderboard and beat your best.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* NETWORK PREVIEW */}
            <div className="mb-5">
                <p className="eyebrow">The Network</p>
                <h2 className="mb-4">6 Lines, 26 Stations, 7 Interchanges</h2>
                <div className="d-flex gap-2">
                    <div className="line-chip line-blue"><span>Blue Line</span></div>
                    <div className="line-chip line-red"><span>Red Line</span></div>
                    <div className="line-chip line-yellow"><span>Yellow Line</span></div>
                    <div className="line-chip line-purple"><span>Purple Line</span></div>
                    <div className="line-chip line-green"><span>Green Line</span></div>
                    <div className="line-chip line-orange"><span>Orange Line</span></div>
                </div>
            </div>

            <div className="mb-5">
                
                {props.loggedIn ? 
                    <Link to="/play" className="btn-metro"><i class="bi bi-play-fill me-2"></i>Play</Link> :
                    <>
                        <p className="text-secondary-custom text-sm my-3">
                            Login to see the full map and start playing.
                        </p>
                        <Link to="/login" className="btn-metro">Login</Link>
                    </>
                }
            </div>

        </div>
    );
}

export default Home;