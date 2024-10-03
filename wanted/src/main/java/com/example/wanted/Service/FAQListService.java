package com.example.wanted.Service;

import com.example.wanted.Dao.FAQInfoDao;
import com.example.wanted.Vo.FAQInfoes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FAQListService {

    @Autowired
    private FAQInfoDao faqInfoDao;

    private static final Logger logger = LoggerFactory.getLogger(FAQListService.class);

    //모든 FAQList 조회 기능
    public List<FAQInfoes> findAllFAQList(){
        return faqInfoDao.findAll();

    }

    //특정 FAQList 조회
    public Optional<FAQInfoes> findOneFAQInfo(Long FAQId){
        return faqInfoDao.findById(FAQId);
    }

    // 새로운 FAQ 생성
    public FAQInfoes createFAQ(String title, String content, String language) {
        FAQInfoes faq = new FAQInfoes();
        faq.setTitle(title);
        faq.setContent(content);
        faq.setLanguage(language);

        logger.info("Creating new FAQ with title: " + title);

        return faqInfoDao.save(faq);
    }
}
