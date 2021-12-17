export const login = ()=>{
    return new Promise((resolve,reject)=>{
        wx.login({
            timeout:10000,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {reject(err)},
            complete: () => {}
        });
          
    })
}

export const payment = (pay) => {
    return new Promise((resolve,reject)=>{
        wx.requestPayment({
            ...pay,
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{reject(err)},
        });
    })
}