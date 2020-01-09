import jwtDecode from 'jwt-decode'
import cryptoJs from 'crypto-js'

export default (jwtKey) => {
    const { key } = jwtDecode(jwtKey)

    const bytes = cryptoJs.AES.decrypt(key.toString(), process.env.VUE_APP_CRYPTO_SECRET)
    const plaintext = bytes.toString(cryptoJs.enc.Utf8)

    alert(bytes)
    alert(plaintext)
    alert(plaintext === process.env.VUE_APP_JWT_OFFLINE_SECRET)

    return plaintext === process.env.VUE_APP_JWT_OFFLINE_SECRET
}