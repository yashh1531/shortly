package com.shortly.shrortly.controller;

import com.shortly.shrortly.dto.CreateUrlRequest;
import com.shortly.shrortly.dto.ShortUrlResponse;
import com.shortly.shrortly.entity.Url;
import com.shortly.shrortly.service.UrlService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/urls")
public class UrlController {

    private final UrlService urlService;

    public UrlController(UrlService urlService) {
        this.urlService = urlService;
    }

    @PostMapping
    public ResponseEntity<ShortUrlResponse> createShortUrl(
            @RequestBody CreateUrlRequest request
    ) {

        Url url = urlService.createShortUrl(
                request.getOriginalUrl()
        );

        String shortUrl =
                "http://localhost:8080/" + url.getShortCode();

        ShortUrlResponse response = new ShortUrlResponse(
                url.getShortCode(),
                shortUrl,
                url.getOriginalUrl()
        );

        return ResponseEntity.ok(response);
    }

}
