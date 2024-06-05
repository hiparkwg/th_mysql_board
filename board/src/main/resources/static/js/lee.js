/* 리터널을 사용한 충돌 방지 */

const lee = {}
 
lee.update = ()=>{
    console.log("update")
}

lee.repl = ()=>{
    console.log("repl")
}

document.querySelector(".btnUpdate").onclick = lee.update;
document.querySelector(".btnRepl").onclick = lee.repl;

/* 객체 리터럴 */

const hong = {
    init : function(){
        document.querySelector(".btnList").onclick = this.list;
        document.querySelector(".btnDelete").onclick = this.del;
    },
    list : ()=>{
        console.log("list")
    },
    del : ()=>{
        console.log("delete")
    },
   
}
hong.init();