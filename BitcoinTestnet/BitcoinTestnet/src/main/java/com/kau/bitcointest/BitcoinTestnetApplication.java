package com.kau.bitcointest;
/**
 * Developer Jaewook Lim (Korea Aerospace Univ.)
 * 
 * 
 */
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
@SpringBootApplication
public class BitcoinTestnetApplication extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		// TODO Auto-generated method stub
		return builder.sources(BitcoinTestnetApplication.class);
	}
	
	public static void main(String[] args) {
		SpringApplication.run(BitcoinTestnetApplication.class, args);
	}
}
