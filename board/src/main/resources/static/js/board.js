/* 게시판 관련 스크립트 */

export function loadUrl(data){
    $.ajax({
        url    : data.url,
        type   : data.type,
        data   : data.data,
        success : (resp) =>{
            let temp = $(resp).find("#board")
            $(data.target).html(temp);
        }
    })
}

export function index(){

    document.querySelector(".menuBoard").onclick = ()=>{
        let data = {
            url : "/list",
            type : "GET",
            target : ".board",
            data : {"nowPage" : 1, "findStr" : ""}
        }

        loadUrl(data);
    }
}

export function list(){
    document.querySelector(".btnRegister").onclick = ()=>{
        let data = {
            url : "/register",
            type : "GET",
            target : ".board"
        }

        loadUrl(data);    
    }

    document.querySelector(".btnSearch").onclick = ()=>{
        let data = {
            url : "/list",
            type : "GET",
            data : {"nowPage" : 1, "findStr" : ""},
            target : ".board"
        }
        loadUrl(data);
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

    document.querySelector(".btnRegisterR").onclick = ()=>{
        let data = {
            url : "/registerR",
            type : "POST",
            data : frm,
            target : ".board"
        }
        
    });

    document.querySelector(".btnList").onclick = ()=>{

    })
}

export function update(){}
export function del(){}
export function view(){}

export function repl(){}


