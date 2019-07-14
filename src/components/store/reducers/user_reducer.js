



export default function(state={},action){
    switch(action.type){
        case 'sign_user':
        return {
            ...state,
            userData:{
                uid:action.payload.localId || false,
                token:action.payload.idToken || false,
                refToken:action.payload.refreshToken || false
            }
        }
    break;
        case 'register_user':
        return {
            ...state,
            userData:{
                uid:action.payload.localId || false,
                token:action.payload.idToken || false,
                refToken:action.payload.refreshToken || false
            }
        }
    break;
    case 'auto_sign_in':
    return {
        ...state,
        userData:{
            uid:action.payload.user_id || false,
            token:action.payload.id_token || false,
            refToken:action.payload.refresh_token || false
        }
    }


        default:
            return state;
    }
}

