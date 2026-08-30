package com.shortly.shrortly.service;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class RedisService {

    private final StringRedisTemplate redisTemplate;

    public RedisService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void saveUrl(String shortCode, String originalUrl, Duration ttl) {

        String key = "url:" + shortCode;

        redisTemplate.opsForValue().set(
                key,
                originalUrl,
                ttl
        );
    }

    public String getUrl(String shortCode) {

        String key = "url:" + shortCode;

        return redisTemplate.opsForValue().get(key);
    }
}