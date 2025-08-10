import axios from 'axios';


const REGISTER_USER = process.env.REACT_APP_REGISTER_USER || "http://localhost:4000/register";
export async function UserRegister({ data }) {
    console.log("Sending data to API:", data);

    try {
        const response = await axios.post(REGISTER_USER, data);
        console.log("API Response:", response.data);
        return response;
    } catch (err) {
        console.error("API error:", err);
        throw err;
    }
}



export async function UserContatUs(data) {
  try {
    const API_URL = process.env.REACT_APP_USER_CONTACTUS_API;  
    const res = await axios.post(API_URL, data, {
      headers: { 
        "Content-Type": "application/json",
      },
    }); 
    return res;
  } catch (error) {
    console.error("❌ API Error:", error.response ? error.response.data : error.message);
  }
}

export async function UserBookApi(data){
  try {

   const BOOKING_API_URL = process.env.USER_BOOKING_API
    const res = await axios.post(BOOKING_API_URL,data,{
      headers :{
        headers: { 
          "Content-Type": "application/json",
        },
      }
    }
  )
  return res
    
  } catch (error) {
    console.error("❌ API Error:", error.response ? error.response.data : error.message);
  }
}

