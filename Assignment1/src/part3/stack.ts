import { State, bind } from "./state";

export type Stack = number[];

export const push = (init: number): State<Stack,undefined> =>{
    return (stack: Stack) =>{
        let toReturn = [init].concat(stack);
        return [toReturn, undefined];
    }
};

export const pop: State<Stack,number> = (stack: Stack) => [stack.slice(1,stack.length), stack[0]];

export const stackManip: State<Stack,undefined> = (stack: Stack) => {
    const[a,x]=pop(stack);
    let newState = push(x*x);
    const[b,z] = newState(a);
    const[c,y] = pop(b);
    let newState2 = push(x+y);
    const[d,f] = newState2(c);
    return [d, undefined];
};