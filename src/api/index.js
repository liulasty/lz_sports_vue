
import http from '../utils/request'
// import aliyun from '../utils/ailiyun.js'

export const getData = () => {
    return http.get('/event/mainPageData')
}

export const updateImg = (formData) => {
    return http.post('/img/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },// 设置请求头为multipart/form-data类型
    })
}

export const updateEvent = (eventId,event)=>{
    return http.put("/event/"+eventId,event)
}

export const deleteImg = (deleteImg) => {
    return http.delete('/img/delete', { data: deleteImg })
}

export const deleteEvent = (deleteEventId) => {
    console.log("删除的事件编号", deleteEventId);
    return http.delete('/event/'+deleteEventId)
}

export const getEventImg = (eventId) => {
    return http.get('/img/getEventImg/' + eventId)
}

export const addEvent = (eventList) => {
    return http.post('/event/EventList', eventList)
}

export const selectEventById = (id) => {
    return http.get('/event/' + id)
}


export const list = (listSelectCondition) => {
    console.log("查询参数", listSelectCondition);
    return http.get('/event/page', {
        params: listSelectCondition,
    })
}

export const login = (userInfo) => {
    console.log("登录参数", userInfo)
    return http.post('/user/login', userInfo)
}

export const logout = () => {
    console.log("退出");
    return http.delete('user/logout')
}

export const register = (userInfo) => {
    console.log("注册参数",)
    return http.post('/user/register', userInfo)
}


// export const loadImageAsBase64 =(url) =>{
//     return aliyun.get(url)
// }