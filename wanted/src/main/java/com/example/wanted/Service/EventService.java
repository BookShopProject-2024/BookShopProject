package com.example.wanted.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.wanted.Dao.EventInfoDao;
import com.example.wanted.Dto.EventInfoDto;
import com.example.wanted.Vo.EventInfoes;

@Service
public class EventService {
	@Autowired
	private EventInfoDao eventInfoDao;
	private EventInfoDto eventInfoDto;

	private static final Logger logger = LoggerFactory.getLogger(BookListService.class);

	public List<EventInfoes> getAllEventInfoes() {
		return eventInfoDao.findAll();
	}

	public List<EventInfoes> getAvailableEventInfoes() {
		LocalDateTime now = LocalDateTime.now();
		return eventInfoDao.findByEventEndDateGreaterThanEqual(now);
	}

	@Transactional
	public String makeEvent(EventInfoDto eventInfoDto) {
		EventInfoes eventInfoes = new EventInfoes(eventInfoDto);
		eventInfoDao.save(eventInfoes);
		return eventInfoDto.getEventName();
	}

	@Transactional
	public String modifyEvent(Long EventId, EventInfoDto eventInfoDto) {
		EventInfoes eventInfoes = eventInfoDao.findById(EventId).orElseThrow(()-> new NoSuchElementException());
		eventInfoes.update(eventInfoDto);
		eventInfoDao.save(eventInfoes);
		
		return eventInfoDto.getEventName();
	}

	@Transactional
	public String deleteEvent(Long EventId) {
		EventInfoes eventInfoes = eventInfoDao.findById(EventId).orElseThrow(()-> new NoSuchElementException());
		eventInfoDao.delete(eventInfoes);
		return eventInfoDto.getEventName();
	}
}
