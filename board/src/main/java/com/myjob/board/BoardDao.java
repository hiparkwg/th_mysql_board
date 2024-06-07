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
            vo.setGrp(sno);
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
            // 이미 업로드된 파일 삭제
            if(attFiles.size()>0){
                List<String> delList = new ArrayList<>();
                for(BoardAtt att : attFiles){
                    delList.add(att.getSysFile());
                }
                for(String f : delList){
                    File file = new File( BoardController.uploadPath+f);
                    if(file.exists()) file.delete();
                }
            }

            session.rollback();
            msg = "저장 중 오류 발생";
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


        try{
            // 본문 수정
            int cnt = session.update("board.update", vo);
            if(cnt<=0) throw new Exception();

            // 추가 파일 정보 저장
            if(attFiles.size()>0){
                Map<String, Object> map = new HashMap<>();
                map.put("pSno", vo.getSno());
                map.put("attFiles", attFiles);

                cnt = session.insert("board.registerAtt", map);
                if(cnt<=0) throw new Exception();
            }

             // 삭제 선택된 파일 삭제
            if(delFiles != null && delFiles.length>0){
                List<String> del = Arrays.asList(delFiles);
                cnt = session.delete("board.delete_files", del);
                if(cnt != del.size()) throw new Exception();

                for(String f : del){
                    File file = new File( BoardController.uploadPath+f);
                    if(file.exists()) file.delete();
                }
            }

            session.commit();
            msg = "수정 잘 됨";

        }catch(Exception ex){
            session.rollback();
            msg = "저장 중 오류 발생";

            // 이미 업로드된 파일 삭제
            List<String> delList = new ArrayList<>();
            for(BoardAtt att : attFiles){
                delList.add(att.getSysFile());
            }
            for(String f : delList){
                File file = new File( BoardController.uploadPath+f);
                if(file.exists()) file.delete();
            }
        }
      
        session.close();
        return msg;

    }    



    public String deleteR(Integer sno){
        String msg = null;
        session = new MyFactory().getSession();

        try{
            // board 삭제
            int cnt = session.delete("board.delete_board", sno);
            if(cnt<=0) throw new Exception();

            // 삭제할 파일 가져오기
            List<String> delFiles = session.selectList("board.select_delfiles", sno);
            
            // boardAtt 삭제
            if(delFiles.size()>0){
                cnt = session.delete("board.delete_boardAtt", sno);
                if(cnt <=0) throw new Exception();

                for(String f : delFiles){
                    File file = new File(BoardController.uploadPath + f);
                    if(file.exists()) file.delete();
                }
            }                

            msg = "삭제 잘됨.";
            session.commit();

        }catch(Exception ex){
            msg = "삭제중 오류 발생";
            session.rollback();
        }

        session.close();
        return msg;
    }

    public String replR(BoardVo vo, List<BoardAtt> attFiles){
        String msg = "정상처리됨";
        session = new MyFactory().getSession();

        try{
            vo.setPSno(vo.getSno());

            int sno = session.selectOne("board.getSerial");
            vo.setSno(sno);

            // seq값 증가
            session.update("board.seq_up", vo);
            vo.setSeq(vo.getSeq()+1);
            vo.setDeep(vo.getDeep()+1);

            int cnt = session.insert("board.register", vo);
            if(cnt<=0) throw new Exception();

            if(attFiles.size()>0){
                Map<String, Object> map = new HashMap<>();
                map.put("pSno", sno);
                map.put("attFiles", attFiles);
                cnt = session.insert("board.registerAtt", map);
                if(cnt<=0) throw new Exception();
                
            }

            session.commit();
        }catch(Exception ex){

            // 이미 업로드된 파일 삭제
            if(attFiles.size()>0){
                List<String> delList = new ArrayList<>();
                for(BoardAtt att : attFiles){
                    delList.add(att.getSysFile());
                }
                for(String f : delList){
                    File file = new File( BoardController.uploadPath+f);
                    if(file.exists()) file.delete();
                }
            }

            session.rollback();
            msg = "저장 중 오류 발생";

        }

        session.close();
        return msg;

    }
    

}
