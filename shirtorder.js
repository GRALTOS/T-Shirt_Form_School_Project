//shirtorder.js
/* This was written as part of a project to validate a t-shirt order form.
	written by Stephen Gralton
	for course 1715
	Summer Semester, 2016
	stephen.gralton@gmail.com
	*/
function fillForm() {
    document.getElementById( 'bill_name' ).value = document.getElementById( 'shipfirstname' ).value + " " + document.getElementById( 'shiplastname' ).value;
    document.getElementById( 'bill_address' ).value = document.getElementById( 'shipaddress' ).value;
	document.getElementById( 'bill_AptUnit' ).value = document.getElementById( 'shipAptUnit' ).value;
    document.getElementById( 'bill_city' ).value = document.getElementById( 'shipcity' ).value;
    document.getElementById( 'addr_state' ).value = document.getElementById( 'shipaddr_state' ).value;
    document.getElementById( 'bill_zip' ).value = document.getElementById( 'shipaddr_zip' ).value;
        }
function clearForm() {
    document.getElementById( 'bill_name' ).value = "";
    document.getElementById( 'bill_address' ).value = "";
	document.getElementById( 'bill_AptUnit' ).value = "";
    document.getElementById( 'bill_city' ).value = "";
    document.getElementById( 'addr_state' ).value = "";
    document.getElementById('bill_zip' ).value = "";
        }

function populateTotal() {
	var numberOfShirts = document.getElementById( 'quantity' ).value;
	var placeHolder = 20 * numberOfShirts;
	document.getElementById( 'TotalGoesHere' ).innerHTML= "Your total is: $" + placeHolder + " plus tax";
}
		
function validateContactForm()
{
    var contactFormObj = document.getElementById("jerseyorder");
	var quantity = contactFormObj.quantity.value;
	var ktype = contactFormObj.ktype.value;
	var size = contactFormObj.size.value;
    var shipfirstname = contactFormObj.shipfirstname.value;
    var shiplastname = contactFormObj.shiplastname.value;
	var email = contactFormObj.email.value;
	var phone = contactFormObj.phone.value;
	var shipaddress = contactFormObj.shipaddress.value;
	var shipAptUnit = contactFormObj.shipAptUnit.value;
	var shipcity = contactFormObj.shipcity.value;
	var shipaddr_state = contactFormObj.shipaddr_state.value;
	var shipaddr_zip = contactFormObj.shipaddr_zip.value;
	var cc_type = contactFormObj.cc_type.value;
	var cc_num = contactFormObj.cc_num.value;
	var cc_spec_code = contactFormObj.cc_spec_code.value;
	var cc_name = contactFormObj.cc_name.value;
	var cc_exp_month = contactFormObj.cc_exp_month.value;
	var cc_exp_year = contactFormObj.cc_exp_year.value;
	var bill_name = contactFormObj.bill_name.value;
	var bill_address = contactFormObj.bill_address.value;
	var bill_AptUnit = contactFormObj.bill_AptUnit.value;
	var bill_city = contactFormObj.bill_city.value;
	var addr_state = contactFormObj.addr_state.value;
	var bill_zip = contactFormObj.bill_zip.value;
	var whatWentWrong = ("");
    var everythingOK = true;

    if (!validateName(shipfirstname))
    {
        //alert("Error: Invalid first name.");
        everythingOK = false;
        whatWentWrong = "Your name "
    }
    
    if (!validateName(shiplastname))
    {
        //alert("Error: Invalid last name.");
        everythingOK = false;
        whatWentWrong = "Your name "
    }
   
    if (!validatePhone(phone))
    {
        //alert("Error: Invalid phone number.");
        everythingOK = false;
        whatWentWrong = "Your phone number "
    }
    
    if (!validateEmail(email))
    {
        //alert("Error: Invalid e-mail address.");
        everythingOK = false;
        whatWentWrong = "Your e-mail address "
    }
    if (!validateAddress(shipaddress))
	{
		//alert("Error: Please enter an address.");
		everythingOK = false;
		whatWentWrong = "Your address "
	}
	if (!validateZip(bill_zip))
	{
		//alert("Error: Please enter a valid ZIP code.")
		everythingOK = false;
		whatWentWrong = "Your ZIP code "
	}
	if (!validateZip(shipaddr_zip))
	{
		//alert("Error: Please enter a valid ZIP code.")
		everythingOK = false;
		whatWentWrong = "Your ZIP code "
	}
	if (!validateExpDate(cc_exp_month, cc_exp_year))
	{
		//alert("Error: Please enter a valid ZIP code.")
		everythingOK = false;
		whatWentWrong = "Your Credit Card Expiration information "
		
	}
	if(!validatecc(cc_num))
	{
		everythingOK = false;
		whatWentWrong = "Your Credit Card Number "
	}
	if (!isNotEmpty(quantity)) {
		everythingOK = false;
		whatWentWrong = "The number of shirts you wish to purchase "
	}
	if (!isNotEmpty(ktype)) {
		everythingOK = false;
		whatWentWrong = "The shirt color you specified is "
	}
	if (!isNotEmpty(size)) {
		everythingOK = false;
		whatWentWrong = "The shirt size you specified "
	}
	if (!isNotEmpty(cc_name)) {
		everythingOK = false;
		whatWentWrong = "The name given for your credit card is "
	}
	if (!isNotEmpty(bill_name)) {
		everythingOK = false;
		whatWentWrong = "The name given for your credit card is "
	}
	if (!isNotEmpty(cc_type)) {
		everythingOK = false;
		whatWentWrong = "The type of credit card you specified is "
	}
	
    if (everythingOK)
    {
		alert("All the information looks good.\nThank you!");
		return true;
    }
    else
		alert("Whoops! It looks like we have a problem!\n" + whatWentWrong + "is invalid or missing. \nPlease check details and try again.\n");
        return false;
}



