import axios from 'axios';
const FIREBASEDB = 'https://minilik-4e824.firebaseio.com/';

export function getPlats(){

    const request = axios(`${FIREBASEDB}/plats.json`)
                .then(response => {
                    let plats = [];

                    for(let key in response.data){
                        plats.push({
                            ...response.data[key],
                            id:key
                        })
                    }
                    return plats;
                })

    return {
        type:'GET_PLATS',
        payload:request
    }

}
