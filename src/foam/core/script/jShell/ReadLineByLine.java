/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */
package foam.core.script.jShell;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.LinkedList;
import java.util.List;
import foam.lang.X;

import foam.util.SafetyUtil;
import foam.core.logger.Logger;
import jdk.jshell.JShell;

/**
 * Parse the code from a file and return a list of instruction
 *
 */
public class ReadLineByLine {
  protected List<String> lineScripts;
  public JShell          jShell;
  public List<String>    listInstruction;

  public ReadLineByLine(JShell jShell) {
    this.listInstruction = new LinkedList<String>();
    this.lineScripts = new LinkedList<>();
    this.jShell = jShell;
  }

  public List<String> ReadByLine(String initialScript, X x) {
    try {
      BufferedReader br = new BufferedReader(new FileReader(initialScript));
      for ( String scriptLine ; ( scriptLine = br.readLine() ) != null ; ) {
        if ( SafetyUtil.isEmpty(scriptLine.trim()) ) continue;
        this.lineScripts.add(scriptLine);
      }
      br.close();
    } catch (Exception e) {
      Logger logger = (Logger) x.get("logger");
      if ( logger == null ) {
        logger = foam.core.logger.StdoutLogger.instance();
      }
      logger.error(e);
    }
    return lineScripts;
  }
}
