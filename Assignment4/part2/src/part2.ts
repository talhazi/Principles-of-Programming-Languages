/* 2.1 */
export const MISSING_KEY = '___MISSING___'

type PromisedStore<K, V> = {
    get(key: K): Promise<V>,
    set(key: K, value: V): Promise<void>,
    delete(key: K): Promise<void>
}

export function makePromisedStore<K, V>(): PromisedStore<K, V> {
    let s = new Map<K,V>();
    return {
        get(key: K) {
            let val = s.get(key);
            if (val === undefined){
              return Promise.reject(MISSING_KEY);
            }
            else {
              return Promise.resolve(val);
            }
        },
        set(key: K, value: V) {
            let val = s.get(key)
            if (val===undefined){
              s.set(key,value);
              return Promise.resolve();
            }
            else {
              return Promise.reject(MISSING_KEY);
            }
        },
        delete(key: K) {
          let val = s.get(key)
          if (val===undefined){
            return Promise.reject(MISSING_KEY);
          }
          else {
            s.delete(key);
            return Promise.resolve();
          }
        },
    }
}

export function getAll<K, V>(store: PromisedStore<K, V>, keys: K[]): Promise<V[]> {
   try{
    return Promise.all(keys.map((key:K)=>store.get(key)));
   } catch{
    return Promise.reject(MISSING_KEY);
   }
}

/* 2.2 */
export function asyncMemo<T, R>(f: (param: T) => R): (param: T) => Promise<R> {
  const theStore: PromisedStore<T,R> = makePromisedStore();
  return async(param: T) =>{
      try{
        return await theStore.get(param);
      }
      catch{
        await theStore.set(param, f(param));
        return theStore.get(param);
      }
    }
}

/* 2.3 */
export function lazyFilter<T>(genFn: () => Generator<T>, filterFn: (val: T) => boolean): () => Generator<T> {
  return function* lzyArr(): Generator<T> {
    for (let x of genFn()) {
      if (filterFn(x)) {
        yield x;
      }
    }
  }
}

export function lazyMap<T>(genFn: () => Generator<T>, mapFn: (val: T) => T): () => Generator<T> {
  return function* lzyArr(): Generator<T> {
    for (let x of genFn()) {
      yield mapFn(x);
    }
  }
}

/* 2.4 */
// you can use 'any' in this question
export async function asyncWaterfallWithRetry(fns: [() => Promise<any>,...((param:any)=>(Promise<any>))[]]): Promise<any> {
    var val: any;
    for (let i: number = 0; i < fns.length; i++) {
        val = await next(val, fns[i])
    }
    return val
}

  export async function next(val:any, f: (param:any) => (Promise<any>)) : Promise<any> {
    try{
      return await f(val);
     } catch(err){
      setTimeout(async () => {}, 2000);
     }

    try{
      return await f(val);
     } catch(err2){
      setTimeout(async () => {}, 2000);
     }

     try{
      return await f(val);
     } catch(err3) {
        throw err3;
     }
  }
