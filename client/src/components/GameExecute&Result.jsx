import { useState } from "react";
import { Link, useNavigate } from "react-router";

export function GameExecute(props) {
    const [curentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const isLast = currentIndex === props.gameResult.connections.lentght - 1;


    // N.B: ricordarsi di rimettere gameResult a null!!!
}

export function GameResult(props) {
    return(
        <div className="page-center page-enter">
            <div className="metro-card home-container" >
                <div className="segments-panel justify-content-center text-center">
                    <h3 className="font-mono-custom text-uppercase text-accent mb-2">RESULT</h3>
                    <p className="text-muted-custom font-mono-custom mb-5">Data validated by server.</p>
                    
                    <div className="mb-5">
                        <p className="font-mono-custom text-uppercase small text-muted-custom mb-1">COINS COLLECTED</p>
                        <div className="display-3 font-mono-custom fw-bold" style={{ color: '#eab308' }}>
                            {props.gameResult.finalScore} ¢
                        </div>
                    </div>
                    
                    <Link to="/ranking" className="btn-metro w-100 mb-3">VIEW STANDINGS</Link>
                    <Link to="/" className="btn-metro-outline w-100">RETURN TO HOME</Link>
                </div>
            </div>
        </div>
    );
}