import axios from "axios"


const url = 'http://localhost:3020/api/users'


export const getAllUser = async () => {
    try {
        const res = await axios.get(url)
        const data = res.data
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}