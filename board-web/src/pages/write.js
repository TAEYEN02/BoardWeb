import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBoard } from "../api/boardApi";
import "../css/boardWrite.css"; // ✨ CSS 따로 관리

const Write = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !content) {
            alert("제목과 내용을 모두 입력해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {
            await createBoard(formData);
            navigate("/board");
        } catch (error) {
            console.error("Error creating board:", error);
            alert("글 작성에 실패했습니다.");
        }
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
