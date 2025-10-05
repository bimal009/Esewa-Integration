import CryptoJS from "crypto-js";
export const signGen=(totalAmount:string|number,transactionUuid:string,productCode:string)=>{
    const secret="8gBm/:&EnhH.1/q"
    const message=`total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`
    const hash=CryptoJS.HmacSHA256(message,secret)

    return CryptoJS.enc.Base64.stringify(hash)
}