export const dataReducer = (state = {status:"pending", data:[]},{type,payload}) =>{
    switch(type){
        case "SET_INPROGRESS":
            return {...state, status:"pending"}
        case "SET_SUCCESS":
            return {status:"success", data:payload.data}
        case "SET_FAILED":
            return {...state, status:"failed"}
        default:
            return state;
    }
}