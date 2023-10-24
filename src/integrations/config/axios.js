import axios from "axios"
import requestInterceptor from "./requestInterceptor"
import responseInterceptor from "./responseInterceptor"

const baseUrl = process.env.VUE_APP_HTTP_API_URL || 'http://localhost:4005/api/v1'

const timeout = process.env.VUE_APP_HTTP_TIMEOUT || '60000'
const headers = {
    'Access-Control-Allow-Origin': '*',
    //"User-Agent": process.env.VUE_APP_HTTP_USER_AGENT,
    'Content-Type': process.env.VUE_APP_HTTP_CONTENT_TYPE || 'application/json',
    'Accept': process.env.VUE_APP_HTTP_ACCEPT || '*/*',
}

class ConnectionHTTP {
    httpInstance

    constructor() {
        this.httpInstance = axios.create()
    }

    getInstance() {
        return this.httpInstance
    }

    //#region Configurations
    setBaseURL(baseURL) {
        this.httpInstance.defaults.baseURL = baseURL
    }

    setTimeout(timeout) {
        this.httpInstance.defaults.timeout = timeout
    }

    setHeaders(headers) {
        this.httpInstance.defaults.headers = headers
    }

    //#region Http Methods
    get(url, config = {}) {
        return this.httpInstance.get(url, config)
    }

    post(url, data = {}, config = {}) {
        return this.httpInstance.post(url, data, config)
    }

    put(url, data = {}, config = {}) {
        return this.httpInstance.put(url, data, config)
    }

    delete(url, config = {}) {
        return this.httpInstance.delete(url, config)
    }

    //#region Interceptors
    useInterceptors() {
        this.httpInstance.interceptors.request.use(
            requestInterceptor.config,
            requestInterceptor.error
        )

        this.httpInstance.interceptors.response.use(
            responseInterceptor.response,
            responseInterceptor.error
        )
    }

}

const http = new ConnectionHTTP()
http.setBaseURL(baseUrl)
http.setTimeout(timeout)
http.setHeaders(headers)

export default http