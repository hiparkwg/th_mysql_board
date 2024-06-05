/* ES6 모듈을 사용한 충돌 방지 */
export function lee(){
    let del = ()=>{
        console.log("delete...")
    }
    let repl = ()=>{
        console.log("reple...")
    }
    document.querySelector(".del").onclick=del;
    document.querySelector(".repl").onclick=repl;
}

export function another1(){}
export function another2(){}