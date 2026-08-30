package com.shortly.shrortly.service;

import com.shortly.shrortly.entity.Url;
import com.shortly.shrortly.repository.UrlRepository;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Optional;
import com.shortly.shrortly.exception.ShortUrlNotFoundException;
import com.shortly.shrortly.exception.ShortUrlExpiredException;

class UrlServiceTest {

    @Test
    void shouldReturnCachedUrlFromRedis() {

        UrlRepository urlRepository = mock(UrlRepository.class);
        RedisService redisService = mock(RedisService.class);

        when(redisService.getUrl("000005"))
                .thenReturn("https://www.google.com");

        UrlService urlService =
                new UrlService(urlRepository, redisService);

        Url result =
                urlService.getUrlByShortCode("000005");

        assertEquals(
                "https://www.google.com",
                result.getOriginalUrl()
        );

        verify(redisService).getUrl("000005");

        verifyNoInteractions(urlRepository);
    }

    @Test
    void shouldFetchFromDatabaseAndCacheWhenRedisMisses() {

        UrlRepository urlRepository = mock(UrlRepository.class);
        RedisService redisService = mock(RedisService.class);

        Url url = new Url();

        url.setShortCode("000007");
        url.setOriginalUrl("https://example.com");
        url.setCreatedAt(LocalDateTime.now());
        url.setExpiresAt(LocalDateTime.now().plusMonths(6));

        when(redisService.getUrl("000007"))
                .thenReturn(null);

        when(urlRepository.findByShortCode("000007"))
                .thenReturn(Optional.of(url));

        UrlService urlService =
                new UrlService(urlRepository, redisService);

        Url result =
                urlService.getUrlByShortCode("000007");

        assertEquals(
                "https://example.com",
                result.getOriginalUrl()
        );

        verify(redisService).getUrl("000007");

        verify(urlRepository).findByShortCode("000007");

        verify(redisService).saveUrl(
                eq("000007"),
                eq("https://example.com"),
                any(Duration.class)
        );
    }

    @Test
    void shouldThrowNotFoundWhenShortCodeDoesNotExist() {

        UrlRepository urlRepository = mock(UrlRepository.class);
        RedisService redisService = mock(RedisService.class);

        when(redisService.getUrl("999999"))
                .thenReturn(null);

        when(urlRepository.findByShortCode("999999"))
                .thenReturn(Optional.empty());

        UrlService urlService =
                new UrlService(urlRepository, redisService);

        assertThrows(
                ShortUrlNotFoundException.class,
                () -> urlService.getUrlByShortCode("999999")
        );

        verify(redisService).getUrl("999999");
        verify(urlRepository).findByShortCode("999999");
    }

    @Test
    void shouldThrowExpiredWhenUrlHasExpired() {

        UrlRepository urlRepository = mock(UrlRepository.class);
        RedisService redisService = mock(RedisService.class);

        Url url = new Url();

        url.setShortCode("000006");
        url.setOriginalUrl("https://expired.com");
        url.setCreatedAt(LocalDateTime.now().minusMonths(7));
        url.setExpiresAt(LocalDateTime.now().minusDays(1));

        when(redisService.getUrl("000006"))
                .thenReturn(null);

        when(urlRepository.findByShortCode("000006"))
                .thenReturn(Optional.of(url));

        UrlService urlService =
                new UrlService(urlRepository, redisService);

        assertThrows(
                ShortUrlExpiredException.class,
                () -> urlService.getUrlByShortCode("000006")
        );

        verify(redisService).getUrl("000006");
        verify(urlRepository).findByShortCode("000006");

        verify(redisService, never()).saveUrl(
                anyString(),
                anyString(),
                any(Duration.class)
        );
    }
}