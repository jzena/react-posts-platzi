const initialState = {
    posts: {
        page: 1,
        entities: [],
    },
    comments: [],
    user: {},
};

const action = {
    type: 'SET_POST',
    payload: {},//data que necesitamos para hacer la acción
    //meta: {},//cualquier información extra que necesitamos
    //error: true,//default en redux
}

function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_POST':
            return Object.assign({}, state, {
                posts: Object.assign({}, state.posts, {
                    entities: state.posts.entities.concat(action.payload),
                }),
            });
        default:
            return state;
    }
}