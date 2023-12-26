import { API_BASE_URL } from "../global/variables";
import axios from "axios";

export async function AddLink(link){
    const response=await axios.post(`${API_BASE_URL}/shorten/`,
    {
        full_link:link
    }
    );
    if(response.status===201){
        console.log(response.data);
        return response.data.id.toString(36);
    }
    return 'something went wrong'
}


export async function GetLink(hexId){
    const response=await axios.get(`${API_BASE_URL}/shorten/id/${parseInt(hexId,36)}/`);
    if(response.status===200){
        return response.data.full_link;
    }
    return false
}