const initialState =  '';
const setToken = (state = initialState, action) => {
 switch (action.type) {
    case 'SET_TOKEN':
        return  action.payload;
        default: return state;
 }
}
export default setToken;