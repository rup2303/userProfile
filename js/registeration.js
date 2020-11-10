$("document").ready(() => {
  $(".content").richText();

  $("#mylogOutButton").hide();
  $(".myprofile").hide();
  if (sessionStorage.getItem("user") != null) {
    $(".searchbar").show();
    $("#texteditor").hide();

    $("#mylogButton").hide();
    $("#createPost").show();
    $("#mysingUpButton").hide();
    $("#mylogOutButton").show();
    $(".myprofile").show();
  }

  // /show registeration form
  $(".reg").click((a) => {
    $(".login").hide();
    $(".reg").show();
    $(".searchbar").hide();
    // a.preventDefault();
  });

  //confirm password
  $("#cPassword").keyup(() => {
    var passw = $("#password").val();
    console.log(passw);
    console.log($("#cPassword").val());
    var cpv = $("#cPassword").val();
    if (passw != cpv) {
      $("#cp").html("Password Not Matching").css("color", "red");

      $("#sub").prop("disabled", true);
    } else {
      $("#cp").html("Password Matching").css("color", "green");

      $("#sub").removeAttr("disabled");
    }
  });

  // console.log($.getJSON("http://localhost:3000/profile"));

  //check if mail is present
  $("#mymail").keyup(() => {
    console.log("gdjkasgdjk");

    var mail = $("#mymail").val();
    console.log(mail);
    // console.log(data);
    $.getJSON("http://localhost:3000/profile", (data) => {
      for (var i = 0; i < data.length; i++) {
        if (data[i].email == mail) {
          console.log("fhsdfgkuhsdgfkusdg");
          $("#mailCheck").html("This mail Id Already Exists");

          $("#password").prop("disabled", true);

          //$('#sub').removeAttr('disabled');
        } else {
          var mail = $("#mymail").val();

          $("#password").removeAttr("disabled");
          $("#mailCheck").html(" ");
        }
      }
    });
  });

  //  //Not Registered? Create Account
  $("#singUp").click(() => {
    //$('.log').hide();
    console.log("hr");

    //  $('.login').hide();

    // $('#registerationForm').show();
    $(".registeartion").show();

    // a.preventDefault();
  });

  //logout
  $("#mylogOutButton").click(() => {
    sessionStorage.removeItem("user");
    $("#mylogOutButton").hide();

    $("#mysingUpButton").show();
    $("#mylogButton").show();
    $("#texteditor").hide();
    $(".createblog").hide();
  });

  //registeration form
  $("#registerationForm").submit((a) => {
    a.preventDefault(); //to prevent auto submission of form
    var name = $("#name").val();
    var mail = $("#mymail").val();
    console.log("hi" + mail);
    var pass = $("#password").val();
    var gend = $('input[name="gender"]:checked').val();
    console.log("hi" + name + " " + mail);

    $.ajax({
      url: "http://localhost:3000/profile",
      method: "POST",
      data: {
        name: name,
        email: mail,
        password: pass,
        gender: gend,
      },
      success: (x) => {
        //alert(x.mail +" posted");
        console.log(x);
      },
    });
  });

  //show login form
  $(".log").click((a) => {
    $(".reg").hide();
    $(".log").hide();
    $(".login").show();
    $(".searchbar").hide();

    // a.preventDefault();
  });

  //login Form
  $("#loginForm").submit((a) => {
    a.preventDefault(); //to prevent auto submission of form
    var mail = $("#loginMail").val();
    var pass = $("#loginPassword").val();
    console.log(mail + " " + pass);

    $.getJSON("http://localhost:3000/profile", (data) => {
      for (var i = 0; i < data.length; i++) {
        if (data[i].email == mail && data[i].password == pass) {
          sessionStorage.setItem("user", JSON.stringify(data[i]));

          $(".login").hide();
          $("#mylogOutButton").show();
          $(".searchbar").show();
          $(".createblog").show();

          var a = JSON.parse(sessionStorage.getItem("user"));
          console.log("hello" + a.name);

          break;
        }

        if (data[i].email != mail && data[i].password != pass) {
          $("#validLogin")
            .html("please check your email and password")
            .css("color", "red");
        }
      }
    });
  });
  //text-editor Window display
  $(".createblog").click(function () {
    $(".searchbar").hide();
    $("#texteditor").show();
    $(".site-title").hide();
  });
  //Post the blog Ajax call
  //post the blog
  $("#post").click(function () {
    var sessionObj = JSON.parse(sessionStorage.getItem("user"));
    console.log(sessionObj.name);
    debugger;
    var time = new Date($.now());
    var timestamp =
      time.getDate() +
      "-" +
      (time.getMonth() + 1) +
      "-" +
      time.getFullYear() +
      " " +
      time.getHours() +
      ":" +
      time.getMinutes() +
      ":" +
      time.getSeconds();
    if ($("#title").val() === "") {
      alert("Enter the title of blog");
    } else {
      $.ajax({
        type: "POST",
        dataType: "json",
        url: "http://localhost:3000/posts",
        data: {
          Content: $(".content").val(),
          category: $("#category :selected").val(),
          title: $("#title").val(),
          imageurl: $("#image").val(),
          timestamp: timestamp,
          author: sessionObj.name,
        },
        dataType: "json",
        success: function (result) {
          console.log("result");
        },
      });
      $("#texteditor").hide();
      $(".serachbar").show();
    }
  });

  // profile js
  $(".myprofile").click(() => {
    $(".myprofileDisp").show();
    $(".searchbar").hide();
    $(".editMyProfile").hide();
    var sessionName = JSON.parse(sessionStorage.getItem("user"));

    $("#userName").html(sessionName.name);

    $("p#sp1").append(sessionName.name);
    $("p#sp2").append(sessionName.email);
    $("p#sp3").append(sessionName.gender);

    $.getJSON("http://localhost:3000/posts", function (data) {
      $.each(data, function (key, value) {
        if (value.author == sessionName.name) {
          console.log("my content" + value.Content);

          const content = `
        <blockquote id='${value.id}' class='quote-card'><p>${value.Content}</p></blockquote>
       <button id='${value.id}' class="sa" >Delete</button>`;
          var id = value.id;
          //alert(id);

          document.getElementById("post-column").innerHTML += content;



          //delete the particular post of user
          $(".sa").click(() => {
            console.log("fghsgh");
            // console.log(id);
            //var blogId=sessionStorage.getItem("id");

            $.ajax({
              url: "http://localhost:3000/posts/" + value.id,
              method: "DELETE",
              success: function (a) {
                a.preventDefault();
              },
              error: function (error) {
                alert(error);
              },
            });
          });//delete function ends


         //update users profile
        $(".editP").click(()=>{
          alert("Inside update");

          $(".editMyProfile").show();
          $(".column-layout").hide();
          $(".searchbar").hide();
          $(".myprofileDisp").show();
          document.getElementById("nameOfUser").innerHTML=sessionName.name;
          document.getElementById("emailOfUser").innerHTML=sessionName.email;
          document.getElementById("showName").placeholder =sessionName.name;
          document.getElementById("showEmail").placeholder =sessionName.email ;
          document.getElementById("showGender").placeholder =sessionName.gender ;

          // $(".editP").click(()=>{})


        })







        }//if loop ends
      });//for each ends




    });//getJson ends
  });//document.ready ends


































  //  // $("#profile").click((a)=>{
  //   $.getJSON("http://localhost:3000/profile", function (data) {
  //     //get users data

  //     $.each(data, function (key, value) {
  //       var sessionName = JSON.parse(sessionStorage.getItem("user"));
  //       //console.log(sessionName);

  // console.log(value.name+" "+sessionName.name);

  //       // if (value.name ==  sessionName.name)
  //       // {
  //         // display user information
  //         //console.log(value.id);
  //         document.getElementById("userName").innerHTML = "userName";
  //         $("p#sp1").append(sessionName.name);
  //         $("p#sp2").append(sessionName.email);
  //         $("p#sp3").append(sessionName.gender);
  //         //value.remove(email);
  //         id = value.id;
  //         const content = `
  //        <blockquote id='${value.id}' class='quote-card'><p>${value.content}</p></blockquote>
  //        <button id='${value.id}' onclick='deletePost()' >Delete</button>`;

  //         document.getElementById("post-column").innerHTML += content;

  //         console.log(id);
  //       // }
  //     });

  //     console.log(id);
  //     sessionStorage.setItem("id",id);

  //   })
});
