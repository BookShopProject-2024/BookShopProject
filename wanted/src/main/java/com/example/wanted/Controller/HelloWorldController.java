package com.example.wanted.Controller;

import com.example.wanted.Service.WantedMainService;
import com.example.wanted.Vo.SlideInfores;
import com.example.wanted.Vo.UserInfores;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
;

@Controller
@RequiredArgsConstructor
public class HelloWorldController {

    private static final Logger logger = LoggerFactory.getLogger(HelloWorldController.class);

    @Autowired
    private WantedMainService wantedMainService;

    @RequestMapping(value = "/info/slideList/")
    @ResponseBody
    public List<SlideInfores> getSlideList() {
        logger.info("getSlideList");

        return wantedMainService.findSlideListInfo();
    }


}
