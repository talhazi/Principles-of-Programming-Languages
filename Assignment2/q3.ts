import { ClassExp , Binding, makeLitExp, makeVarRef ,ProcExp,makeProcExp, Exp, Program,
    makeIfExp, isProgram, isExp, makeProgram, isDefineExp, CExp, makeDefineExp, isNumExp,
    isBoolExp, isPrimOp, isVarRef, isAppExp, makeAppExp, isIfExp, isProcExp,
      makePrimOp, makeVarDecl, makeBoolExp, isClassExp, makeClassExp, isLetExp } from "./L31-ast";
import { Result, makeFailure, makeOk, bind, mapResult } from "../shared/result";
import { rest } from "../shared/list";
import { makeSymbolSExp } from "../imp/L3-value";


/*
Purpose: Transform ClassExp to ProcExp
Signature: for2proc(classExp)
Type: ClassExp => ProcExp
*/
export const class2proc = (exp: ClassExp): ProcExp => {
    const methods = exp.methods;
    return makeProcExp(exp.fields, [makeProcExp([makeVarDecl('msg')], [class2procHelper(methods)])]);
}

export const class2procHelper = (methods: Binding[]):  CExp => {
    if (methods.length===1){
        return makeIfExp( makeAppExp(makePrimOp("eq?"),[makeVarRef('msg'),makeLitExp(makeSymbolSExp(methods[0].var.var))]),
                makeAppExp(methods[0].val,[]), makePrimOp('#f'));
    }
    if (methods.length>1){
        return makeIfExp( makeAppExp(makePrimOp("eq?"),[makeVarRef('msg'),makeLitExp(makeSymbolSExp(methods[0].var.var))]),
                makeAppExp(methods[0].val,[]), class2procHelper(rest(methods)));
    }
    return makeIfExp(makeBoolExp(false),makeBoolExp(false),makeBoolExp(false));
}


/*
Purpose: Transform L31 AST to L3 AST
Signature: l31ToL3(l31AST)
Type: [Exp | Program] => Result<Exp | Program>
*/
export const L31ToL3 = (exp: Exp | Program): Result<Exp | Program> =>
    isProgram(exp) ? bind(mapResult(L31ExpToL3, exp.exps), (exps: Exp[]) => makeOk(makeProgram(exps))) :
    isExp(exp) ? L31ExpToL3(exp) :
    makeFailure("Never");

export const L31ExpToL3 = (exp: Exp): Result<Exp> =>
    isDefineExp(exp) ? bind(L31CExpToL3(exp.val), (val: CExp) => makeOk(makeDefineExp(exp.var, val))) :
    L31CExpToL3(exp);

export const L31CExpToL3 = (exp: CExp): Result<CExp> =>
    isNumExp(exp) ? makeOk(exp) :
    isBoolExp(exp) ? makeOk(exp) :
    isPrimOp(exp) ? makeOk(exp) :
    isVarRef(exp) ? makeOk(exp) :
    isLetExp(exp) ? makeOk(exp) :
    isAppExp(exp) ? makeOk(exp) :
    isIfExp(exp) ? makeOk(exp) :
    isProcExp(exp) ? makeOk(exp) :
    isClassExp(exp) ? makeOk(class2proc(makeClassExp(exp.fields, exp.methods))) :
    makeFailure(`Unexpected CExp: ${exp}`);