package com.example.wanted.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.wanted.Dto.EventInfoDto;
import com.example.wanted.Service.EventService;
import com.example.wanted.Vo.EventInfoes;

@RestController
@RequestMapping("/info/events")
public class EventController {

	@Autowired
	private EventService eventService;

	@GetMapping
	public ResponseEntity<List<EventInfoes>> getAllEvents() {
		List<EventInfoes> events = eventService.getAllEventInfoes();
		return ResponseEntity.ok(events);
	}

	@GetMapping("/available")
	public ResponseEntity<List<EventInfoes>> getAvailableEvents() {
		List<EventInfoes> availableEvents = eventService.getAvailableEventInfoes();
		return ResponseEntity.ok(availableEvents);
	}

	@GetMapping("/popup")
	public ResponseEntity<List<EventInfoes>> getAvailableEventsPage(@RequestParam int page, @RequestParam int size) {
		List<EventInfoes> availableEvents = eventService.getAvailableEventPage(page, size);
		return ResponseEntity.ok(availableEvents);
	}

	@GetMapping("/{id}")
	public ResponseEntity<EventInfoes> getEventById(@PathVariable Long id) {
		EventInfoes eventInfoes = eventService.getEventInfoById(id);
		return ResponseEntity.ok(eventInfoes);
	}

	@PostMapping
	public ResponseEntity<String> createEvent(@RequestBody EventInfoDto eventInfoDto) {
		String eventName = eventService.makeEvent(eventInfoDto);
		return ResponseEntity.ok(eventName);
	}

	@PutMapping("/{eventId}")
	public ResponseEntity<String> updateEvent(@PathVariable Long eventId, @RequestBody EventInfoDto eventInfoDto) {
		String eventName = eventService.modifyEvent(eventId, eventInfoDto);
		return ResponseEntity.ok(eventName);
	}

	@DeleteMapping("/{eventId}")
	public ResponseEntity<String> deleteEvent(@PathVariable Long eventId) {
		String eventName = eventService.deleteEvent(eventId);
		return ResponseEntity.ok(eventName);
	}
}