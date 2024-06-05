/* 게시판 관련 스크립트 */

export function loadUrl(data){
    $.ajax({
        url    : data.url,
        type   : data.type,
        data   : data.data,
        contentType : data.contentType,
        processData : data.processData,
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

    const view=(sno)=>{
        let data = {
            url : "/view",
            type : "GET",
            target : ".board"
        }

        loadUrl(data);  

    }

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
    return { view }
}



export function register(){
    document.querySelector(".btnRegisterR").onclick = ()=>{
        let frm;
        let data = {
            url : "/registerR",
            type : "POST",
            data : frm,
            target : ".board",
            processData : false,
            contentType : false
        }
        loadUrl(data);

    };

    document.querySelector(".btnList").onclick = ()=>{
        let frm;
        let data = {
            url : "/list",
            type : "GET",
            target : ".board",
        }
        loadUrl(data);
    };
}

export function update(){
    document.querySelector(".btnUpdateR").onclick = ()=>{
        let frm;
        let data = {
            url : "/updateR",
            type : "POST",
            data : frm,
            target : ".board",
            processData : false,
            contentType : false
        }
        loadUrl(data);

    };

    document.querySelector(".btnList").onclick = ()=>{
        let frm;
        let data = {
            url : "/list",
            type : "GET",
            target : ".board",
        }
        loadUrl(data);
    };

    document.querySelector(".btnAtt").onclick = ()=>{
        console.log("file att")
    }
}

export function view(){

    document.querySelector(".btnUpdate").onclick = ()=>{
        let frm;
        let data = {
            url : "/update",
            type : "GET",
            target : ".board",
        }
        loadUrl(data);
    };
    document.querySelector(".btnDeleteR").onclick = ()=>{
        let frm;
        let data = {
            url : "/deleteR",
            type : "POST",
            target : ".board",
        }
        loadUrl(data);
    };
    document.querySelector(".btnRepl").onclick = ()=>{
        let frm;
        let data = {
            url : "/repl",
            type : "POST",
            target : ".board",
        }
        loadUrl(data);
    };
    document.querySelector(".btnList").onclick = ()=>{
        let frm;
        let data = {
            url : "/list",
            type : "GET",
            target : ".board",
        }
        loadUrl(data);
    };


}
export function repl(){
    document.querySelector(".btnReplR").onclick = ()=>{
        let frm;
        let data = {
            url : "/replR",
            type : "POST",
            target : ".board",
        }
        loadUrl(data);
    };
    document.querySelector(".btnList").onclick = ()=>{
        let frm;
        let data = {
            url : "/list",
            type : "GET",
            target : ".board",
        }
        loadUrl(data);
    };

    document.querySelector(".btnAtt").onclick = ()=>{
        console.log("file att")
    }

}
export function del(){}


