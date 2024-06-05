/* 게시판 관련 스크립트 */

export function index(){

    document.querySelector(".menuBoard").onclick = ()=>{
        $.ajax({
            url    : "/list",
            type   : "GET",
            data   : {"nowPage" : 1, "findStr" : ""},
            success : (resp) =>{
                let temp = $(resp).find("#board")
                $('.board').html(temp);
            }
        })
    }
}


export function register(){
    let registerR = ()=>{
        $.ajax({
            url    : "/registerR",
            type   : "GET",
            data   : {"nowPage" : 1, "findStr" : ""},
            success : (resp) =>{
                let temp = $(resp).find("#board")
                $('.board').html(temp);
            }
        })
    }
    let list = ()=>{
        $.ajax({
            url    : "/list",
            type   : "GET",
            data   : {"nowPage" : 1, "findStr" : ""},
            success : (resp) =>{
                let temp = $(resp).find("#board")
                $('.board').html(temp);
            }
        })
    }

    document.querySelector(".btnRegisterR").onclick = registerR;
    document.querySelector(".btnList").onclick = list;
}

export function update(){}
export function del(){}
export function view(){}
export function list(){
    document.querySelector(".btnRegister").onclick = ()=>{
        console.log('register')
    }
    document.querySelector(".btnList").onclick = ()=>{
        $.ajax({
            url    : "/list",
            type   : "GET",
            data   : {"nowPage" : 1, "findStr" : ""},
            success : (resp) =>{
                let temp = $(resp).find("#board")
                $('.board').html(temp);
            }
        })
    }
}
export function repl(){}


