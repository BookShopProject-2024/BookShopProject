package com.example.wanted.Controller;

import com.example.wanted.Jwt.JwtTokenProvider;
import com.example.wanted.Service.LoginService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;

//Controller 선언
@Controller
@RequiredArgsConstructor
public class LoginController {
    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private LoginService loginService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @RequestMapping(value="/customer/matchLogin",method = RequestMethod.POST)
    @ResponseBody
    public boolean login(@RequestBody HashMap<String,String> params, HttpServletRequest request){
        logger.info("Login");
        boolean matchLogin = loginService.matchUserPassWord(params);
        if(matchLogin){
            HttpSession session  = request.getSession();
            session.setAttribute("userId",params.get("userId"));
        }
        return matchLogin;
    }

    @RequestMapping(value="/info/signUp",method = RequestMethod.POST)
    @ResponseBody
    public String signUp(@RequestBody HashMap<String,String> params){
        logger.info("signUp");

        return loginService.saveUserInfo(params);
    }


    
}
