    $(document).ready(function () {  
           $.ajax({  
               type: "GET",  
               url: "/Users/getsubjects",  
               data: "{}",  
               success: function (data) {  
                   var s = '<option value="-1">Please Select a subject</option>';  
                   for (var i = 0; i < data.length; i++) {  
                       s += '<option value="' + data[i].subjectsID + '">' + data[i].subjectsName + '</option>';  
                   }  
                   $("#subjectsDropdown").html(s);  
               }  
           });  
       });  
