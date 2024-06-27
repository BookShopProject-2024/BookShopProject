package com.example.wanted.Controller;

import com.example.wanted.Service.LoginService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

//Controller 선언
@Controller
@RequiredArgsConstructor
public class loginController {
    private static final Logger logger = LoggerFactory.getLogger(loginController.class);

    @Autowired
    private LoginService loginService;

    @RequestMapping(value="/customer/login",method = RequestMethod.POST)
    @ResponseBody
    public boolean login(@RequestBody HashMap<String,String> params){
        logger.info("Login");

        return loginService.matchUserPassWord(params);
    }

    @RequestMapping(value="/info/signUp",method = RequestMethod.POST)
    @ResponseBody
    public boolean signUp(@RequestBody HashMap<String,String> params){
        logger.info("signUp");

        return loginService.saveUserInfo(params);
    }


    
}
