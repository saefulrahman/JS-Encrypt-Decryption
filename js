<HTML>
  <head>
    <title>JavaScript Encryption & Decryption</title>
  <style type='text/css'>
  code,kbd,pre,samp{ font-family: Menlo,Monaco,Consolas,"Courier New",monospace; font-size:0.9em }
code { padding:2px 4px; color:#c7254e; background-color:#f9f2f4; border-radius: 0.125em; }
pre { display:block; padding: 9.5px; margin:0 0 0.10px; font-size: 0.875em; line-height: 1.428;  color:#333; word-break:break-all; word-wrap:break-word; background-color: #efefef; border:1px solid #eee; border-radius:0.125em; } pre code{ padding:0; font-size:inherit; color:inherit; white-space:pre-wrap; background-color:transparent; border-radius:0; } pre { max-height: 32em; overflow: auto; }
  
.form-control { -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; display:block; width:100%; height: 34px; padding:6px 12px; font-size: 0.875em; line-height:1.42857143; color:#555; background-color:#fff; background-image:none; border:1px solid #ccc; border-radius: 0.125em; -webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075); -webkit-transition:border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s; -o-transition:border-color ease-in-out .15s, box-shadow ease-in-out .15s; transition:border-color ease-in-out .15s, box-shadow ease-in-out .15s} .form-control::-moz-placeholder { color:#999; opacity:1 } .form-control:-ms-input-placeholder {color:#999} .form-control::-webkit-input-placeholder{color:#999} .form-control::-ms-expand { background-color:transparent;border:0 } .form-control[disabled], .form-control[readonly], fieldset[disabled] .form-control { background-color:#eee; opacity:1 } .form-control[disabled], fieldset[disabled] .form-control{ cursor:not-allowed; } textarea.form-control { height:auto } label{ display:inline-block; max-width:100%; margin-bottom:5px; font-weight:700; font-size: 85%; } input[type=radio]{ margin:4px 0 0; margin-top:1px\9; line-height:normal; } input[type=file]{ display:block } input[type=range]{ display:block; width:100% } select[multiple], select[size] { height:auto } input[type=file]:focus, input[type=checkbox]:focus, input[type=radio]:focus { outline:5px auto -webkit-focus-ring-color; outline-offset:-2px; } input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill { background-color: rgba(0,0,0,.15); } .form-group { margin-bottom: 10px; } .checkbox>label { vertical-align:middle; font-weight:normal; } .checkbox>label>input { margin-right:8px; margin-top:-2px; vertical-align:middle; } @media screen and (-webkit-min-device-pixel-ratio:0){ input.form-control{ line-height:2.125em } } 
.input-group input { display: inline-block; margin:0; width:auto; }
.btn,.btn:link,.btn:visited { border-width:0; padding: 10px 16px; margin:8px; font-size:16px; display:inline-block; color: #333;  line-height:1; vertical-align:middle; text-shadow: 0 -1px 0 rgba(0,0,0,.35); -webkit-transition: .25s all ease; transition: .25s all ease; position:relative; outline:0; color:inherit; border-color: transparent;  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2); background-color:#fff; color: #2979FF; }
.btn:hover, .btn:focus,.btn:active { box-shadow: 0 3px 4px 0 rgba(0,0,0,0.14), 0 3px 6px 0 rgba(0,0,0,0.12), 0 5px 3px -4px rgba(0,0,0,0.2); color: #fff; background-color: #2962FF; }
.btn:before, .btn:after { content: normal; }
.btn .md-icons { vertical-align: top; margin:0 4px; font-size: inherit; }
.btn.btn-primary { color: #fff; background-color: #2979FF; }
.btn.btn-primary:hover,.btn.btn-primary:focus { color: #fff; background-color: #2962FF; }
.btn.btn-flat { background-color: transparent; opacity:.87; box-shadow:none; -webkit-box-shadow: none; }
.btn.btn-flat:hover, .btn.btn-flat:focus { box-shadow: none; opacity:1; background-color: transparent;  color: inherit; }
.btn.btn-flat.btn-primary { color: #2979FF; background-color: transparent; }
.btn.btn-flat.btn-primary:hover, .btn.btn-flat.btn-primary:focus { color:
  </style>
  </head>
  <body>
    <script type="text/javascript">
/*
This work is a derivative of Vincent Cheung .ca under GNU General Public License

These programs are free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.

These programs are distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
*/
var encoded = null;
var elementId = null;
function randomPassword(length) {
  var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  var pass = "";
  for(var i = 0; i < length; i++) {
    var index = Math.floor(Math.random() * 62);
    pass += chars.charAt(index);
  };
  return pass;
};
function encryptFormText() {
  if (document.key.text.value.length == 0) {
    alert("Please specify a key with which to encrypt the message.");
  return;
  };
  if(document.plain.text.value.length == 0) {
    alert("No plain text to encrypt!  Please enter or paste plain text in the field above.");
    return;
  };
  encoded = GibberishAES.enc(document.plain.text.value, document.key.text.value);
  document.cipher.text.value = encoded;
  // generate a random ID
  elementId = randomPassword(8);
    encoded = encoded.replace(/\n/g, '');
    genSampleCode();
};
function genSampleCode() {
  document.encryptedCode.text.value = "";
  var element = document.getElementById("encryptedTest");
  element.innerHTML = "";
  if (encoded == "" || encoded == null || elementId == "" || elementId == null)
   return;
  // standard sample code
  if (document.encryptedCode.codeType[0].checked) {
    var code1 = "<div id=\"" + elementId + "\" title=\"" + encoded + "\">";
    var code2 = "<a href=\"javascript:decryptText('" + elementId + "')\">Show encrypted text</a>";
    var code3 = '</div>';
    document.encryptedCode.text.value = code1 + "\n\t" + code2 + "\n" + code3;
    element.innerHTML = code1 + code2 + code3;
    // inline
  } else if (document.encryptedCode.codeType[1].checked) {
    var code1 = "<a href=\"javascript:decryptText('" + elementId + "')\">Show encrypted text</a>";
    var code2 = "<br />\n<br />";
    var code3 = "There is <em><span id=\"" + elementId + "\" title=\"" + encoded + "\">hidden text</span></em> here";
    document.encryptedCode.text.value = code1 + "\n" + code2 + "\n" + code3;
    element.innerHTML = code1+code2+code3;
    // ***
  } else {
    var code1 = "This is encrypted: <span id=\"" + elementId + "\" title=\"" + encoded + "\"><a href=\"javascript:decryptText('" + elementId + "')\">***</a></span>";
    document.encryptedCode.text.value = code1;
    element.innerHTML = code1;
  };  
};
function decryptFormText() {
  if (document.key.text.value.length == 0) {
    alert("Please specify a key with which to decrypt the message.");
    return;
  };
  if(document.cipher.text.value.length == 0) {
    alert("No cipher text to decrypt!  Please enter or paste cipher text in the field above.");
    return;
  };
  try {
    var dec = GibberishAES.dec(document.cipher.text.value, document.key.text.value);
    document.plain.text.value = dec;
  } catch (err) {
    alert("Invalid key");
  }
};
function gup(name) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec(window.location.href);
  if (results == null){
    return "";
  } else {
    return results[1];
  };
};
function load() {
  document.key.text.value = "";
  document.plain.text.value = decodeURIComponent(gup("text"));
  document.cipher.text.value = decodeURIComponent(gup("cipher"));
  document.encryptedCode.text.value = "";
  document.key.text.focus();
};
</script>

<div id="form-cyper" onload="load()">
<h3>
Key</h3>
<form action="#" name="key" onsubmit="return false;">
<div class="form-group">
<input class="form-control" id="passwordText" maxlength="1024" name="text" type="text" />
    </div>
<div class="form-group">
<input class="btn btn-primary" onclick="document.key.text.value = randomPassword(8);" type="button" value=" Random " />
<input class="btn btn-link" onclick="document.key.text.value = '';" type="button" value=" Clear " />
<input class="btn btn-default" onclick="document.key.text.select();" type="button" value=" Select " />
    </div>
</form>
<hr />
<h3>
Plain Text</h3>
<form action="#" name="plain" onsubmit="return false;">
<div class="form-group">
<textarea class="form-control" id="plainText" name="text" rows="6"></textarea>
    </div>
<div class="form-group">
<input class="btn btn-primary" name="encrypt" onclick="encryptFormText();" type="button" value=" Encrypt " />
<input class="btn btn-link" onclick="document.plain.text.value = '';" type="button" value=" Clear " />
<input class="btn btn-default" onclick="document.plain.text.select();" type="button" value=" Select " />
    </div>
</form>
<hr />
<h3>
Cipher Text</h3>
<form action="#" class="form" name="cipher" onsubmit="return false;">
<div class="form-group">
<textarea class="form-control" id="cipherText" name="text" rows="6"></textarea>
    </div>
<div class="form-group">
<input class="btn btn-primary" name="decrypt" onclick="decryptFormText();" type="button" value=" Decrypt " />
<input class="btn btn-link" onclick="document.cipher.text.value = '';" type="button" value=" Clear " />
<input class="btn btn-default" onclick="document.cipher.text.select();" type="button" value=" Select " />
    </div>
</form>
<hr />
<h3>
HTML Code</h3>
<form action="#" class="form" name="encryptedCode" onsubmit="return false;">
<div class="form-group">
<textarea class="form-control" id="codeText" name="text" onclick="this.focus(); this.select();" readonly="" rows="6" wrap="off"></textarea>
    </div>
<div class="form-group">
<label><input checked="" name="codeType" onclick="genSampleCode();" type="radio" value="hide" /> Standard</label>
&nbsp;&nbsp;&nbsp;&nbsp;
<label><input name="codeType" onclick="genSampleCode();" type="radio" value="show" /> Inline</label>
&nbsp;&nbsp;&nbsp;&nbsp;
<label><input name="codeType" onclick="genSampleCode();" type="radio" value="show" /> ***</label>
    </div>
</form>
<hr />
<h3>
HTML Test</h3>
<div id="encryptedTest">
</div>
<hr />
<h3>
Bookmarketlet</h3>
Drag link to browser bookmark bar for instant access.<br />
<br />
<a href="javascript:(function(){txt='';if(window.getSelection)txt=window.getSelection();else;if(document.getSelection)txt=document.getSelection();else;if(document.selection){txt=document.selection.createRange().text;}window.open('http://www.vincentcheung.ca/jsencryption/?text='+encodeURIComponent(txt))})()"><i class="md-icons md-18">bookmark</i> Encrypt</a>
<br />
<br />
<a href="javascript:(function(){txt='';if(window.getSelection)txt=window.getSelection();else;if(document.getSelection)txt=document.getSelection();else;if(document.selection){txt=document.selection.createRange().text;}window.open('http://www.vincentcheung.ca/jsencryption/?cipher='+encodeURIComponent(txt))})()"><i class="md-icons md-18">bookmark</i> Decrypt</a>
<br />
<br />
<hr />
<h3>
Example Email Subscription</h3>
<form action="https://feedburner.google.com/fb/a/mailverify" method="post" onsubmit="window.open('https://feedburner.google.com/fb/a/mailverify?uri=Blogr-amp', 'popupwindow', 'scrollbars=yes,width=550,height=520');return true" target="popupwindow">
<b>Subscribe Now &amp; Get Your PassCode to your Mail</b><br />
<div class="p">
</div>
<div class="form-group">
<input class="form-control" name="email" type="text" />
<input name="uri" type="hidden" value="Blogr-amp" />
<input name="loc" type="hidden" value="en_US" />
<input class="btn btn-primary" type="submit" value="Subscribe" />
<span class="small">PassCode Delivered by <a href="https://feedburner.google.com/" target="_blank">Google's FeedBurner</a></span>
</div>
</form>
<h4>
Sample Subscription form</h4>
<pre>&lt;form action="https://feedburner.google.com/fb/a/mailverify" method="post" target="popupwindow" onsubmit="window.open('https://feedburner.google.com/fb/a/mailverify?uri=Blogr-amp', 'popupwindow', 'scrollbars=yes,width=550,height=520');return true"&gt;
&lt;b&gt;Subscribe Now &amp;amp; Get Your PassCode to your Mail&lt;/b&gt;&lt;br /&gt;&lt;br /&gt;
&lt;div class="form-group"&gt;
&lt;input class="form-control" type="text" style="" name="email"/&gt;
&lt;input type="hidden" value="{{FEEDBURNER_ID}}" name="uri"/&gt;
&lt;input type="hidden" name="loc" value="en_US"/&gt;
&lt;input class="btn btn-primary" type="submit" value="Subscribe" /&gt;
&lt;span class="small"&gt;PassCode Delivered by &lt;a href="https://feedburner.google.com" target="_blank"&gt;Google's FeedBurner&lt;/a&gt;&lt;/span&gt;
&lt;/div&gt;
&lt;/form&gt;
</pre>
</div>
<br />
<div class='linkwithin_div'></div>
<script>
//<![CDATA[
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('k a=["","\\c\\s\\d\\g\\D","\\G\\c\\c\\l","\\f\\B\\C","\\f\\c\\s\\C\\d\\u","\\f\\h\\s\\T","\\g\\c\\f","\\b\\f\\d\\c\\g\\s\\b\\d\\c","\\u\\g\\c\\G","\\1H\\d","\\d\\h\\d\\f\\c","\\s\\b\\r\\c","\\b\\p\\d\\u\\B\\g","\\1D","\\e\\j\\f\\h\\d","\\j\\p\\A\\f\\h\\e\\u\\c\\l","\\R\\b\\s","\\1A\\c\\A","\\Y\\b\\g","\\Q\\j\\g","\\Y\\b\\D","\\R\\p\\s","\\R\\p\\f","\\Q\\p\\C","\\1W\\c\\j","\\1U\\q\\d","\\V\\B\\M","\\1u\\c\\q","\\z","\\S","\\g\\c\\j\\f\\b\\q\\c","\\o\\f\\h\\m\\o\\b\\w\\u\\g\\c\\G\\v\\t","\\X\\r\\v\\S\\t\\m","\\o\\n\\b\\m\\o\\l\\h\\M\\w\\q\\f\\b\\e\\e\\v\\t\\e\\r\\b\\f\\f\\t\\m","\\N\\r\\l\\b\\e\\u\\L\\w","\\w","\\1O\\w","\\o\\n\\l\\h\\M\\m","\\o\\n\\f\\h\\m","\\o\\p\\f\\w\\q\\f\\b\\e\\e\\v\\t\\e\\h\\d\\c\\r\\b\\j\\z\\f\\h\\e\\d\\t\\m\\w","\\o\\n\\p\\f\\m\\o\\A\\g\\w\\n\\m","\\1N\\g\\h\\d\\c","\\e\\h\\d\\c\\r\\b\\j","\\C\\c\\d\\1M\\f\\c\\r\\c\\s\\d\\e\\1P\\D\\1Q\\f\\b\\e\\e\\V\\b\\r\\c","\\l\\b\\d\\b\\z\\f\\b\\A\\c\\f","\\C\\c\\d\\Q\\d\\d\\g\\h\\A\\p\\d\\c","\\l\\b\\d\\b\\z\\u\\c\\b\\l\\h\\s\\C\\e","\\o\\u\\W\\m","\\o\\n\\u\\W\\m","\\l\\b\\d\\b\\z\\g\\c\\e\\p\\f\\d\\e","\\o\\e\\q\\g\\h\\j\\d\\w\\e\\g\\q\\v\\t\\n\\G\\c\\c\\l\\e\\n\\j\\B\\e\\d\\e\\n\\l\\c\\G\\b\\p\\f\\d\\n\\z\\n","\\X\\B\\g\\l\\c\\g\\A\\D\\v\\j\\p\\A\\f\\h\\e\\u\\c\\l\\N\\b\\r\\j\\L\\r\\b\\1b\\z\\g\\c\\e\\p\\f\\d\\e\\v","\\N\\b\\r\\j\\L\\b\\f\\d\\v\\1i\\e\\B\\s\\z\\h\\s\\z\\e\\q\\g\\h\\j\\d\\N\\b\\r\\j\\L\\q\\b\\f\\f\\A\\b\\q\\T\\v\\l\\h\\e\\j\\f\\b\\D\\1q\\B\\e\\d\\e\\t\\w\\d\\D\\j\\c\\v\\t\\d\\c\\1b\\d\\n\\1i\\b\\M\\b\\e\\q\\g\\h\\j\\d\\t\\m\\o\\n\\e\\q\\g\\h\\j\\d\\m"];1n 1r(1j){k H=a[0];1p{k y=1j[a[2]][a[1]]}1s(U){1t[a[3]](U);J 1h};K(!y[a[4]]){J};P(k i=0;i<y[a[4]];i++){P(k I=0;I<y[i][a[5]][a[4]];I++){K(y[i][a[5]][I][a[6]]==a[7]){k 1k=y[i][a[5]][I][a[8]];2b}};k 1l=y[i][a[10]][a[9]];k 1R=y[i][a[12]][0][a[11]][a[9]];k E=y[i][a[15]][a[9]][a[14]](a[13])[0];k 1m=[a[16],a[17],a[18],a[19],a[20],a[21],a[22],a[23],a[24],a[25],a[26],a[27]];k 1o=E[a[14]](a[28])[1]>=10?E[a[14]](a[28])[1]:E[a[14]](a[28])[1][a[1T]](a[29],a[0]);H+=a[1Z]+1k+a[2a]+1l+a[1Y];H+=a[1X]+1m[1V(1o)-1]+a[1L]+E[a[14]](a[28])[2]+a[1K]+E[a[14]](a[28])[0]+a[1B];H+=a[1z]};O[a[1d]](a[1y]+H+a[1v])}(1n(){k x=O[a[1w]](a[1x]);K(x[a[4]]<0){J 1h}1C{P(k i=0;i<x[a[4]];i++){K(!x[i][a[F]](a[Z])){J};k 1g=x[i][a[F]](a[1a])?a[1I]+x[i][a[F]](a[1a])+a[1J]:a[0];k 1f=x[i][a[F]](a[Z]);k 1e=!x[i][a[F]](a[1c])?1G:x[i][a[F]](a[1c]);O[a[1d]](1g+a[1E]+1f+a[1F]+1e+a[1S])}}})()',62,136,'||||||||||_0x527b|x61|x65|x74|x73|x6C|x72|x69|_0xe999x5|x70|var|x64|x3E|x2F|x3C|x75|x63|x6D|x6E|x22|x68|x3D|x20|_0xe999xd|_0xe999x4|x2D|x62|x6F|x67|x79|_0xe999xa|45|x66|_0xe999x3|_0xe999x6|return|if|x3B|x76|x26|document|for|x41|x4A|x30|x6B|err|x4E|x33|x3F|x4D|44|||||||||||46|x78|49|41|_0xe999x10|_0xe999xf|_0xe999xe|false|x6A|_0xe999x2|_0xe999x7|_0xe999x8|_0xe999xb|function|_0xe999xc|try|x50|displayPosts|catch|console|x44|40|43|42|39|38|x46|37|else|x54|50|51|9999|x24|47|48|36|35|x45|x77|x2C|x42|x43|_0xe999x9|52|30|x4F|parseInt|x53|34|33|31|||||||||||32|break'.split('|'),0,{}));
//]]>
</script>
  </body>
</HTML>
