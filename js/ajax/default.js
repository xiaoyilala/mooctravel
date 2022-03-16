import {HTTP_GET, CONTENT_TYPE_FORM_URLENCODED} from './constants.js';

const DEFAULTS = {
    method:HTTP_GET,
    //请求头携带的数据
    params:null,
    //send方法里携带的数据
    // data:{
    //     name:'ice',
    //     age:18
    // }
    // data:FormData数据
    data:null,
    //发送到后端的数据格式
    contentType:CONTENT_TYPE_FORM_URLENCODED,
    //接受的数据格式，''为'text'
    responseType:'',
    timeoutTime:0,
    withCredentials:false,

    //方法
    success(){},
    httpCodeError(){},
    error(){},
    abort(){},
    timeout(){}
};

export default DEFAULTS;