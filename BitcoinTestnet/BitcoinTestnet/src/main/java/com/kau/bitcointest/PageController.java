package com.kau.bitcointest;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@EnableAutoConfiguration
public class PageController {
	@RequestMapping("page/index")
	public String pageIndex() {
		return "index";
	}
	@RequestMapping("page/bitcointest")
	public String pageBitcointest() {
		return "bitcoin_test/bitcoin_cli";
	}
}
