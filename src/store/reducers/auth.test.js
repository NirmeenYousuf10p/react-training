import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', ()=>{

    it('should return the initial state',()=>{
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    });

    it('should store token upon login', ()=>{
        const expectedState = {
            token: '76677',
            userId: '678',
            error: null,
            loading: false,
            authRedirectPath: '/'
        };
        const initialState = {
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        };
        const action = {
            type: actionTypes.AUTH_SUCCESS,
            idToken: '76677',
            userId: '678'
        }
        expect(reducer(initialState,action)).toEqual(expectedState);
    })
});