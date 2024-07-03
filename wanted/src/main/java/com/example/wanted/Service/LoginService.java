package com.example.wanted.Service;

import com.example.wanted.Dao.UserDao;
import com.example.wanted.Vo.Authority;
import com.example.wanted.Vo.UserInfores;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;


@Service
@RequiredArgsConstructor
public class LoginService {

    @Autowired
    private UserDao userDao;
    private UserInfores userInfores;

    private final PasswordEncoder passwordEncoder;
    private static final Logger logger = LoggerFactory.getLogger(LoginService.class);

    public boolean matchUserPassWord(HashMap<String, String> params) {
        UserInfores resp = userDao.findByUserId(params.get("userId"));
        String password = params.get("password");

        return passwordEncoder.matches(password,resp.getPassWord());
    }

    public boolean saveUserInfo(HashMap<String, String> params) {
        userInfores = new UserInfores();
        userInfores.setUserId(params.get("userId"));
        userInfores.setPassWord(passwordEncoder.encode(params.get("password")));
        userInfores.setUserName(params.get("userName"));
//        userInfores.setTelNo(params.get("telNo"));
        userInfores.setEmail(params.get("email"));
  //      userInfores.setAddress(params.get("address"));
            userInfores.setAuthority(Authority.ROLE_USER);
        String resp = String.valueOf(userDao.save(userInfores));
        logger.info("결과:"+resp);

        return true;
    }
}
