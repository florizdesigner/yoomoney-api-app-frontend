import {IUser} from "../models/IUser";
import {makeAutoObservable} from 'mobx'
import AuthService from "../services/AuthService";
import {API_URL} from "../http";
import {AuthResponse} from "../models/response/AuthResponse";
import axios from 'axios'

export default class Store {
    user = {} as IUser
    isAuth = false
    isLoading = false
    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user
    }

    setLoading(bool: boolean) {
        this.isLoading = bool
    }

    async login (email: string, password: string) {
        try {
            const response = await AuthService.login(email, password)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            if(!localStorage.getItem('user_id')) localStorage.setItem('user_id', response.data.user.id)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async registration (email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout()
            localStorage.removeItem('token')
            if(localStorage.getItem('user_id')) localStorage.removeItem('user_id')
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async checkAuth () {
        this.setLoading(true)
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        } finally {
            this.setLoading(false)
        }
    }

    async getBindingLink (scope: Array<string>) {
        this.setLoading(true)
        try {
            console.log(scope)
            const response = await axios({
                method: "POST",
                url: `${API_URL}/ymauth`,
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    scope: scope
                }
            })
            console.log(response)
            if(response.data.link) return window.location.replace(response.data.link)
        } catch (e) {
            console.error(e)
        } finally {
            this.setLoading(false)
        }
    }
}