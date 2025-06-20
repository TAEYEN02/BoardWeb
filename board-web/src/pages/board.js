import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/board.css";
import boardDummyData from "../data/boardDummyData";
import BoardModal from "../component/BarderModel";

const BoardList = () => {
    const [boards, setBoards] = useState([]);
    const [search, setSearch] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedBoard, setSelectedBoard] = useState(null);

    // useEffect(() => {
    //     fetch("/api/boards")
    //         .then(res => res.json())
    //         .then(data => setBoards(data));
    // }, []);

    useEffect(() => {
        // 더미 데이터 (서버 연동 전)
        setBoards(boardDummyData);
    }, []);

    const handleSearch = () => {
        setSearchKeyword(search);
    };

    const filteredBoards = boards.filter((board) =>
        board.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        board.content.toLowerCase().includes(searchKeyword.toLowerCase())
    );

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
                {filteredBoards.map((board) => (
                    <div
                        key={board.id}
                        className="board-card"
                        onClick={() => setSelectedBoard(board)}
                    >
                        <img src={board.imageUrl} alt={board.title} />
                        <h3>{board.title}</h3>
                    </div>
                ))}
            </div>
            <BoardModal board={selectedBoard} onClose={() => setSelectedBoard(null)} />
        </div>
    );
};

export default BoardList;
