import {Card, CardContent,Typography} from "@mui/material"

const DiaryCard = ({diary}) => {
    return(
        <Card sx={{maxWidth:600, m:"auto", p:2}}>
            {diary.imageUrl &&(
                <img
                    src={diary.imageUrl}
                    alt="diray"
                    style={{width:"100%", borderRadius:"10px"}}
                />
            )}
            <CardContent>
                <Typography variant="h6">{diary.title}</Typography>
                <Typography variant="body2" sx={{whiteSpace:"pre-wrap", mt:1}}>
                    {diary.content}
                </Typography>
                <Typography variant="caption" sx={{mt:2, display:"block"}}>
                    감정 : {diary.emotion} • 좋아요: {diary.liked}
                </Typography>
            </CardContent>
        </Card>
    )
}
export default DiaryCard;