package com.myjob.board;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

import com.myjob.board.mybatis.MyFactory;

@Component
public class BoardDao {
    SqlSession session;

    public String registerR(BoardVo vo, List<BoardAtt> attFiles){
        String msg = null;
        session = new MyFactory().getSession();

        try{
            // 본문 내용 저장
            int sno = session.selectOne("board.getSerial");
            vo.setSno(sno);
            vo.setPSno(sno);
            int cnt = session.insert("board.register", vo);
            if(cnt<=0) throw new Exception();

            if(attFiles.size()>0){
                Map<String, Object> map = new HashMap<>();
                map.put("pSno", sno);
                map.put("attFiles", attFiles);
                cnt = session.insert("board.registerAtt", map);
                if(cnt<=0) throw new Exception();
            }

            msg = "정상 저장됨.";
            session.commit();


        }catch(Exception ex){
            session.rollback();
            msg = "저장 중 오류 발생";
            // 이미 업로드된 파일 삭제
            List<String> delList = new ArrayList<>();
            for(BoardAtt att : attFiles){
                delList.add(att.getSysFile());
            }
            attFileDelete(delList);
        }

        session.close();
        return msg;

    }

    public Map<String, Object> list(Page page){
        Map<String, Object> map = new HashMap<>();
        List<BoardVo> list= null;
        session = new MyFactory().getSession();

        int totSize = session.selectOne("board.totSize", page.getFindStr());
        page.setTotSize(totSize);
        page.compute();

        list = session.selectList("board.search", page);
        map.put("page", page);
        map.put("list", list);
        session.close();

        return map;
    }

    public Map<String, Object> view(Integer sno){
        System.out.println("view sno" + sno);
        Map<String, Object> map = new HashMap<>();
        session = new MyFactory().getSession();
        BoardVo vo = session.selectOne("board.view", sno);
        List<BoardAtt> attFiles = session.selectList("board.attFiles", sno);

        map.put("vo", vo);
        map.put("attFiles", attFiles);

        session.close();

        return map;
    }

    public String updateR(BoardVo vo, List<BoardAtt> attFiles, String[] delFiles){
        String msg = null;
        session = new MyFactory().getSession();

        // 본문 수정
        int updateCnt = session.update("board.update", vo);
        int addAttCnt = 0;
        int delAttCnt = 0;
        
        if(updateCnt>0){
            
            // 추가 파일 정보 저장
            if(attFiles.size()>0){
                Map<String, Object> map = new HashMap<>();
                map.put("pSno", vo.getSno());
                map.put("attFiles", attFiles);

                addAttCnt = session.insert("board.registerAtt", map);
            }

            // 삭제 선택된 파일 삭제
            if(addAttCnt == attFiles.size()){
                if(delFiles != null && delFiles.length>0){
                    List<String> del = Arrays.asList(delFiles);
                    delAttCnt = attFileDelete(session, del);
                }
            }

        }
        
        if(updateCnt>0 && addAttCnt==attFiles.size() && (delAttCnt==delFiles.length || delFiles == null) ){
            msg = "수정 정상";
            session.commit();
        }else{
            // 이미 업로드된 파일 삭제하기
            if(attFiles.size()>0){
                List<String> del = new ArrayList<>();
                for(BoardAtt att : attFiles){
                    del.add(att.getSysFile());
                }
                for(String f : del){
                    File file = new File( BoardController.uploadPath+f);
                    if(file.exists()) file.delete();
                }
            }

            msg = "저장중 오류 발생";
            session.rollback();
           
        }

      
        session.close();
        return msg;

    }    

    // 이미 업로드된 파일 삭제나 삭제체크된 파일 삭제
    public void attFileDelete(List<String> delFiles){

        for(String f : delFiles){
            File file = new File( BoardController.uploadPath+f);
            if(file.exists()) file.delete();
        }
    }
 




    public String deleteR(Integer sno){
        String msg = "delete OK";
        session = new MyFactory().getSession();

        // board 삭제
        int cnt = session.delete("board.delete_board", sno);

        // 삭제할 파일 가져오기
        List<String> delFiles = session.selectList("board.select_delfiles", sno);
        
        // boardAtt 삭제
        int cntAtt = session.delete("board.delete_boardAtt", sno);

        System.out.printf("%s, %s, %s\n", cnt, delFiles.size(), cntAtt);

        if(cnt>0 && delFiles.size()==cntAtt){
            session.commit();
            // 파일 삭제
            for(String f : delFiles){
                File file = new File(BoardController.uploadPath + f);
                if(file.exists()) file.delete();
            }
        }else{
            session.rollback();
        }


        session.close();
        return msg;
    }

    public String replR(BoardVo vo, List<BoardAtt> attFiles){
        String msg = "정상처리됨";
        session = new MyFactory().getSession();

        vo.setPSno(vo.getSno());
        int sno = session.selectOne("board.getSerial");
        vo.setSno(sno);

        // seq값 증가
        session.update("board.seq_up", vo);
        vo.setSeq(vo.getSeq()+1);
        vo.setDeep(vo.getDeep()+1);


        int cnt = session.insert("board.register", vo);
        if(cnt>0){
            if(attFiles.size()>0){
                Map<String, Object> map = new HashMap<>();
                map.put("sno", sno);
                map.put("attFiles", attFiles);
                session.insert("board.registerAtt", map);
                session.commit();
            }else{
                msg = "저장중 오류 발생";
                session.rollback();
            }
        }
        session.close();
        return msg;

    }
    

}
