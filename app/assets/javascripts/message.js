$(function(){ 
    function buildHTML(message){
      if ( message.image ) {
        var html =
          `<div class="main__message__messagebox">
            <div class="main__messages__messagebox__upper">
              <div class="main__messages__messagebox__upper__name">
                ${message.user_name}
              </div>
              <div class="main__messages__messagebox__upper__date">
                ${message.crested_at}
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
          `<div class="main__message__messagebox">
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
      $('.main__messages').append(html);
      $('form')[0].reset();
      $("input").prop("disabled", false);
      $('.main__messages').animate({ scrollTop: $('.main__messages')[0].scrollHeight});
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    });
})
});
