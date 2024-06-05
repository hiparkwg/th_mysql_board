/* 리터널을 사용하여 충돌 예방 */
let hong={}
hong.list=()=>{
    console.log("hong.list...")
}
hong.view=()=>{
    console.log("hong.view...")
}

document.querySelector('.list').onclick=hong.list;
document.querySelector('.view').onclick=hong.view;

/* 객체 리터널을 사용하여 충돌 예방 */
let kim={
    register : ()=>{
        console.log("register...")
    },
    update : ()=>{
        console.log("update...")
    },
    init : function(){
        document.querySelector(".register").onclick = this.register;
        document.querySelector(".update").onclick = this.update;
    }

}
kim.init();
