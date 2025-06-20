import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/boardWrite.css"; // ✨ CSS 따로 관리

const Write = ({ onAdd }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !content) {
            alert("제목과 내용을 모두 입력해주세요.");
            return;
        }

        const newPost = {
            id: Date.now(),
            title,
            content,
            imageUrl: imagePreview,
            day: new Date().toISOString().split("T")[0],
            liked: 0,
        };

        onAdd(newPost);
        navigate("/board");
    };

    return (
        <div className="write-container">
            <h2>글쓰기</h2>
            <form className="write-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="write-input"
                />
                <textarea
                    placeholder="내용을 입력하세요"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="write-textarea"
                />
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {imagePreview && (
                    <img src={imagePreview} alt="미리보기" className="image-preview" />
                )}
                <button type="submit" className="write-submit">등록</button>
            </form>
        </div>
    );
};

export default Write;
