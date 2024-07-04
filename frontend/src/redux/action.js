import axios from 'axios'
export const fetchData = () => async(dispatch) =>{
    dispatch({type:"SET_INPROGRESS"})
    const token = JSON.parse(localStorage.getItem("loggedIn"))||{}
    // axios.get("http://localhost:8080/data",{headers:{Authorization: `Bearer ${token.accessToken}`}})

     axios.get("https://statxo-test-case.onrender.com/data",{headers:{Authorization: `Bearer ${token.accessToken}`}})
    .then((res)=>{
        console.log(res);
        dispatch({payload:res.data, type:"SET_SUCCESS"})

    })
    .catch((err)=>{
        console.log("Error while fetching the products", err)
        dispatch({ type:"SET_FAILED"});
    })
}