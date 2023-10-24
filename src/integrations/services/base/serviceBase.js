import http from "@/integrations/config/axios"

//ServiceBase classe abstrata para iniciar a classe Serviços
export default class ServiceBase {
    http = null
    _id = null
    _route = ""
    _params= {
        page: 0,
        limit: 50,
    }
    _error ={
        message:'',
        status: '',
      }

    constructor(){
        this.http = http
        this.http.useInterceptors()
    }

    getRoute () {
        return this._route
    }

    setRoute (route) {
        this._route = route
      }

    getId () {
        return this._id
      }
    
      setId (id) {
        this._id = id
      }
    
      setPage (page) {
        this._params.page = (page && page > 0) ? page : null
        if (this._params.page) this.setLimit(true)
        return this
      }

      setParam (key, value) {
        this._params[key] = value
        return this
      }
    
      getParams () {
        return this._params
      }
    
     // parabemtros poucos usados
      setLimit (enable) {
        this._params.limit = enable ? (process.env.VUE_APP_ITEMS_PER_PAGE || 5) : null
        return this
      }
    
      setSearch (search) {
        this._params.search = search
        return this
      }
    
      setSearchType (searchType) {
        this._params.search_type = searchType
        return this
      }
    
      setAlias (alias) {
        this._params.alias = alias
        return this
      }
    
      setError (error) {
        if (!error) {
          this._error = {
            message: 'Unspecified error'
          }
          return this
        }
    
        if (error.response) {
          if (typeof error.response.data === 'string') {
            this._error = {
              message: error.response.data,
              status: error.response.status
            }
            return this
          }
    
          if (typeof error.response.data === 'object') {
            this._error = {
              id: error.response.data.id,
              message: error.response.data.message || error.response.data.mensagem,
              status: error.response.status
            }
            return this
          }
    
          this._error = {
            message: error.response.statusText,
            status: error.response.status
          }
          return this
        }
    
        if(error.request) {
          this._error = {
            message: error.request.statusText || 'An unexpected error occurred, check the settings',
            status: error.request.status
          }
          return this
        }
    
        this._error = {
          message: 'Unexpected error'
        }
        return this
      }
    
      getError () {
        return this._error
      }
}