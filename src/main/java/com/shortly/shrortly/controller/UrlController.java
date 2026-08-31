package com.shortly.shrortly.controller;

import com.shortly.shrortly.dto.CreateUrlRequest;
import com.shortly.shrortly.dto.ShortUrlResponse;
import com.shortly.shrortly.entity.Url;
import com.shortly.shrortly.service.RateLimitService;
import com.shortly.shrortly.service.UrlService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/urls")
public class UrlController {

    private final UrlService urlService;
    private final RateLimitService rateLimitService;
    private final String baseUrl;

    public UrlController(
            UrlService urlService,
            RateLimitService rateLimitService,
            @Value("${app.base-url}") String baseUrl
    ) {
        this.urlService = urlService;
        this.rateLimitService = rateLimitService;
        this.baseUrl = baseUrl;
    }

    @PostMapping
    public ResponseEntity<ShortUrlResponse> createShortUrl(
            @Valid @RequestBody CreateUrlRequest request,
            HttpServletRequest httpRequest
    ) {

        String clientIp = httpRequest.getRemoteAddr();

        rateLimitService.checkRateLimit(clientIp);

        Url url = urlService.createShortUrl(
                request.getOriginalUrl()
        );

        String shortUrl =
                baseUrl + "/" + url.getShortCode();

        ShortUrlResponse response = new ShortUrlResponse(
                url.getShortCode(),
                shortUrl,
                url.getOriginalUrl(),
                url.getExpiresAt().toString()
        );

        return ResponseEntity.ok(response);
    }
}