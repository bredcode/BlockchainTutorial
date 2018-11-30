package com.kau.bitcointest.terminal;
/**
 * Developer Jaewook Lim (Korea Aerospace Univ.)
 * 
 * 
 */
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class CommandUtils {
	/**
     * cmd 명령어 실행
     *
     * @param cmd
     */
    public static String execute(String cmd) {
        Process process = null;
        Runtime runtime = Runtime.getRuntime();
        StringBuffer successOutput = new StringBuffer(); // 성공 스트링 버퍼
        StringBuffer errorOutput = new StringBuffer(); // 오류 스트링 버퍼
        BufferedReader successBufferReader = null; // 성공 버퍼
        BufferedReader errorBufferReader = null; // 오류 버퍼
        String msg = null; // 메시지
        String result_str = null;
        List<String> cmdList = new ArrayList<String>();
 
        // 운영체제 구분 (window, window 가 아니면 무조건 linux 로 판단)
        if (System.getProperty("os.name").indexOf("Windows") > -1) {
            cmdList.add("cmd");
            cmdList.add("/c");
        } else {
            cmdList.add("/bin/bash");
            cmdList.add("-c");
        }
        // 명령어 셋팅
        cmdList.add(cmd);
        String[] array = cmdList.toArray(new String[cmdList.size()]);
 
        try {
 
        		String path = System.getenv("PATH");
            System.out.println("path = [" + path + "]");
            String[] e = new String[1];
            e[0] = "PAHT="+path; // 두번째 인자로는 환경변수 설정이 들어감. 여기서는 PATH=... 만 설정
            // 명령어 실행
            process = runtime.exec(array,e);
            
            // shell 실행이 정상 동작했을 경우
            successBufferReader = new BufferedReader(new InputStreamReader(process.getInputStream(), "EUC-KR"));
 
            while ((msg = successBufferReader.readLine()) != null) {
                successOutput.append(msg + System.getProperty("line.separator"));
            }
 
            // shell 실행시 에러가 발생했을 경우
            errorBufferReader = new BufferedReader(new InputStreamReader(process.getErrorStream(), "EUC-KR"));
            while ((msg = errorBufferReader.readLine()) != null) {
                errorOutput.append(msg + System.getProperty("line.separator"));
            }
 
            // 프로세스의 수행이 끝날때까지 대기
            process.waitFor();
 
            // shell 실행이 정상 종료되었을 경우
            if (process.exitValue() == 0) {
                System.out.println("성공");
                System.out.println(successOutput.toString());
                result_str = successOutput.toString();
                
            } else {
                // shell 실행이 비정상 종료되었을 경우
                System.out.println("비정상 종료");
                System.out.println(errorOutput.toString());
//                result_str = errorOutput.toString();
            }
 
            // shell 실행시 에러가 발생
            if (errorOutput.toString().length()>0) {
                // shell 실행이 비정상 종료되었을 경우
                System.out.println("오류");
                System.out.println(errorOutput.toString());
            }
 
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            try {
                process.destroy();
                if (successBufferReader != null) successBufferReader.close();
                if (errorBufferReader != null) errorBufferReader.close();
            } catch (IOException e1) {
                e1.printStackTrace();
            }
        }
        return result_str;
    }

}
