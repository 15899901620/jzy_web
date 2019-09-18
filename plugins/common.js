
/*export const amountFormat = (amount) => {
    return parseFloat(amount).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,')
}

export const stringToDate = (str) => {
    return new Date(Date.parse(str.replace(/-/g, "/")))
}*/

export default {
    amountFormat: function(amount, sign){
        sign = sign || '￥'
        return sign + parseFloat(amount).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,')
    },
}
