$(function(){ 
    function buildHTML(message){
      if ( message.image ) {
        var html =
          `<div class="main__messages__messagebox" data-message-id=${message.id}>
            <div class="main__messages__messagebox__upper">
              <div class="main__messages__messagebox__upper__name">
                ${message.user_name}
              </div>
              <div class="main__messages__messagebox__upper__date">
                ${message.created_at}
              </div>
            </div>
            <div class="main__messages__messagebox__lower">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
            <img src=${message.image} >
          </div>`
        return html;
      } else {
        var html =
          `<div class="main__messages__messagebox" data-message-id=${message.id}>
            <div class="main__messages__messagebox__upper">
              <div class="main__messages__messagebox__upper__name">
                ${message.user_name}
              </div>
              <div class="main__messages__messagebox__upper__date">
                ${message.created_at}
              </div>
            </div>
            <div class="main__messages__messagebox__lower">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
          </div>`
        return html;
      };
    }
  $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        console.log(html)
        $('.main__messages').append(html);
        $('.new-message')[0].reset();
        $(".send").prop("disabled", false);
        $('.main__messages').animate({ scrollTop: $('.main__messages')[0].scrollHeight});

      })
      .fail(function(){
        alert("メッセージ送信に失敗しました");
      });
  })
  
  var reloadMessages = function() {
    var last_message_id = $('.main__messages__messagebox:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main__messages').append(insertHTML);
        $('.main__messages').animate({ scrollTop: $('.main__messages')[0].scrollHeight});
        
      }
    })
    .fail(function() {
      alert('error');
    });
  };
      if (document.location.href.match(/\/groups\/\d+\/messages/)) {
        setInterval(reloadMessages, 7000);
      }
});