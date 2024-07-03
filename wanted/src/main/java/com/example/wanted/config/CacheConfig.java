package com.example.wanted.config;

import org.redisson.api.RedissonClient;
import org.redisson.spring.cache.RedissonSpringCacheManager;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableCaching
public class CacheConfig {
	private final RedissonClient redissonClient;

	public CacheConfig(RedissonClient redissonClient) {
		this.redissonClient = redissonClient;
	}

	@Bean
	public CacheManager cacheManager() {
		return new RedissonSpringCacheManager(redissonClient);
	}
}
