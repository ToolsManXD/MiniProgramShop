let ajaxTimes = 0;
export const request = (params) => {
    ajaxTimes++;
    wx.showLoading({
        title: '加载中',
        mask: true,

    });
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve,reject)=>{
        wx.request({
            url:baseUrl+params.url,
            data:params.data,
            method:params.method,
            header:params.header,
            success:(result)=>{
                resolve(result)
            },
            fail:(err)=>{
                reject(err)
            },
            complete:()=>{
                ajaxTimes--;
                if(ajaxTimes===0){
                    wx.hideLoading();
                }
            }
        })
    })
}