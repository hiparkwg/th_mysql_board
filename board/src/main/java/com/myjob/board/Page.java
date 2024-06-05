package com.myjob.board;

public class Page {
    int nowPage;
    int startNo, endNo;
    int listSize=4;
    int totSize;
    String findStr; 

    public void compute(){
        endNo = nowPage * listSize;
        startNo = endNo - listSize;
    }
}
