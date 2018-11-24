package com.kau.bitcointest.node;

public class Network implements NodeInterface{
	private String rpcuser;
	private String rpcpassword;
	private Integer port;
	private Integer rpcport;
	private String id;
	
	public Network(String id, String rpcuser, String rpcpassword, Integer port, Integer rpcport) {
		// TODO Auto-generated constructor stub
		this.id = id;
		this.rpcuser = rpcuser;
		this.rpcpassword = rpcpassword;
		this.port = port;
		this.rpcport = rpcport;
	}
	
	public String serverStartOption(String basedir) {
		return "-rpcuser="+rpcuser
				+ " -rpcpassword="+rpcpassword
				+ " -port="+port
				+ " -rpcport="+rpcport
				+ " -datadir="+basedir+id
				+ " -daemon -deprecatedrpc=generate";
	}
	@Override
	public String cliOption(String basedir) {
		// TODO Auto-generated method stub
		return "-datadir="+basedir+id
				+ " -rpcport="+rpcport
				+ " -rpcuser="+rpcuser
				+ " -rpcpassword="+rpcpassword;
	}
	
	public Integer getPort() {
		return port;
	}
	
	@Override
	public String getClientId() {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public void setClientId(String client_id) {
		// TODO Auto-generated method stub
		
	}
}
