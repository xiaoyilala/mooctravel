import {serialize, addURLData} from './utils.js';
import {HTTP_GET, CONTENT_TYPE_FORM_URLENCODED, CONTENT_TYPE_JSON} from './constants.js';
import DEFAULTS from './default.js';

class Ajax{
    constructor(url,options){
        this.url = url;
        this.options = Object.assign({},DEFAULTS,options);

        this.init();
    }

    init(){
        const xhr = new XMLHttpRequest();
        this.xhr = xhr;
        this.bindEvents();
        xhr.open(this.options.method, this.url+this.addParam(), true);

        xhr.responseType = this.options.responseType;
        xhr.withCredentials = this.options.withCredentials;
        xhr.timeout = this.options.timeoutTime;

        this.sendData();
    }

    bindEvents(){
        const xhr = this.xhr;

        const {success, httpCodeError, error, abort, timeout} = this.options;

        xhr.addEventListener('load', ()=>{
            if(this.ok()){
                success(xhr.response, xhr);
            }else{
                httpCodeError(xhr.status, xhr);
            }
        }, false);

        xhr.addEventListener('error', ()=>{
            error(xhr);
        }, false);

        xhr.addEventListener('abort', ()=>{
            abort(xhr);
        }, false);

        xhr.addEventListener('timeout', ()=>{
            timeout(xhr);
        }, false);
    }

    addParam(){
        const {params} = this.options;
        if(!params) return "";
        return addURLData(this.url, serialize(params));
    }

    sendData(){
        const xhr = this.xhr;
        const data = this.options.data;
        if(!this.isNeedData()){
            return xhr.send(null);
        }

        let resultData = null;
        if(this.isFormData()){
            resultData = data;
        }else if(this.isFormUrlEncodedData()){
            this.setContentType();
            resultData = serialize(data);
        }else if(this.isJsonData()){
            this.setContentType();
            resultData = JSON.stringify(data);
        }else{
            this.setContentType();
            resultData = data;
        }
        xhr.send(resultData);
    }

    setContentType(type = this.options.contentType){
        if(!type) return;
        const xhr = this.xhr;
        xhr.setRequestHeader('Content-Type', type)
    }

    isNeedData(){
        const {data, method} = this.options;
        if(!data) return false;
        if(method.toLowerCase() === HTTP_GET.toLowerCase()) return false;
        return true;
    }

    isFormData(){
        return this.options.data instanceof FormData;
    }

    isFormUrlEncodedData(){
        return this.options.contentType.toLowerCase().includes(CONTENT_TYPE_FORM_URLENCODED);
    }

    isJsonData(){
        return this.options.contentType.toLowerCase().includes(CONTENT_TYPE_JSON);
    }

    ok(){
        const xhr = this.xhr;
        return (xhr.status>=200 && xhr.status<300) || xhr.status===304;
    }

    getXHR(){
        return this.xhr;
    }
}

export default Ajax;