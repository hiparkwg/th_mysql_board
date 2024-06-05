package com.myjob.board;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class BoardController {
    
    @RequestMapping(path="/")
    public ModelAndView index(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("index");
        return mv;
    }
    @RequestMapping(path="/list")
    public ModelAndView list(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("board/list");
        return mv;
    }

    @RequestMapping(path="/view")
    public ModelAndView view(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("board/view");
        return mv;
    }

    @RequestMapping(path="/register")
    public ModelAndView register(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("board/register");
        return mv;
    }
    @RequestMapping(path="/registerR")
    public ModelAndView registerR(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("board/list");
        return mv;
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

}
