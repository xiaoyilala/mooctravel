
import { HTTP_GET, HTTP_POST, 
    ERROR_HTTP_CODE,
    ERROR_HTTP_CODE_TEXT,
    ERROR_REQUEST,
    ERROR_REQUEST_TEXT,
    ERROR_TIMEOUT,
    ERROR_TIMEOUT_TEXT,
    ERROR_ABORT,
    ERROR_ABORT_TEXT
 } from './constants.js';
import Ajax from './ajax.js';

const ajax = (url, options)=>{
    return new Ajax(url, options).getXHR();
};

const get = (url, options)=>{
    return ajax(url, {...options, method:HTTP_GET});
};

const getJSON = (url, options)=>{
    return ajax(url, {...options, method:HTTP_GET, responseType:'json'});
};

const post = (url, options)=>{
    return ajax(url, {...options, method:HTTP_POST});
};

const ajaxPromise = (url, options)=>{
    let xhr;
    const p = new Promise((resolve, reject)=>{
        xhr = new Ajax(url, {
            ...options,
            ...{
                success(response){
                    resolve(response);
                },
                httpCodeError(status){
                    reject({
                        type:ERROR_HTTP_CODE,
                        text:`${ERROR_HTTP_CODE_TEXT}: ${status}`
                    });
                },
                error(){
                    reject({
                        type:ERROR_REQUEST,
                        text:ERROR_REQUEST_TEXT
                    })
                },
                abort(){
                    reject({
                        type:ERROR_ABORT,
                        text:ERROR_ABORT_TEXT
                    })
                },
                timeout(){
                    reject({
                        type:ERROR_TIMEOUT,
                        text:ERROR_TIMEOUT_TEXT
                    })
                }
            }
        }).getXHR();
    });
    p.xhr = xhr;
    p.ERROR_HTTP_CODE = ERROR_HTTP_CODE;
    p.ERROR_REQUEST = ERROR_REQUEST;
    p.ERROR_TIMEOUT = ERROR_TIMEOUT;
    p.ERROR_ABORT = ERROR_ABORT;
    return p;
};

const getByPromise = (url, options)=>{
    return ajaxPromise(url, {...options, method:HTTP_GET});
};

const getJSONByPromise = (url, options)=>{
    return ajaxPromise(url, {...options, method:HTTP_GET, responseType:'json'});
};

const postByPromise = (url, options)=>{
    return ajaxPromise(url, {...options, method:HTTP_POST});
};

export {ajax, get, post, getJSON, ajaxPromise, getByPromise, getJSONByPromise, postByPromise};