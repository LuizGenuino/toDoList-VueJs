import ServiceBase from "./serviceBase";

export class Service extends ServiceBase {

    constructor(route) {
        super()
        this.setRoute(route)
    }

    async list(config = {}) {
        try {
            const response = await this.http.get(this.getRoute(), { params: this.getParams(), ...config })
            return Promise.resolve(response)
        } catch (e) {
            this.setError(e)
            return Promise.reject(this.getError())
        }
    }

    async get(config = {}) {
        try {
            const response = await this.http.get(`${this.getRoute()}/${this.getId()}`, config)
            return Promise.resolve(response)
        } catch (e) {
            this.setError(e)
            return Promise.reject(this.getError())
        }
    }

    async insert(data, config = {}) {
        try {
            const response = await this.http.post(this.getRoute(), data, config)
            return Promise.resolve(response)
        } catch (e) {
            this.setError(e)
            return Promise.reject(this.getError())
        }
    }

    async update(data, config = {}) {
        try {
            const response = await this.http.put(`${this.getRoute()}/${this.getId()}`, data, config)
            return Promise.resolve(response)
        } catch (e) {
            this.setError(e)
            return Promise.reject(this.getError())
        }
    }

    async delete(config = {}) {
        try {
            const response = await this.http.delete(`${this.getRoute()}/${this.getId()}`, config)
            return Promise.resolve(response)
        } catch (e) {
            this.setError(e)
            return Promise.reject(this.getError())
        }
    }
}