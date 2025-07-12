import "swiper/css"
import "swiper/css/navigation"
import { Swiper, SwiperSlide } from "swiper/react"
import { useEffect, useState } from "react"
import { Navigation, Autoplay } from "swiper/modules"
import DiaryCard from "../component/DiaryCard"
import { getAllBoards, likeBoard } from "../api/boardApi"
import BoardModal from "../component/BarderModel";

const Main = () => {
    const [boards, setBoards] = useState([]);
    const [selectedBoard, setSelectedBoard] = useState(null);
    //이미지 URL을 서버에서 가져오는 경우, 서버의 기본 URL을 환경 변수로 설정합니다.
    const SERVER_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const response = await getAllBoards();
                setBoards(response.data);
            } catch (error) {
                console.error("Error fetching boards:", error);
            }
        };
        fetchBoards();
    }, []);

    const toggleLike = async (boardId, currentIsLikedByUser) => {
        try {
            // Assuming likeBoard API handles toggling and returns updated board data
            const response = await likeBoard(boardId);
            setBoards(boards.map(board =>
                board.id === boardId ? { ...board, liked: response.data.liked, isLikedByUser: response.data.isLikedByUser } : board
            ));
            // Also update selectedBoard if it's the one being liked/unliked
            setSelectedBoard(prevBoard =>
                prevBoard && prevBoard.id === boardId ? { ...prevBoard, liked: response.data.liked, isLikedByUser: response.data.isLikedByUser } : prevBoard
            );
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    const handleCardClick = (board) => {
        setSelectedBoard(board);
        // Do NOT call toggleLike here. It will be called from inside the modal.
    };

    if (boards.length === 0) {
        return <div>전체 게시글이 없습니다</div>;
    }

    return (
        <div style={{ width: "100%", height: "100vh", justifyContent: "center", alignContent: "center", paddingTop: "50px" }}>
            <Swiper
                modules={[Navigation, Autoplay]}
                // navigation // Removed this line
                spaceBetween={50}
                slidesPerView={1}
                direction="horizontal"
                style={{ height: "100%" }}
                loop={true}
                effect="slide"
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
            >
                {boards.map((board) => (
                    <SwiperSlide key={board.id}>
                        <div onClick={() => handleCardClick(board)}>
                            <DiaryCard diary={{ ...board, imageUrl: board.imageUrl ? SERVER_BASE_URL + board.imageUrl : null }} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <BoardModal board={selectedBoard} onClose={() => setSelectedBoard(null)} onToggleLike={toggleLike} />
        </div>
    )
}
export default Main;

