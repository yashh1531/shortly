package com.shortly.shrortly.service;

import com.shortly.shrortly.exception.RateLimitExceededException;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class RateLimitService {

    private static final int MAX_REQUESTS = 10;
    private static final Duration WINDOW = Duration.ofMinutes(1);

    private final StringRedisTemplate redisTemplate;

    public RateLimitService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void checkRateLimit(String clientIp) {

        String key = "rate_limit:" + clientIp;

        Long requests = redisTemplate.opsForValue().increment(key);

        if (requests == null) {
            throw new IllegalStateException("Unable to check rate limit");
        }

        if (requests == 1) {
            redisTemplate.expire(key, WINDOW);
        }

        if (requests > MAX_REQUESTS) {
            throw new RateLimitExceededException(
                    "Rate limit exceeded. Please try again later."
            );
        }
    }
}