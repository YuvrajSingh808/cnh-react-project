import axios, { AxiosError } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const apiUrl = 'https://reqres.in/api'

type loginparams = {
    email: string,
    password: string
}

export const userLogin = createAsyncThunk(
    'login',
    async (payload: loginparams, { rejectWithValue }) => {
        try {// configure header's Content-Type as JSON
            // console.log(payload)
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const { data } = await axios.post(
                `${apiUrl}/login`,
                payload,
                config
            )
            // console.log(data)
            localStorage.setItem('userToken', data.token)
            const response = await axios.get(`${apiUrl}/users/4`)
            const user = { ...response.data.data, ...data }
            return user
        }
        catch (error: unknown) {
            if (error instanceof AxiosError)
                if (error.response && error.response.data.message) {
                    return rejectWithValue(error.response.data.message)
                } else {
                    return rejectWithValue(error.message)
                }
        }

    }
)
