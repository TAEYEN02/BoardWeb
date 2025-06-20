import "../css/boardModel.css";

const BoardModal = ({ board, onClose }) => {
    if (!board) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>X</button>
                <h2>{board.title}</h2>
                <img src={board.imageUrl} alt={board.title} />
                <p>{board.content}</p>
            </div>
        </div>
    );
};

export default BoardModal;
