//***********************    Localization variable    *****************
var L_strErrMsg_Message = "Invalid value"; 
//***********************    Localization variable    *****************

function isValid(value)
// --------------------------------------------------------------------------------------
// used in checkForm() below to validate entries (non-empty, numerical, no simbols)
// --------------------------------------------------------------------------------------
{
	if(value=="") return false;
	for(i=0;i<value.length;i++) { if(isNaN(value.charAt(i))) return false; }
	if(value>255) return false;
	return true;
}
	
function checkForm2()
// --------------------------------------------------------------------------------------
// apparently unused  
// --------------------------------------------------------------------------------------
{
	var value;
	for(j=0;j<form.txtDC.length;j++)
	{
		var value=form.txtDC[j].value;
		if(!isValid(form.txtDC[j].value))	return false;
		if((j==3||j==7)&&(form.txtDC[j].value>254))	return false;
	}
	return true;
}
	
function checkForm(index)
// --------------------------------------------------------------------------------------
// used OnKeyUp to check and validate the entry made in IP address fields
// --------------------------------------------------------------------------------------
{
	var key=event.keyCode;
	if (!event.altkey)
	{
	
		if(key!=9)
		{
			form.txtDC[index].value=replaceStr(form.txtDC[index].value, " ", "") // replace white space
			form.txtDC[index].value=replaceStr(form.txtDC[index].value, ".", "") // replace dot
		}
		//for some reason this is failing
		else if((key>=48&&key<=57)||(key>=65&&key<=90)||(key>=97&&key<=105))
		{
			if(isValid(form.txtDC[index].value))
			{
				if(index+1<form.txtDC.length&&form.txtDC[index].value.length==3) form.txtDC[index+1].focus();
			} 
			else
			{				
				wizAlert(L_strErrMsg_Message);
				form.txtDC[index].focus();
				form.txtDC[index].value="";
			}
		}		
		else if(key!=13&&key!=9&&key!=32&&key!=8&&(key<16&&key>18))
		{ 
			//	form.txtDC[index].value=""; 
			//alert("suq");
			killEvent();
		}
		
		if(isValid(form.txtDC[index].value))
		{
			if (!(key==190||key==110))
			{
				if(index+1<form.txtDC.length&&form.txtDC[index].value.length==3)	form.txtDC[index+1].focus();
			}
		} 
		else
		{				
			wizAlert(L_strErrMsg_Message);
			form.txtDC[index].focus();
			form.txtDC[index].value="";
		}

		if(key==190)key=39;	
		if(key==37)		{ if(index-1>=0)				form.txtDC[index-1].focus(); }	// left-arrow key
		else if(key==38){ if(index-4>=0)				form.txtDC[index-4].focus(); }  // up-arrow key
		else if(key==39){ if(index+1<form.txtDC.length)	form.txtDC[index+1].focus(); }  // right-arrow key
		else if(key==40){ if(index+4<form.txtDC.length)	form.txtDC[index+4].focus(); }  // down-arrow key

	}
}

function checkKeyDown(index)
// --------------------------------------------------------------------------------------
// used OnKeyDown to check and validate the entry made in IP address fields
// --------------------------------------------------------------------------------------
{
	var key=event.keyCode;
	if (!event.altKey)
	{
		// only numbers accepted, TAB (9), BackSp (8), Shift (16), End (35), Home (36), ArrowKey (37,38,39,40), Del (46), dot (190 or 110)
		if(!(key>=48&&key<=57)&&!(key>=96&&key<=105)&&!(key==8||key==9||key==16||key==35||key==36||key==46||key==190||key==110||key==37||key==38||key==39||key==40))
		{
			killEvent();	// ignore all the rest
		}	
		if (key==190||key==110)
		{
			if(index+1<form.txtDC.length)	form.txtDC[index+1].focus();  // advance to next field if dot
			killEvent();
		}
	}
}