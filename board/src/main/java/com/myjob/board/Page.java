package com.myjob.board;

import lombok.Data;

@Data
public class Page {
    int nowPage;
    int startNo, endNo;
    int listSize=10;
    int totSize;
    String findStr; 

    public void compute(){
        endNo = nowPage * listSize;
        startNo = endNo - listSize;
    }
}
