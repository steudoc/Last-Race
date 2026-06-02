import { Link } from "react-router";

function NotFound() {
    return (
        <div className="game-wrapper">
            <div className="metro-card text-center">
                <i className="bi bi-signpost-split metro-icon-xl d-block mb-3"></i>   
                <h1 className="metro-title mb-3">404 - Off the Rails</h1>
                
                <p className="metro-text-muted lead mb-5">
                    Nothing to see here... This is not the route you are looking for!
                </p>
                
                <Link to="/" className="btn metro-btn-primary px-4 py-2">
                    <i className="bi bi-house-door me-2"></i> Back to Home
                </Link>
                
            </div>
        </div>
    );
}

export default NotFound;