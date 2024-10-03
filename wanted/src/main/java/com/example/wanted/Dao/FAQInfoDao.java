package com.example.wanted.Dao;

import com.example.wanted.Vo.FAQInfoes;
import com.example.wanted.Vo.NoticeInfores;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FAQInfoDao extends JpaRepository<FAQInfoes,Long> {
}
