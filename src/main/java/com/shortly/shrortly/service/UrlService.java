package com.shortly.shrortly.service;

import com.shortly.shrortly.entity.Url;
import com.shortly.shrortly.repository.UrlRepository;
import com.shortly.shrortly.util.Base62;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UrlService {

    private final UrlRepository urlRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public UrlService(UrlRepository urlRepository) {
        this.urlRepository = urlRepository;
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

        return urlRepository.findByShortCode(shortCode)
                .orElseThrow(() ->
                        new RuntimeException("Short URL not found"));
    }
}