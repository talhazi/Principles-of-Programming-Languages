import { State, bind } from "./state";

export type Queue = number[];

export const enqueue = (init: number): State<Queue,undefined> =>{
    return (queue: Queue) =>{
        let toReturn = queue.concat([init]);
        return [toReturn, undefined];
    }
};

export const dequeue: State<Queue,number> = (queue: Queue) => [queue.slice(1,queue.length), queue[0]];

export const queueManip:State<Queue,number> = (queue: Queue) => {
    const[a,x]=dequeue(queue);
    let newState = enqueue(2*x);
    const[b,y] = newState(a);
    let newState2 = enqueue(x/3);
    const[c,z] = newState2(b);
    return dequeue(c);
};