import { useState, useEffect } from "react";
import { getAllBoards, likeBoard } from "../api/boardApi";
import "../css/board.css";
import BoardModal from "../component/BarderModel";

const BoardList = () => {
    const [boards, setBoards] = useState([]);
    const [search, setSearch] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedBoard, setSelectedBoard] = useState(null);

    const SERVER_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const response = await getAllBoards(searchKeyword);
                setBoards(response.data);
            } catch (error) {
                console.error("Error fetching boards:", error);
            }
        };
        fetchBoards();
    }, [searchKeyword]);

    const handleSearch = () => {
        setSearchKeyword(search);
    };

    const toggleLike = async (boardId) => {
        try {
            const response = await likeBoard(boardId);
            setBoards(boards.map(board =>
                board.id === boardId ? { ...board, liked: response.data } : board
            ));
            setSelectedBoard(prevBoard =>
                prevBoard && prevBoard.id === boardId ? { ...prevBoard, liked: response.data } : prevBoard
            );
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    return (
        <div className="board-container">
            {/* 검색창 */}
            <div className="search-box">
                <input
                    type="text"
                    placeholder="제목 또는 내용 검색"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={handleSearch}>검색</button>
            </div>

            {/* 게시글 리스트 */}
            <div className="board-grid">
                {boards.map((board) => (
                    <div
                        key={board.id}
                        className="board-card"
                        onClick={() => setSelectedBoard(board)}
                    >
                        {board.imageUrl && <img src={`${SERVER_BASE_URL}${board.imageUrl}`} alt={board.title} />}
                        <h3>{board.title}</h3>
                    </div>
                ))}
            </div>
            <BoardModal board={selectedBoard} onClose={() => setSelectedBoard(null)} onToggleLike={toggleLike} />
        </div>
    );
};

export default BoardList;
