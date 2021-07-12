import * as R from "ramda";

const stringToArray = R.split("");

/* Question 1 */
export const countVowels = (input: string): number =>{
    let newArr = stringToArray(input).filter(x => x==='e'||x==='i'||x==='a'||x==='o'||x==='u'||x==='E'||x==='I'||x==='A'||x==='O'||x==='U');
    return newArr.reduce((acc,curr) => acc+1,0);
};


/* Question 2 */
export const runLengthEncoding = (input: string): string =>{
  let newArr = R.groupWith(R.equals, stringToArray(input))
  return newArr.reduce((acc,curr)=> acc+curr[0]+(curr.length>1?curr.length:""),"")
};


/* Question 3 */
export const isPaired = (input: string): boolean =>{
let newArr =stringToArray(input).filter(x => x==='(' || x===')' || x==='{' || x==='}' || x==='[' || x===']');
return method(newArr,[],0,0,0,"");
};

export const method = (input: string[],ParthnessBeen: string[], count1:number,count2:number,count3:number,curr:string): boolean =>{
    if(input.length===0){
      if ((count1===0)&&(count2===0)&&(count3===0))
        return true;
      else
        return false;
    }
    if (count1<0||count2<0||count3<0){
      return false;
    }
    if ((input[0]==="("||input[0]===")")){
      if(input[0]==="(") {
        count1++;
        ParthnessBeen = ParthnessBeen.concat(["("]);
      }
      else{
        count1--;
        ParthnessBeen = ParthnessBeen.slice(0,ParthnessBeen.length-1);
        if (curr!="(")
          return false;
      }
    }
    if ((input[0]==="["||input[0]==="]")){
      if(input[0]==="["){
        count2++;
        ParthnessBeen = ParthnessBeen.concat(["["]);
      }
      else{
        count2--;
        ParthnessBeen = ParthnessBeen.slice(0,ParthnessBeen.length-1);
        if (curr!="[")
          return false;
      }
    }
    if ((input[0]==="{"||input[0]==="}")){
      if(input[0]==="{"){
        count3++;
        ParthnessBeen = ParthnessBeen.concat(["{"]);
      }
      else{
        count3--;
        ParthnessBeen = ParthnessBeen.slice(0,ParthnessBeen.length-1);
        if (curr!="{")
          return false;
      }
    }    
    return method(input.slice(1),ParthnessBeen,count1,count2,count3,ParthnessBeen[ParthnessBeen.length-1]);
};