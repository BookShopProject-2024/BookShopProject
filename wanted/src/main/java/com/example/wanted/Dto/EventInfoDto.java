package com.example.wanted.Dto;

import java.time.LocalDateTime;

import lombok.Getter;

@Getter
public class EventInfoDto {
	private String eventName;
	private String eventType;
	private String imageLocation;
	private String description;
	private LocalDateTime eventStartDate;
	private LocalDateTime eventEndDate;
}
