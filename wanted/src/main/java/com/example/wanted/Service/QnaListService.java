package com.example.wanted.Service;

import com.example.wanted.Dao.QnaInfoDao;
import com.example.wanted.Vo.QnaInfores;
import io.micrometer.core.instrument.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QnaListService {

    @Autowired
    private QnaInfoDao qnaInfoDao;

    private QnaInfores qnaInfores;

    //WebSecurityConfig에서 Bean으로 생성된 의존성을 주입받음
    private final PasswordEncoder passwordEncoder;
    
    private static final Logger logger = LoggerFactory.getLogger(QnaListService.class);


    public List<QnaInfores> findAllQnaInfo(int page,int size) {
        //JPA로 Paging 및 orderby를 지원하는 Pageable
        Pageable pageable = PageRequest.of(page,size,Sort.by(Sort.Order.desc("qnaId")));
        Page<QnaInfores> result = qnaInfoDao.findAll(pageable);
        return  result.getContent();
    }

    public String saveqnaContent(HashMap<String, String> params) {
        qnaInfores = new QnaInfores();
        qnaInfores.setTitle(params.get("Title"));
        qnaInfores.setContent(params.get("Content"));
        qnaInfores.setWriter(params.get("Writer"));
        if(StringUtils.isNotEmpty(params.get("Password"))){
            qnaInfores.setPassWord(passwordEncoder.encode(params.get("Password")));
        }else{
            qnaInfores.setPassWord(params.get("Password"));
        }

        return String.valueOf(qnaInfoDao.save(qnaInfores));
    }

    public boolean matchPassword(HashMap<String, String> params) {

        String password = params.get("Password");
        QnaInfores qnaInfores = new QnaInfores();
        qnaInfores.setQnaId((long) Integer.parseInt(params.get("qnaId")));

        Optional<QnaInfores> resp = qnaInfoDao.findById(qnaInfores.getQnaId());
        return passwordEncoder.matches(password, resp.get().getPassWord());
    }
}
