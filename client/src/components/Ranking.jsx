import { useEffect, useState } from "react";
import API from "../API/API";
import { Alert, Spinner, Table } from "react-bootstrap";
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
        if (index === 0) return "🥇";
        if (index === 1) return "🥈";
        if (index === 2) return "🥉";
        
        const num = index + 1;
        return `[ ${num < 10 ? '0' + num : num} ]`;
    };

    return (
        <div className="page-center page-enter">
            <div className="metro-card ranking-card">
                <div className="text-center mb-5">
                    <p className="text-accent font-mono-custom small fw-bold mb-1">
                        GLOBAL STANDINGS
                    </p>
                    <h2 className="login-title mb-2">Leaderboard</h2>
                    <p className="text-muted-custom font-mono-custom">
                        Top scores of Last Race game
                    </p>
                </div>

                {/* loading state */}
                {loading && (
                    <Alert className="metro-alert metro-alert-warning text-center my-5 py-4">
                        <span className="spinner-border spinner-border-sm me-3" role="status" aria-hidden="true"></span>
                        LOADING DATA... PLEASE WAIT
                    </Alert>
                )}

                {/* err state */}
                {error && (
                    <Alert className="metro-alert metro-alert-danger text-center my-4 py-3">
                        {error}
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
                    <div className="table-responsive mb-4">
                        <Table className="metro-table" borderless>
                            <thead>
                                <tr>
                                    <th className="text-center col-rank">Rank</th>
                                    <th className="col-player">User</th>
                                    <th className="text-end col-score">Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rankingList.map((player, index) => (
                                    <tr key={player.id || index}>
                                        <td className="text-center rank-cell">{getMedal(index)}</td>
                                        <td className="fw-bold fs-5">{player.username}</td>
                                        <td className="text-end score-cell">{player.best_score}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}

                <div className="d-flex justify-content-center mt-5">
                    <Link to="/" className="btn-metro w-100 text-center">
                        Back to Home
                    </Link>
                </div>
                
            </div>
        </div>
    );
}

export default Ranking;