package com.diti.core;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class DitiApplication {

	public static void main(String[] args) {
		SpringApplication.run(DitiApplication.class, args);
	}

}
