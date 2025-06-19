import "swiper/css"
import "swiper/css/navigation"
import { Swiper, SwiperSlide } from "swiper/react"
import { useEffect, useState } from "react"
import { Navigation } from "swiper/modules"
import DiaryCard from "../component/DiaryCard"

const Main = () => {
    const [diaries, setDiaries] = useState([]);

    useEffect(() => {
        fetch("/api/diaries")
            .then((res) => res.json())
            .then((data) => setDiaries(data))
            .catch((err) => console.error("일기 불러오기 실패 : ", err));
    }, [])
    return (
        <div style={{ width: "100%", height: "100vh" }}>
            <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={50}
                slidesPerView={1}
                direction="horizontal"
                style={{ height: "100%" }}
            >
                {diaries.map((diary) => (
                    <SwiperSlide key={diary.id}>
                        <DiaryCard diary={diary} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
export default Main;

