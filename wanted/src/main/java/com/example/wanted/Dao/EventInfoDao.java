package com.example.wanted.Dao;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.wanted.Vo.EventInfoes;

@Repository
public interface EventInfoDao extends JpaRepository<EventInfoes,Long> {
	List<EventInfoes> findByEventEndDateGreaterThanEqual(LocalDateTime CurrentDate);
}