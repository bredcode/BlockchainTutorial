package com.kau.bitcointest.database;

import java.util.ArrayList;

import com.kau.bitcointest.node.NodeInterface;

public class BitcoinNodeDatabase {
	
	private static BitcoinNodeDatabase instance;
	
	private ArrayList<NodeInterface> nodes;
	
	public static BitcoinNodeDatabase getInstance() {
		if(instance==null) {
			instance = new BitcoinNodeDatabase();
		}
		return instance;
	}
	
	private BitcoinNodeDatabase() {
		// TODO Auto-generated constructor stub
		nodes = new ArrayList<>();
	}
	public ArrayList<NodeInterface> getNodeArray(){
		return nodes;
	}
}