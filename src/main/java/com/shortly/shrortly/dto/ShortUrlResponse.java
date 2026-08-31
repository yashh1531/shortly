package com.shortly.shrortly.dto;

public class ShortUrlResponse {

    private String shortCode;
    private String shortUrl;
    private String originalUrl;
    private String expiresAt;

    public ShortUrlResponse(
            String shortCode,
            String shortUrl,
            String originalUrl,
            String expiresAt
    ) {
        this.shortCode = shortCode;
        this.shortUrl = shortUrl;
        this.originalUrl = originalUrl;
        this.expiresAt = expiresAt;
    }

    public String getShortCode() {
        return shortCode;
    }

    public String getShortUrl() {
        return shortUrl;
    }

    public String getOriginalUrl() {
        return originalUrl;
    }

    public String getExpiresAt() {
        return expiresAt;
    }
}