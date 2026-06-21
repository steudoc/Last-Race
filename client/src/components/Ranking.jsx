import { useEffect, useState } from "react";
import API from "../API/API";
import { Alert, Spinner, Table, Row, Col } from "react-bootstrap";
import { Link } from "react-router";

function Ranking() {
    const [rankingList, setRankingList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadRanking = async () => {
            try {
                const data = await API.getRanking();
                setRankingList(data);
                setError("");
            } catch(err) {
                setError("Unable to load ranking.");
            } finally {
                setLoading(false);
            }
        };
        loadRanking();
    }, []);

    const getMedal = (index) => {
        if (index === 0) return <span className="fs-3 lh-1">🥇</span>;
        if (index === 1) return <span className="fs-4 lh-1">🥈</span>;
        if (index === 2) return <span className="fs-5 lh-1">🥉</span>;
        
        const num = index + 1;
        return <span className="font-mono-custom text-muted-custom">{num}</span>;
    };

    return (
        <div className="metro-card ranking-card shadow-lg w-100">
            <Row className="mb-4 text-center border-bottom border-urban pb-4">
                <Col>
                    <i className="bi bi-globe display-4 text-accent mb-3 d-block"></i>
                    <p className="text-accent font-mono-custom small fw-bold mb-1">
                        GLOBAL STANDINGS
                    </p>
                    <h2 className="login-title mb-2">Leaderboard</h2>
                    <p className="text-muted-custom font-mono-custom m-0">
                        Top scores of Last Race game
                    </p>
                </Col>
            </Row>

            {/* loading state */}
            {loading && (
                <Alert className="metro-alert metro-alert-warning text-center my-5 py-4 w-100 mx-auto">
                    <Spinner animation="border" size="sm" className="me-3"/>
                    LOADING DATA...
                </Alert>
            )}

            {/* err state */}
            {error && (
                <Alert className="metro-alert metro-alert-danger text-center my-5 py-4 w-100 mx-auto">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
                </Alert>
            )}

            {/* empty leaderboard */}
            {!loading && !error && rankingList.length === 0 && (
                <Alert className="metro-alert text-center my-4 py-3 text-muted-custom">
                    No scores recorder yet. Be the first to play!
                </Alert>
            )}

            {/* scores */}
            {!loading && !error && rankingList.length > 0 && (
                <div className="table-responsive mb-4 px-md-3">
                    <Table className="metro-table align-middle" borderless>
                        <thead>
                            <tr className="border-bottom border-urban">
                                <th className="text-center col-rank">Rank</th>
                                <th className="col-player">User</th>
                                <th className="text-end col-score">Best Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rankingList.map((player, index) => (
                                <RankEntry key={player.id} getMedal={getMedal} index={index} player={player} />
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}

            <Row className="border-top border-urban pt-4">
                <Col className="d-flex justify-content-center">
                    <Link to="/" className="btn-metro w-100 text-center">
                        <i className="bi bi-house-door me-2"></i>Back to Home
                    </Link>
                </Col>
            </Row>
        </div>
    );
}

function RankEntry(props) {
    return(
        <tr>
            <td className="text-center rank-cell">{props.getMedal(props.index)}</td>
            <td className="fw-bold fs-5">{props.player.username}</td>
            <td className="text-end score-cell">{props.player.best_score}</td>
        </tr>
    );
}

export default Ranking;