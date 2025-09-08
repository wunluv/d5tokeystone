<?php
// $Id: print_pdf.class.inc,v 1.1.4.2.2.1 2009/07/09 11:59:30 jcnventura Exp $

/**
 * @file
 * Extend the TCPDF class to be able to customize the Footer
 *
 * This file is included by the _print_pdf_tcpdf function
 *
 * @ingroup print
 */

class PrintTCPDF extends TCPDF {
  public $footer;

  //Page footer data
  public function SetFooterData($arg = '') {
    $this->footer = $arg;
  }

  //Page footer
  public function Footer() {
    theme('print_pdf_tcpdf_footer2', $this);
  }
}
