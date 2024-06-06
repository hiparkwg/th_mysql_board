package com.myjob.board;

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
        String msg = "정상처리됨";
        session = new MyFactory().getSession();

        int sno = session.selectOne("board.getSerial");
        vo.setSno(sno);
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
}
