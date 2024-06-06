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

export function update(){
    document.querySelector(".btnUpdateR").onclick = ()=>{
        let frm;
        let data = {
            url : "/updateR",
            type : "POST",
            param : frm,
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
    console.log("111",temp);
    let board = JSON.parse(temp);

    document.querySelector(".btnUpdate").onclick = ()=>{
        let frm;
        let data = {
            url : "/update",
            type : "GET",
        }
        loadUrl(data);
    };
    document.querySelector(".btnDeleteR").onclick = ()=>{
        let frm;
        let data = {
            url : "/deleteR",
            type : "POST",
        }
        loadUrl(data);
    };
    document.querySelector(".btnRepl").onclick = ()=>{
        let frm;
        let data = {
            url : "/repl",
            type : "POST",
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
export function repl(){
    let temp = sessionStorage.getItem("board");
    console.log("111",temp);
    let board = JSON.parse(temp);

    document.querySelector(".btnReplR").onclick = ()=>{
        let frm;
        let data = {
            url : "/replR",
            type : "POST",
        }
        loadUrl(data);
    };
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


