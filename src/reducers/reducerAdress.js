const initialState = {
    address: '',
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setNew':
            return { address: action.payload }
        case 'setDefault':
            return { address: action.payload }
        default:
            return { counter: action.payload }
    }
}

export default rootReducer