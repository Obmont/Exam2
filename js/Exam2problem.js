function MenuChoice()
{
    if (document.getElementById("menu").value== "Display Categories") 
    {
        document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
        
        //Begins the function to get all the categories.
        
        //Creates AJAX request object.
        var objRequest = new XMLHttpRequest();
        
        //Creates URL and Query String for retrieving all customer names, IDs, and Cities.
        var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCategories";
        
        //Checks that the object has returned data.
        objRequest.onreadystatechange = function()
        {
            if (objRequest.readyState == 4 && objRequest.status == 200)
            {
                var output = JSON.parse(objRequest.responseText);
                GenerateCategoryOutput(output);
            }
        }
        
        //Initiates the server request.
        objRequest.open("GET", url, true);
        objRequest.send();
    }
    else if (document.getElementById("menu").value == "Add Product Category")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "visible";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Edit Category Description")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "visible";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Delete Category")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "visible";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "About")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "visible";
    }
    else
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
}

function GenerateCategoryOutput(result)
{
    var count=0;
    
    var displaytext="<table border=1><tr><th>Category Name</th><th>Category ID</th><th>Category Description</th></tr>";
    
    //for loop to extract data from the response object.
    
    for(count=0; count < result.GetAllCategoriesResult.length; count++)
    {
        displaytext += "<tr><td>" + result.GetAllCategoriesResult[count].CName + "</td><td>" + result.GetAllCategoriesResult[count].CID + "</td><td>" + result.GetAllCategoriesResult[count].CDescription + "</td></tr>";
    }
    
    displaytext += "</table>";
    
    document.getElementById("result1").innerHTML=displaytext;
}

function CreateCategory()
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCategory";
    
    //Collects Category data from web page
    var categoryname = document.getElementById("catname").value;
    var categorydescription = document.getElementById("catdescription").value;
    
    //Creates the parameter string.
    var newcategory = '{"CName":"' + categoryname + '","CDescription":"' + categorydescription + '"}';
    
    //Checks for AJAx operation return.
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult1(result);
        }
    }
    
    //Starts AJAX request.
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcategory);
}

function OperationResult1(output)
{
    if (output.WasSuccessful == 1)
    {
        document.getElementById("result2").innerHTML = "The operation was successful!"
    }
    else
    {
        document.getElementById("result2").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
    }
}

function EditCategoryDescription()
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
    
    //Collects Customer data from web page
    var categoryid = document.getElementById("catid").value;
    var updatedcategorydescription = document.getElementById("updatedcatdescription").value;
    
    //Creates the parameter string.
    var newcategory = '{"CID":' + categoryid + ',"CDescription":"' + updatedcategorydescription + '"}';
    
    //Checks for AJAx operation return.
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult2(result);
        }
    }
    
    //Starts AJAX request.
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcategory);
}

function OperationResult2(output)
{
   if (output == 1)
    {
        document.getElementById("result3").innerHTML = "The operation was successful!"
    }
    else if (output == -2)
    {
        document.getElementById("result3").innerHTML = "Operation failed because the data string supplied could not be deserialized into the service object."
    }
    else if (output == -3)
    {
        document.getElementById("result3").innerHTML = "Operation failed because a record with the supplied Category ID could not be found."
    }
    else if (output == 0)
    {
        document.getElementById("result3").innerHTML = "Operation failed due to unspecified error.";
    }
    else
    {
        document.getElementById("result3").innerHTML = "Really dunno. The value the JSON object returned was: " + output;
    }
}

function makesure()
{
    //Checks to make sure that the user wants to delete this category.
    var delcheck = confirm("Are you sure you want to delete this user?")
    if ( delcheck == true)
    {
        DeleteCategory();
    }
}

function DeleteCategory()
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
    
    //Retreives the category ID of the category being deleted.
    url += document.getElementById("catdelete").value;
    
    //Checking for AJAx operation return.
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult3(result);
        }
    }
    
    //Start AJAX request.
    objRequest.open("GET", url, true);
    objRequest.send();
}

function OperationResult3(output)
{
    if (output.DeleteCategoryResult.WasSuccessful == 1)
    {
        document.getElementById("result4").innerHTML = "The operation was successful!"
    }
    else
    {
        document.getElementById("result4").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
    }
}