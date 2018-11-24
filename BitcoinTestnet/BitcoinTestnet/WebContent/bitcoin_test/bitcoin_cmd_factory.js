var CMD_FACTORY = {
    getblockcount : {
        comment: "블록 개수를 확인"
    },
    getblockhash : {
        comment: "블록 해쉬를 조회",
        options: ["확인할 블록 번호"]
    },
    getblock : {
        comment: "블록 해쉬를 통해 블록 정보 확인",
        options: ["확인할 블록의 해쉬"]
    },
    getnewaddress : {
        comment: "새로운 지갑 주소를 생성",
        options: ["임의의 지갑 이름"]
    },
    getaddressinfo : {
        comment: "지갑 정보를 확인",
        options: ["지갑 주소"]
    },
    listunspent : {
        comment: "특정 지갑주소의 잔액(UTXO)을 조회",
        options: ["지갑 주소"]
    },
    getbalance : {
        comment: "내 노드의 전체 잔액 조회",
    },
    sendtoaddress : {
        comment: "특정 계좌로 송금",
        options: ["보낼 계좌 주소","보낼 BTC"]
    },
    gettransaction : {
        comment: "transaction 정보를 조회",
        options: ["transaction id (txid)"]
    },
    getrawtransaction : {
        comment: "raw transaction 정보를 조회",
        options: ["transaction id (txid)"]
    },
    decoderawtransaction : {
        comment: "raw transaction의 hex 값을 디코드하여 정보 확인",
        options:["transaction의 hex 값"]
    }
}