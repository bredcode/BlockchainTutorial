/**
 * Developer Jaewook Lim (Korea Aerospace Univ.)
 * 
 * url과 맵핑되는 명령어를 key로 지정.
 *  comment : 명령어에 대한 설명
 *  options : 필요한 파라미터를 배열에 추가.
 *  params : 서버로 넘길 때 사용될 파라미터 이름을 배열에 추가. (options와 매칭되어야함.)
 */
var CMD_FACTORY = {
    getblockcount : {
        comment: "블록 개수를 확인",
        params: []
    },
    getblockhash : {
        comment: "블록 해쉬를 조회<br><p style='color:gray'>(블록 개수보다 작거나 같은 수를 입력하세요.)</p>",
        options: ["확인할 블록 번호"],
        params: ["block_num"]
    },
    getblock : {
        comment: "블록 해쉬를 통해 블록 정보 확인<br><p style='color:gray'>(블록 해쉬를 먼저 조회해주세요.)</p>",
        options: ["확인할 블록의 해쉬"],
        params: ["block_hash"]
    },
    getnewaddress : {
        comment: "새로운 지갑 주소를 생성",
        options: ["지갑 이름"],
        params: ["name"]
    },
    getaddressinfo : {
        comment: "지갑 정보를 확인",
        options: ["지갑 주소"],
        params: ["address"]
    },
    listunspent : {
        comment: "특정 지갑주소의 잔액(UTXO)을 조회",
        options: ["지갑 주소"],
        params: ["addresses"]//addresses는 배열로 보낼 것
    },
    getbalance : {
        comment: "내 노드의 전체 잔액 조회",
        params: []
    },
    sendtoaddress : {
        comment: "특정 계좌로 송금<p style='color:gray'>(보내고 싶은 주소정보를 \"모든 노드 정보보기\"를 통해 확인하세요.)<br>*반환되는 값은 tx id 입니다.*</p>",
        options: ["보낼 계좌 주소","보낼 BTC"],
        params: ["to_address","btc"]
    },
    gettransaction : {
        comment: "transaction 정보를 조회",
        options: ["transaction id (txid)"],
        params: ["txid"]
    },
    getrawtransaction : {
        comment: "raw transaction 정보를 조회<p style='color:gray'>(raw transaction값은 hex값이 반환 됩니다.)</p>",
        options: ["transaction id (txid)"],
        params: ["txid"]
    },
    decoderawtransaction : {
        comment: "raw transaction의 hex 값을 디코드하여 정보 확인<p style='color:gray'>(transaction 혹은 raw transaction 값을 조회하여 hex값을 입력해주세요.)</p>",
        options:["transaction의 hex 값"],
        params: ["tx_hash"]
    }
}