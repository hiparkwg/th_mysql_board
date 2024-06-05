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

    @RequestMapping(path="/register")
    public ModelAndView register(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("board/register");
        return mv;
    }


}
