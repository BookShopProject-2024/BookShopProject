package com.example.wanted.Controller;

import com.example.wanted.Service.FAQListService;
import com.example.wanted.Vo.FAQInfoes;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class FAQController {
    private static final Logger logger = LoggerFactory.getLogger(FAQController.class);

    @Autowired
    private FAQListService faqListService;

    @RequestMapping(value = "/info/faqList", method = RequestMethod.GET)
    @ResponseBody
    public List<FAQInfoes> getFAQList() {
        logger.info("FAQList");
        return faqListService.findAllFAQList();
    }

    @RequestMapping(value = "/info/faqList/faqDetail", method = RequestMethod.GET)
    @ResponseBody
    public Optional<FAQInfoes> getFAQInfo(@RequestParam(value = "faqId") Long FAQId) {
        logger.info("faqDetail " + FAQId);
        return faqListService.findOneFAQInfo(FAQId);
    }

    @RequestMapping(value = "/info/faqList/create", method = RequestMethod.POST)
    public FAQInfoes createFAQ(
            @RequestParam(value = "title") String title,
            @RequestParam(value = "content") String content,
            @RequestParam(value = "language") String language) {

        logger.info("Creating new FAQ with title: " + title);
        return faqListService.createFAQ(title, content, language);
    }
}