export default function(state={},action){
    switch(action.type){

        case 'GET_PLATS':
            return {...state,list:action.payload}
     
        default:
            return state;
    }
}