import "swiper/css"
import "swiper/css/navigation"
import { Swiper, SwiperSlide } from "swiper/react"
import { useEffect, useState } from "react"
import { Navigation, Autoplay } from "swiper/modules"
import DiaryCard from "../component/DiaryCard"
import boardDummyData from "../data/boardDummyData"
import BoardModal from "../component/BarderModel";

const Main = () => {
    const [diaries, setDiaries] = useState([]);
    const [selectedBoard, setSelectedBoard] = useState(null);

    // useEffect(() => {
    //     fetch("/api/boards")
    //         .then(res => res.json())
    //         .then(data => setBoards(data));
    // }, []);

    useEffect(() => {
        setDiaries(boardDummyData)
    }, [])


    return (
        <div style={{ width: "100%", height: "100vh", justifyContent: "center", alignContent: "center", paddingTop: "50px" }}>
            <Swiper
                modules={[Navigation, Autoplay]}
                navigation
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
                {boardDummyData.map((diary) => (
                    <SwiperSlide key={diary.id}>
                        <div onClick={() => setSelectedBoard(diary)}>
                            <DiaryCard diary={diary} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
             <BoardModal board={selectedBoard} onClose={() => setSelectedBoard(null)} />
        </div>
    )
}
export default Main;

