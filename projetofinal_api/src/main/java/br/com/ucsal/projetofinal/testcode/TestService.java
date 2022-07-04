package br.com.ucsal.projetofinal.testcode;

import lombok.Data;
import lombok.extern.java.Log;
import org.springframework.stereotype.Service;

@Log
@Service
public class TestService {


    public TestResult executetest(String codigo, String filename, String folder, String[] inputs, String[] outputs){

        CodeExecutor codeExecutor = CodeExecutor.builder().codigo(codigo).
                compileCommand("javac").
                executeCommand("java").
                filename(filename).
                folder(folder)
                .inputs(inputs)
                .outputs(outputs)
                .build();

        return   codeExecutor.runTests();
    }




}
