export function DomUpdate(state = {status:false}, {type}){
    switch(type){
        case "REFRESH":
            return {status: !state.status};
        
        default:
            return state;
    }
}