/* ES6 모듈을 사용한 출돌 방지 */

export function kim(){
    let register = ()=>{
        console.log("register")
    }
    let list = ()=>{
        console.log("list")
    }

    document.querySelector(".btnRegister").onclick = register;
    document.querySelector(".btnList").onclick = list;
}


