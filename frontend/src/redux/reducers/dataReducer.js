export const dataReducer = (state = {status:"pending", data:[]},{type,payload}) =>{
    switch(type){
        case "SET_INPROGRESS":
            return {...state, state:"pending"}
        case "SET_SUCCESS":
            return {state:"success", data:payload.data}
        case "SET_FAILED":
            return {...state, status:"failed"}
        default:
            return state;
    }
}