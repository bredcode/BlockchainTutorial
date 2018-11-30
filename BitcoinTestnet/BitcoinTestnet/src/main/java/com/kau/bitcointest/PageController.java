package com.kau.bitcointest;
/**
 * Developer Jaewook Lim (Korea Aerospace Univ.)
 * 
 * 
 */
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@EnableAutoConfiguration
public class PageController {
	@RequestMapping("page/manager")
	public String pageIndex() {
		return "manager/manager";
	}
	@RequestMapping("page/bitcointest")
	public String pageBitcointest() {
		return "bitcoin_test/bitcoin_cli";
	}
}
