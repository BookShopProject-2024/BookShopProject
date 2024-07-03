package com.example.wanted.config;

import java.io.IOException;

import org.redisson.Redisson;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RedissonConfig {

	@Value("${redisson.config}")
	private String RedissonConfig;

	@Bean(destroyMethod = "shutdown")
	public RedissonClient redisson() throws IOException {
		Config config = Config.fromYAML(RedissonConfig);
		return Redisson.create();
	}
}
