import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import ko from 'date-fns/locale/ko';
import '../css/MyPage.css';

const locales = {
  'ko': ko,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const UserProfile = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 실제 API 호출은 여기에 구현합니다.
    alert('프로필이 업데이트되었습니다!');
  };

  return (
    <div className="mypage-section">
      <h2>기본 정보 수정</h2>
      <form className="user-profile-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">이름</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="bio">소개</label>
          <textarea
            id="bio"
            rows="3"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
};

const MyPostList = ({ posts }) => (
  <div className="mypage-section">
    <h2>내가 쓴 글</h2>
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.id} className="post-item">
          <span>{post.title}</span>
          <span>{post.createdAt}</span>
        </li>
      ))}
    </ul>
  </div>
);

const MyCalendar = ({ todos }) => {
    const [events, setEvents] = useState(todos);
    const [title, setTitle] = useState('');
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());

    const handleAddTodo = (e) => {
        e.preventDefault();
        const newTodo = {
            id: events.length + 1,
            title,
            start,
            end,
        };
        setEvents([...events, newTodo]);
        setTitle('');
    };
    
    return (
        <div className="mypage-section-calendar">
            <h2>캘린더 & Todo</h2>
            <div className="todo-form">
                <h3>Todo 추가</h3>
                <form onSubmit={handleAddTodo}>
                    <input 
                        type="text" 
                        placeholder="할 일" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                        required 
                    />
                   
                    <button type="submit">추가</button>
                </form>
            </div>
            <div className="calendar-container">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    messages={{
                        next: "다음",
                        previous: "이전",
                        today: "오늘",
                        month: "월",
                        week: "주",
                        day: "일",
                        agenda: "목록",
                        date: "날짜",
                        time: "시간",
                        event: "이벤트",
                    }}
                />
            </div>
        </div>
    );
};

export { UserProfile, MyPostList, MyCalendar };