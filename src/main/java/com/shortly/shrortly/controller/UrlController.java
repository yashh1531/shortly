package com.shortly.shrortly.controller;

import org.springframework.web.bind.annotation.CrossOrigin;

import com.shortly.shrortly.dto.CreateUrlRequest;
import com.shortly.shrortly.dto.ShortUrlResponse;
import com.shortly.shrortly.entity.Url;
import com.shortly.shrortly.service.UrlService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/urls")
public class UrlController {


    private final UrlService urlService;

    public UrlController(UrlService urlService) {
        this.urlService = urlService;
    }

    @PostMapping
    public ResponseEntity<ShortUrlResponse> createShortUrl(
            @Valid @RequestBody CreateUrlRequest request
    ) {

        Url url = urlService.createShortUrl(
                request.getOriginalUrl()
        );

        String shortUrl =
                "http://localhost:8080/" + url.getShortCode();

        ShortUrlResponse response = new ShortUrlResponse(
                url.getShortCode(),
                shortUrl,
                url.getOriginalUrl(),
                url.getExpiresAt().toString()
        );

        return ResponseEntity.ok(response);
    }

}
