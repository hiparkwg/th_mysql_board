/* 게시판 관련 스크립트 */

export function loadUrl(data){
    let target = ".board";
    let source = "#board";
    $.ajax({
        url    : data.url,
        type   : data.type,
        data   : data.param,
        success : (resp) =>{
            let temp = $(resp).find(source)
            $(target).html(temp);
        }
    })
}


export function index(){

    document.querySelector(".menuBoard").onclick = ()=>{
        let board = {
            "nowPage" : 1,
            "findStr" : ""
        }
        let data = {
            url    : "/list",
            type   : "GET",
            param  : {"nowPage" : board.nowPage, "findStr" : board.findStr}
        }
        sessionStorage.setItem("board", JSON.stringify(board));
        loadUrl(data);
    }
}

// ---------------------------------------------------------------
// 조회(리스트)
// ---------------------------------------------------------------
export function list(){

    let temp = sessionStorage.getItem("board");
    let board = JSON.parse(temp);
    let findStr = board.findStr;
    document.querySelector(".findStr").value = findStr;

    const view=(sno)=>{
        board.sno = sno;
        sessionStorage.setItem("board", JSON.stringify(board));
        let data = {
            url     : "/view",
            type    : "GET",
            param   : {"sno" : sno, "nowPage" : board.nowPage}
        }

        loadUrl(data);  

    }

    document.querySelector(".btnRegister").onclick = ()=>{
        let data = {
            url    : "/register",
            type   : "GET",
        }

        loadUrl(data);    
    }

    document.querySelector(".btnSearch").onclick = ()=>{
        let findStr = document.querySelector(".findStr").value;
        console.log("findStr", findStr);
        
        let board = JSON.parse(sessionStorage.getItem("board"));
        board.nowPage = 1;
        board.findStr = findStr;
        sessionStorage.setItem("board", JSON.stringify(board));


        let data = {
            url    : "/list",
            type   : "GET",
            param : {"nowPage" : board.nowPage, "findStr" : board.findStr},
        }
        loadUrl(data);
    }

    document.querySelector(".btnPrev").onclick = ()=>{
        let findStr = document.querySelector(".findStr").value;
        console.log("findStr", findStr);

        let temp = sessionStorage.getItem("board");
        let board = JSON.parse(temp);
        if(board.nowPage>1) board.nowPage -= 1;
        board.findStr = findStr;

        sessionStorage.setItem("board", JSON.stringify(board));

        let data = {
            url    : "/list",
            type   : "GET",
            param  : {"nowPage" : board.nowPage, "findStr" : findStr},
        }
        loadUrl(data);
    }

    document.querySelector(".btnNext").onclick = ()=>{
        let findStr = document.querySelector(".findStr").value;

        let temp = sessionStorage.getItem("board");
        let board = JSON.parse(temp);
        board.nowPage += 1;
        board.findStr = findStr;

        console.log("findStr", findStr, 'board', board);
        sessionStorage.setItem("board", JSON.stringify(board));

        let data = {
            url : "/list",
            type : "GET",
            param : {"nowPage" : board.nowPage, "findStr" : findStr},
        }
        loadUrl(data);
    }


    return { view }
}


// --------------------------------------------------
// 게시판 작성
// --------------------------------------------------
export function register(){
    document.querySelector(".btnRegisterR").onclick = ()=>{
        let temp = document.frmBoard;
        let frm = new FormData(temp);
        $.ajax({
            url : "/registerR",
            type : "POST",
            data : frm,
            processData : false,
            contentType : false,
            success : (resp)=>{
                console.log("register result : ", resp);
                let board = JSON.parse(sessionStorage.getItem("board"));
                let data = {
                    url    : "/list",
                    type   : "GET",
                    param  : {"nowPage" : board.nowPage, "findStr" : board.findStr}
                }
                loadUrl(data);
            }

        })

    };

    document.querySelector(".btnList").onclick = ()=>{
        let temp = sessionStorage.getItem("board");
        let board = JSON.parse(temp);
        let data = {
            url : "/list",
            type : "GET",
            param : { "nowPage" : board.nowPage, "findStr" : board.findStr}
        }
        loadUrl(data);
    };
}

