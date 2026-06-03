import { Link } from "react-router";

function NotFound() {
    return (
        <div className="page-center">
            {/* Usiamo la nuova error-card per mantenere le proporzioni */}
            <div className="metro-card text-center error-card">
                
                {/* Icona gigante usando display-1 di Bootstrap */}
                <i className="bi bi-exclamation-triangle text-accent display-1 d-block mb-3"></i> 
                
                {/* Codice di errore in stile terminale */}
                <p className="text-accent font-mono-custom fw-bold fs-5 mb-1">
                    ERROR 404
                </p>
                
                <h1 className="text-uppercase fw-bold mb-3">Off the Rails</h1>
                
                <p className="text-muted-custom font-mono-custom mb-5">
                    Nothing to see here... This is not the route you are looking for!
                </p>
                
                <Link to="/" className="btn-metro w-100">
                    Back to Home
                </Link>
                
            </div>
        </div>
    );
}

export default NotFound;