import { Result, makeFailure, makeOk, bind, either } from "../lib/result";

/* Library code */
const findOrThrow = <T>(pred: (x: T) => boolean, a: T[]): T => {
    for (let i = 0; i < a.length; i++) {
        if (pred(a[i])) return a[i];
    }
    throw "No element found.";
}

export const findResult = <T>(pred: (x: T) => boolean, a: T[]): Result<T> =>{
    const isOk = (element: T) => pred(element);
    let index = a.findIndex(isOk);
    if (index != -1) { 
        let ok: Result<T>={tag:"Ok", value:a[index]};
        return ok;
    }
    let Failure: Result<T>={tag:"Failure",message:"Fail"};
    return Failure;
};

/* Client code */
const returnSquaredIfFoundEven_v1 = (a: number[]): number => {
    try {
        const x = findOrThrow(x => x % 2 === 0, a);
        return x * x;
    } catch (e) {
        return -1;
    }
}

export const Helper = (b:number): Result<number> => {
    let x : Result<number>={tag:"Ok", value: b*b};
    return x;
}
export const Helper1 = (b:number): number => {
    let x : Result<number>={tag:"Ok", value: b*b};
    return x.value;
}

export const returnSquaredIfFoundEven_v2 = (a: number[]): Result<number> => {
    return bind(findResult(x=>x%2===0,a),b=>Helper(b));
};

export const returnSquaredIfFoundEven_v3 = (a: number[]): number => {
    return either(findResult(x=>x%2===0,a),b=>Helper1(b),b=>-1);
};