function validateName(name)
{
    var p = name.search(/^[-'\w\s]+$/);
    if (p == 0)
        return true;
    else
        return false;
}

function validatePhone(phone)
{
    var p1 = phone.search(/^\d{3}[-\s]{0,1}\d{3}[-\s]{0,1}\d{4}$/);
    var p2 = phone.search(/^\d{3}[-\s]{0,1}\d{4}$/);
    if (p1 == 0 || p2 == 0)
        return true;
    else
        return false;
}

function validateEmail(address)
{
    var p = address.search(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/);
    if (p == 0)
        return true;
    else
        return false;
}

function validateAddress(address)
{
	if(address !== "")
		return true;
	else 
		return false;
}

function validateZip(zip)
{
	if(zip =="" || zip.length !== 5 || isNaN(zip) == 1) {
		return false;
	}
	else {
		return true;
	}
}

function validateExpDate(cc_exp_month, cc_exp_year) {
	today = new Date();
	expired = new Date();
	expired.setFullYear(cc_exp_year, (cc_exp_month - 1), 1);
	if (expired < today) {
		//alert("today is: " + today);
		//alert("exp date is: " + expired);
		return false;
	}
	else {
		//alert("today is: " + today);
		//alert("exp date is: " + expired);
		return true;
	}
}

function validatecc(ccnumber)
{

if (isValidIdentifier(ccnumber)){
    //alert("Valid!");
	return true;
} else {
	return false;
}
}
//Luhn algorithm identifier verification
//MIT Licensed
function isValidIdentifier(identifier) {
//alert(identifier);
    var sum     = 0,
        alt     = false,
        i       = identifier.length-1,
        num;

    if (identifier.length < 13 || identifier.length > 19){
        return false;
    }

    while (i >= 0){

        //get the next digit
        num = parseInt(identifier.charAt(i), 10);

        //if it's not a valid number, abort
        if (isNaN(num)){
            return false;
        }

        //if it's an alternate number...
        if (alt) {
            num *= 2;
            if (num > 9){
                num = (num % 10) + 1;
            }
        } 

        //flip the alternate bit
        alt = !alt;

        //add to the rest of the sum
        sum += num;

        //go to next digit
        i--;
    }
	//alert(sum);

    //determine if it's valid
    return (sum % 10 == 0);
}


function isNotEmpty(submission) {
	if(submission == "") {
		return false;
	} else {
		return true;
	}
		
}
















