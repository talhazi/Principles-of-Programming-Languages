import { F } from "ramda";

export type State<S, A> = (initialState: S) => [S, A];

export const bind = <S, A, B>(state: State<S,A>, f: (x: A) => State<S, B>) : State<S, B> =>{
    return (init: S) =>{
        const[x,y] = state(init);
        let newState:State<S,B> = f(y);
        return newState(x);
    }
};