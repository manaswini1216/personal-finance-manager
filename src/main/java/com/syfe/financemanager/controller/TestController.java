package com.syfe.financemanager.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
public class TestController {

    @GetMapping("/")
    public String test() {
        return "Finance Manager API Running";
    }
}
