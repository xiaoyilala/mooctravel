// k=v&k=v
const serialize = param => {
    const res = [];
    for(conts [key, value] of Object.entries(param)){
        res.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
    return res.join('&');
};

const addURLData = (url,data)=>{
    if(!data) return '';
    const mark = url.includes('?')?'&':'?';
    return `${mark}${data}`;
}

export {serialize, addURLData};
