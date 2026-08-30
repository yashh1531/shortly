package com.shortly.shrortly.service;

import com.shortly.shrortly.entity.Url;
import com.shortly.shrortly.repository.UrlRepository;
import com.shortly.shrortly.util.Base62;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;

import com.shortly.shrortly.exception.ShortUrlExpiredException;
import com.shortly.shrortly.exception.ShortUrlNotFoundException;

import java.time.LocalDateTime;
import java.time.Duration;

@Service
public class UrlService {

    private final UrlRepository urlRepository;
    private final RedisService redisService;

    @PersistenceContext
    private EntityManager entityManager;

    public UrlService(
            UrlRepository urlRepository,
            RedisService redisService
    ) {
        this.urlRepository = urlRepository;
        this.redisService = redisService;
    }
    public Url createShortUrl(String originalUrl) {

        // 1. Get a unique ID from PostgreSQL sequence
        Long id = ((Number) entityManager
                .createNativeQuery("SELECT nextval('url_id_seq')")
                .getSingleResult())
                .longValue();

        // 2. Convert ID to a 6-character Base62 code
        String shortCode =
                Base62.encodeToSixCharacters(id);

        // 3. Create the URL entity
        Url url = new Url();

        url.setId(id);
        url.setShortCode(shortCode);
        url.setOriginalUrl(originalUrl);
        url.setCreatedAt(LocalDateTime.now());
        url.setExpiresAt(LocalDateTime.now().plusMonths(6));

        // 4. Save the complete entity in ONE INSERT
        return urlRepository.save(url);
    }
    public Url getUrlByShortCode(String shortCode) {

        // 1. Check Redis first
        String cachedUrl = redisService.getUrl(shortCode);

        if (cachedUrl != null) {

            Url url = new Url();

            url.setShortCode(shortCode);
            url.setOriginalUrl(cachedUrl);

            return url;
        }

        // 2. Cache miss → query PostgreSQL
        Url url = urlRepository.findByShortCode(shortCode)
                .orElseThrow(() ->
                        new ShortUrlNotFoundException(
                                "Short URL not found"
                        ));

        // 3. Check expiry
        if (url.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new ShortUrlExpiredException(
                    "Short URL has expired"
            );
        }

        // 4. Put valid URL into Redis
        Duration ttl = Duration.between(
                LocalDateTime.now(),
                url.getExpiresAt()
        );

        redisService.saveUrl(
                shortCode,
                url.getOriginalUrl(),
                ttl
        );

        // 5. Return URL
        return url;
    }
}