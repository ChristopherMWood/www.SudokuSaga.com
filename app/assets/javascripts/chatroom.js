    var messageSent = false;
    var firebaseReferences = {};
    var firstOpenList = {};
    var firebaseRoot = "https://sudokusaga.firebaseio.com/";
    
    initilizeChat();
    

    function initilizeChat() {
        var roomName = "level1";
        
        generateChatWindow(roomName, roomName);
        $("#" + roomName + "message").focus();
    }
    
    function generateChatWindow(id, username) {
        var windowMarkup = '<div id="' + id + '-chat-window" class="chat-window">'; //Head
        
        firebaseReferences[id] = new Firebase(firebaseRoot + id);
        windowMarkup += '<div class="chat-header"><span class="chat-title">' + username + '</span><span id="' + id +'-close" class="chat-close">x</span></div>'; //Title
        windowMarkup += '<div id="' + id + '-chat-body" class="chat-body"></div>'; //Body
        
        windowMarkup += '<div class="chat-controls">'; //Controls head
        windowMarkup += '<input id="' + id + '-message" class="chat-input" placeholder="enter message"/>';
        windowMarkup += '<button id="' + id + '-input" class="chat-send-button">Send</button>';
        windowMarkup += '</div>' //Controls tail
        
        windowMarkup += '</div'; //Tail
        
        $(windowMarkup).appendTo("#chat-bar");
        
        registerOnEnter(id);
        registerOnSendClick(id);
        registerOnClose(id);
        
        firstOpenList[id] = true;
        
        firebaseReferences[id].on("value", function(snapshot) {
            if(!firstOpenList[id])
            {
                var message = snapshot.val();
                if(messageSent)
                {
                    displayOwnMessage("#" + id + "-chat-body", message.body);
                    messageSent = false;
                }
                else
                {
                    displayOtherUserMessage("#" + id + "-chat-body", message.body);
                }
                $("#" + id + "-chat-body").scrollTop($("#" + id + "-chat-body").height())
            }
            else
            {
                firstOpenList[id] = false;
                //Do first message post here    
            }
        });
    }
    
    function registerOnEnter(id) {
        $("#chat-bar").bind('keypress', "#" + id + "-message", function(e){
            if ( e.keyCode == 13 ) {
                submitMessage(id);
            }
        });
    }
    
    function registerOnSendClick(id) {
        $("#chat-bar").on("click", "#" + id + "-input", function() {
            submitMessage(id);
        });
    }
    
    function registerOnClose(id) {
         $("#chat-bar").on("click", "#" + id + "-close", function() {
            $("#" + id + "-chat-window").remove();
        });
    }
  
    function submitMessage(id) {
        var messageBody = $("#" + id + "-message").val();
        if(messageBody.length == 0) { return false; }
        
        messageSent = true;
        var timestamp = new Date(new Date().getTime()).toLocaleTimeString();
        
        //Post to firebase second
        firebaseReferences[id].set({
            author: "Christopher",
            body: messageBody,
            time: timestamp
        });
        
        $("#" + id + "-message").val("").focus();
    }
    
    function displayOwnMessage(userId, message) {
        var messageMarkup = $('<div class="local-message">' + message + "</div>");
        $(messageMarkup).appendTo(userId);
    }
    
    function displayOtherUserMessage(userId, message) {
        var messageMarkup = $('<div class="external-message">' + message + "</div>");
        $(messageMarkup).appendTo(userId);
    }