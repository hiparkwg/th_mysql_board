package com.myjob.board;

import java.util.List;

import lombok.Data;

@Data
public class BoardVo {
    int sno, grp, seq, deep, hit, pSno;
    String id, subject, doc, nal;
}
