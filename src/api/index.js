import http from '../utils/request'
// import aliyun from '../utils/ailiyun.js'

export const  getData =() => {
    //��???promise???��
    return http.get('/home/getData')
}

export const updateImg =() => {
    return http.get('/home/getImg')
}

export const addEvent =(eventList) =>{
    return http.post('/event/EventList',eventList)
}


// export const loadImageAsBase64 =(url) =>{
//     return aliyun.get(url)
// }