// -----------------------------------------------
// 게시판 수정하기
// -----------------------------------------------
export function update(){
    let board = JSON.parse(sessionStorage.getItem("board"));

    document.querySelector(".btnUpdateR").onclick = ()=>{
        let temp = document.frmBoard;
        let tag = document.createElement("input");
        tag.name = "sno";
        tag.type = "hidden";
        tag.value = board.sno;
        
        temp.appendChild(tag);
        let frm = new FormData(temp);

        $.ajax({
            url : "/updateR",
            type : "POST",
            data : frm,
            processData : false,
            contentType : false,
            success : (resp)=>{
                console.log("update result : ", resp);
                let data = {
                    url    : "/list",
                    type   : "GET",
                    param  : {"nowPage" : board.nowPage, "findStr" : board.findStr}
                }
                loadUrl(data);
            }

        })

    };

    document.querySelector(".btnList").onclick = ()=>{
        let data = {
            url : "/list",
            type : "GET",
            param : {"nowPage" : board.nowPage, "findStr" : board.findStr}
        }
        loadUrl(data);
    };

    document.querySelector(".btnAtt").onclick = ()=>{
        console.log("file att")
    }
}



// -----------------------------------------------
// 게시판 상세보기 
// -----------------------------------------------
export function view(){
    let temp = sessionStorage.getItem("board");
    let board = JSON.parse(temp);

    document.querySelector(".btnUpdate").onclick = ()=>{
        let data = {
            url : "/update",
            type : "GET",
            param : {"sno" :  board.sno}
        }
        loadUrl(data);
    };


    document.querySelector(".btnDeleteR").onclick = ()=>{
        let yn = confirm("삭제?");
        if( !yn ) return;


        $.ajax({
            url : "/deleteR",
            type : "GET",
            data : {"sno" : board.sno},
            success : (resp)=>{
                let data = {
                    url    : "/list",
                    type   : "GET",
                    param  : {"nowPage" : board.nowPage, "findStr" : board.findStr}
                }
                loadUrl(data);
            }
        })
       
    };

    document.querySelector(".btnRepl").onclick = ()=>{
        let frm = document.frmBoard;
        let grp = frm.grp.value;
        let seq = frm.seq.value;
        let deep = frm.deep.value;
        let data = {
            url : "/repl",
            type : "POST",
            param : { "sno" : board.sno, "grp" : grp, "seq" : seq, "deep" : deep}
        }
        loadUrl(data);
    };


    document.querySelector(".btnList").onclick = ()=>{
        let data = {
            url : "/list",
            type : "GET",
            param : { "nowPage" : board.nowPage, "findStr" : board.findStr}
        }
        loadUrl(data);
    };


}

// -----------------------------------------------
// 게시판 댓글
// -----------------------------------------------
export function repl(){
    let temp = sessionStorage.getItem("board");
    console.log("111",temp);
    let board = JSON.parse(temp);

    document.querySelector(".btnReplR").onclick = ()=>{
        let temp = document.frmBoard;
        let frm = new FormData(temp);
        $.ajax({
            url : "/replR",
            type : "POST",
            data : frm,
            processData : false,
            contentType : false,
            success : (resp)=>{
                console.log("repl result : ", resp);
                let board = JSON.parse(sessionStorage.getItem("board"));
                let data = {
                    url    : "/list",
                    type   : "GET",
                    param  : {"nowPage" : board.nowPage, "findStr" : board.findStr}
                }
                loadUrl(data);
            }
        }) 

    }
    document.querySelector(".btnList").onclick = ()=>{
        let frm;
        let data = {
            url : "/list",
            type : "GET",
            param : {"findStr" : board.findStr, "nowPage" : board.nowPage}
        }
        loadUrl(data);
    };

    document.querySelector(".btnAtt").onclick = ()=>{
        console.log("file att")
    }

}
export function del(){}


