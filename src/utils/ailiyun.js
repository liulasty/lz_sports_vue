// import axios from "axios";

// export const aliyun = axios.create({
//     baseURL: 'http://image-upload-and-management.oss-cn-beijing.aliyuncs.com',
//     timeout:10000,
  
//   })


// // �������������
// aliyun.interceptors.request.use(function (config) {
//     // �ڷ�������֮ǰ��Щʲô
//     return config;
//   }, function (error) {
//     // �����������Щʲô
//     return Promise.reject(error);
//   });

// // �����Ӧ������
// aliyun.interceptors.response.use(function (response) {
//     // 2xx ��Χ�ڵ�״̬�붼�ᴥ���ú�����
//     // ����Ӧ��������ʲô
//     return response;
//   }, function (error) {
//     // ���� 2xx ��Χ��״̬�붼�ᴥ���ú�����
//     // ����Ӧ��������ʲô
//     return Promise.reject(error);
//   });


// export default aliyun