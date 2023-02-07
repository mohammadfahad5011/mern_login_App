import axios from 'axios'
// eslint-disable-next-line
import {USER_LOGIN_REQUEST, USER_LOGIN_SUCSESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_REGISTER_SUCSESS, USER_REGISTER_REQUEST, USER_REGISTER_FAIL} from '../constant/userConstant'


// LOGIN purpose

export const login = (email , password) => async(dispatch, getState) =>{
    try {
        dispatch({type: USER_LOGIN_REQUEST}) 

        const config= {
            headers: {
                "Content-Type" : "application/json"
            }
        }

        const {data} = await axios.post(`/api/v1/users/login`, {email, password} , config)

        dispatch({
            type: USER_LOGIN_SUCSESS,
            payload: data
        })

        localStorage.setItem("userInfo" , JSON.stringify(getState().userLogin.userInfo))
        // localStorage.setItem("userInfo" , JSON.stringify(data))
        

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.message
        })
    }
} 

// LOGOUT purpose :

export const logout = () => async(dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({
        type: USER_LOGOUT
    })
}


// Register purpose :

export const register = (name, email , password) => async(dispatch, getState) =>{
    try {
        dispatch({type: USER_REGISTER_REQUEST}) 

        const config= {
            headers: {
                "Content-Type" : "application/json"
            }
        }

        const {data} = await axios.post(`/api/v1/users/`, {name,email, password} , config)

        dispatch({
            type: USER_REGISTER_SUCSESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCSESS,
            payload: data
        })

        localStorage.setItem("userInfo" , JSON.stringify(getState().userRegister.userInfo))
        // localStorage.setItem("userInfo" , JSON.stringify(data))
        

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.message
        })
    }
}