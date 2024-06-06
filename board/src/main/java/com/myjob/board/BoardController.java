package com.myjob.board;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class BoardController {
    
    @Autowired
    BoardDao dao;

    String uploadPath = "C:\\myjob\\th_mysql_board\\board\\src\\main\\resources\\static\\upload\\";

    @RequestMapping(path="/")
    public ModelAndView index(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("index");
        return mv;
    }
    @RequestMapping(path="/list")
    public ModelAndView list(Page page ){

        System.out.println("ctrl : " + page);

        ModelAndView mv = new ModelAndView();
        Map<String, Object> map = dao.list(page);
        mv.addObject("map", map);
        mv.setViewName("board/list");
        return mv;
    }

    @RequestMapping(path="/view")
    public ModelAndView view(Integer sno){
        ModelAndView mv = new ModelAndView();
        Map map = dao.view(sno);
        mv.addObject("attFiles", map.get("attFiles"));
        mv.addObject("vo", map.get("vo"));
        mv.setViewName("board/view");
        return mv;
    }

    @RequestMapping(path="/register")
    public ModelAndView register(
                                ){
        ModelAndView mv = new ModelAndView();
      
        mv.setViewName("board/register");
        return mv;
    }

    @RequestMapping(path="/registerR")
    public String registerR(@ModelAttribute BoardVo vo,
                                  @RequestParam("files") List<MultipartFile> files){

        String msg = "OK...";
        UUID uuid = null;
        String sysFile = "";
        List<BoardAtt> attFiles = new ArrayList<>();
        
        for(MultipartFile f : files){
            if(f.getOriginalFilename().equals("")) continue;
            uuid = UUID.randomUUID();
            sysFile = String.format("%s-%s", uuid, f.getOriginalFilename());
            File saveFile = new File(uploadPath + sysFile);
            try{
                f.transferTo(saveFile);
            }catch(Exception ex){
                ex.printStackTrace();
            }

            BoardAtt att = new BoardAtt();
            att.setOriFile(f.getOriginalFilename());
            att.setSysFile(sysFile);
            attFiles.add(att);

        }
        msg = dao.registerR(vo, attFiles);
        
        return msg;
    }

    @RequestMapping(path="/update")
    public ModelAndView update(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("board/update");
        return mv;
    }

    @RequestMapping(path="/updateR")
    public ModelAndView updateR(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("board/list");
        return mv;
    }

    @RequestMapping(path="/deleteR")
    public ModelAndView deleteR(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("board/list");
        return mv;
    }


    @RequestMapping(path="/repl")
    public ModelAndView repl(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("board/repl");
        return mv;
    }

    @RequestMapping(path="/replR")
    public ModelAndView replR(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("board/list");
        return mv;
    }


}
