package com.example.wanted.Vo;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.example.wanted.Dto.EventInfoDto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@Table(name = "event_info")
@Getter
@NoArgsConstructor
public class EventInfoes extends BaseTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long eventId;

	@NonNull
	@Column(length = 100)
	private String eventName;

	@NonNull
	@Column(length=500)
	private String imgLocation;

	@NonNull
	@Column(length=20)
	private String eventType;

	@NonNull
	@Column(length=1000)
	private String description;

	@NonNull
	@DateTimeFormat(pattern = "yyyy-MM-dd/HH:mm:ss")
	private LocalDateTime eventStartDate;

	@NonNull
	@DateTimeFormat(pattern = "yyyy-MM-dd/HH:mm:ss")
	private LocalDateTime eventEndDate;

	// 만약 이벤트에 트래픽이 몰리는걸 방지하고자 서버를 분리하면
	// @Column(unique = false,length=60000)
	// private String eventLocation;

	public EventInfoes(EventInfoDto eventInfoDto) {
		this.eventName = eventInfoDto.getEventName();
		this.imgLocation = eventInfoDto.getImageLocation();
		this.eventType = eventInfoDto.getEventType();
		this.description = eventInfoDto.getDescription();
		this.eventStartDate = eventInfoDto.getEventStartDate();
		this.eventEndDate = eventInfoDto.getEventEndDate();
	}

	public void update(EventInfoDto eventInfoDto) {
		this.eventName = eventInfoDto.getEventName();
		this.imgLocation = eventInfoDto.getImageLocation();
		this.eventType = eventInfoDto.getEventType();
		this.description = eventInfoDto.getDescription();
		this.eventStartDate = eventInfoDto.getEventStartDate();
		this.eventEndDate = eventInfoDto.getEventEndDate();
	}
}
