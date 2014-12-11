var i_counter = 0;
function i_editable_container(eve,val,url,delete_url){
   var flag_already_exists = false;
  if(!$(eve).hasClass('has_i_editable_container'))
  {
    flag_already_exists = true;
  }
  if(flag_already_exists)
  {
      $(eve).addClass('has_i_editable_container');

      var i_editable_post_flag = false;
      var old_val = val;
      if(url)
      {
        i_editable_post_flag = true;
        var edit_final_data = {};
        edit_final_data[$(eve).data('key')];
      }
      i_counter++;

      //if null value
      if(val.trim() == '')
      {
        val = 'N/A';
      }

      //**** UI *****
    //temp
    setting_object = get_input_width($(eve).data('fixed'), $(eve).data('subtask'), $(eve).width());

    var input_width = setting_object['width'];
    var edit_btn = $('<a>').addClass('i_edit '+setting_object['flow']).html('<i class="fa fa-pencil"></i> <span class="i_edit_text">Edit</span>');
    var remover_btn = $('<a>').addClass('i_remover '+setting_object['flow']).html('<i class="fa fa-times"></i>').attr('removerclass',$(eve).data('removerclass'));
    var input_field = $('<span>').addClass('i_text').text(val).css({'width':input_width});
     var just_edit = $('<div>').addClass('just_edit full_row');
     var i_loading = $('<div>').addClass('i_loading').css('display','none').html('<div class="vertical0"><div class="vertical1"><i class="fa fa-spinner fa-spin"></i>&nbsp;&nbsp;Loading</div></div>');
     //temporary
    var sub_btn = $('<a>').addClass('add_task_sub pull-right i_subtask').html('<i class="fa fa-plus"></i> subtask');
  //**** UI *****


     //options
     var obj1  = {class_name:'abc',
                  placeholder:'Feed...',
                  validate:'text',
                  error_text:'U suck...',
                  target_div:'.i_editable',
                  'val':val};

     var temp_obj = {
                      class_name:$(eve).data('iclass'),
                      placeholder:$(eve).data('iplaceholder'),
                      validate:$(eve).data('ivalidate'),
                      error_text:$(eve).data('ierror'),
                      target_div:just_edit,
                      val:val.trim(),
                      remover:$(eve).data('remover'),
                      remover_class:$(eve).data('removerclass'),
                      subtask:$(eve).data('subtask'),
                      date:$(eve).data('date')
                    }
                 
     $(eve).html('');

     //events
     $(edit_btn).click(function(){
       $(obj.target_div).closest('.i_editable_container').children('.no_edit').slideToggle(1);
     $(obj.target_div).closest('.i_editable_container').children('.just_edit').slideToggle(100);
     });

     $(remover_btn).click(function(){
      var r = confirm('Wanna Delete this ?');
      if(r)
      {
        if(typeof delete_url != 'undefined')
        {
            $.get(delete_url,function(data){}).done(function(){
               //i_alert
                i_alert({label:"Deleted",
                          text:$(eve).data('key')+" has been Deleted!",
                          method:"success",
                          timer:2000});
                removerclass_in = $(this).attr('removerclass') ? $(this).attr('removerclass') : '.i_editable_container';
              $(this).closest(removerclass_in).remove();
            }).error(function(){

            });
           
        }
        else
        {
            removerclass_in = $(this).attr('removerclass') ? $(this).attr('removerclass') : '.i_editable_container';
            $(this).closest(removerclass_in).remove();
        }
      }
     });


  //**** UI *****
  if(temp_obj.remover == 'yes')
  {
    if(temp_obj.subtask == 'yes')
      {
         var no_edit = $('<div>').addClass('no_edit full_row').append(input_field).append(remover_btn).append(setting_object['exta_pad2']).append(edit_btn).append(sub_btn);  
      }
      else
      {
         var no_edit = $('<div>').addClass('no_edit full_row').append(input_field).append(setting_object['exta_pad2']).append(remover_btn).append(edit_btn);
      }
  }
  else
  {
    if(temp_obj.subtask == 'yes')
      {
         var no_edit = $('<div>').addClass('no_edit full_row').append(input_field).append(setting_object['exta_pad2']).append(edit_btn).append(sub_btn);  
      }
      else
      {
         var no_edit = $('<div>').addClass('no_edit full_row').append(input_field).append(setting_object['exta_pad2']).append(edit_btn);
      }
  }

    $(eve).append(no_edit).append(just_edit).attr('id','i-edit-'+i_counter);

    var obj = temp_obj;

     //responsive
    calc_wid = $(obj.target_div).closest('.i_editable_container').width() - 60;
    //elements 
    ok_i = $('<i>').addClass('fa fa-check');
    cancel_i = $('<i>').addClass('fa fa-times');
    var ok_btn = $('<a>').addClass('i_ok').append(ok_i);
    var cancel_btn = $('<a>').addClass('i_cancel').append(cancel_i);
    var single_input = $('<input>').attr({type:'text',
                                  class:obj.class_name +' i_edit_input',
                                  placeholder:obj.placeholder,
                                  value:obj.val
                            }).data('validate',obj.validate).css({'width':calc_wid});
    var error = $('<span>').addClass('error-text smg-text full_row').text(obj.error_text);
    btn_container = $('<span>').addClass('ibtn_container '+setting_object['flow']).append(ok_btn).append(cancel_btn);
  //**** UI *****



    //events
    $(single_input).keypress(function(event){
      if(event.keycode == 13 || event.which == 13)
      {
        get_id = $(obj.target_div).closest('.i_editable_container').attr('id');
        flag_val = validate('#'+get_id);
        console.log(flag_val);
         if(flag_val)
      {
        real_val = $(obj.target_div).closest('.i_editable_container').find('.i_edit_input').val();
        if(i_editable_post_flag)
          {//check old val
            if(real_val != old_val)
            {
              $(i_loading).fadeIn('medium');
              old_val = real_val;
            edit_final_data[$(eve).data('key')] = real_val;
            $.post(url,edit_final_data,function(){
              }).done(function(data){
                $(i_loading).fadeOut('fast');
                //i_alert
                i_alert({label:"Updated",
                          text:$(eve).data('key')+" has been Updated!",
                          method:"success",
                          timer:2000});
                 //if null value
                  if(real_val.trim() == '')
                  {
                    real_val = 'N/A';
                  }

                $(obj.target_div).closest('.i_editable_container').find('.i_text').text(real_val);
                $(obj.target_div).closest('.i_editable_container').children('.no_edit').slideToggle(100);
                $(obj.target_div).closest('.i_editable_container').children('.just_edit').slideToggle(1);
                
              }).fail(function( jqXHR, textStatus ) {
                $(i_loading).fadeOut('fast');
                server_error(eve,jqXHR.responseText);
              }); 
            } 
             else
            {
               //if null value
                if(real_val.trim() == '')
                {
                  real_val = 'N/A';
                }

              $(obj.target_div).closest('.i_editable_container').find('.i_text').text(real_val);
              $(obj.target_div).closest('.i_editable_container').children('.no_edit').slideToggle(100);
              $(obj.target_div).closest('.i_editable_container').children('.just_edit').slideToggle(1);
            }     
          }
          else
          {
                 //if null value
                  if(real_val.trim() == '')
                  {
                    real_val = 'N/A';
                  }

                $(obj.target_div).closest('.i_editable_container').find('.i_text').text(real_val);
                $(obj.target_div).closest('.i_editable_container').children('.no_edit').slideToggle(100);
                $(obj.target_div).closest('.i_editable_container').children('.just_edit').slideToggle(1);
            
          }
      }
      }  
    });

    $(ok_btn).click(function(){
    get_id = $(obj.target_div).closest('.i_editable_container').attr('id');
      flag_val = validate('#'+get_id);
      if(flag_val)
      {
        real_val = $(obj.target_div).closest('.i_editable_container').find('.i_edit_input').val();
        if(i_editable_post_flag)
          {//check old val
            if(real_val != old_val)
            {
              $(i_loading).fadeIn('medium');
              old_val = real_val;
            edit_final_data[$(eve).data('key')] = real_val;
            $.post(url,edit_final_data,function(){
              }).done(function(data){
                $(i_loading).fadeOut('fast');
                //i_alert
                i_alert({label:"Updated",
                          text:$(eve).data('key')+" has been Updated!",
                          method:"success",
                          timer:2000});
                 //if null value
                  if(real_val.trim() == '')
                  {
                    real_val = 'N/A';
                  }

                $(obj.target_div).closest('.i_editable_container').find('.i_text').text(real_val);
                $(obj.target_div).closest('.i_editable_container').children('.no_edit').slideToggle(100);
                $(obj.target_div).closest('.i_editable_container').children('.just_edit').slideToggle(1);
                
              }).fail(function( jqXHR, textStatus ) {
                 $(i_loading).fadeOut('fast');
                server_error(eve,jqXHR.responseText);
              }); 
            } 
             else
            {
               //if null value
                if(real_val.trim() == '')
                {
                  real_val = 'N/A';
                }

              $(obj.target_div).closest('.i_editable_container').find('.i_text').text(real_val);
              $(obj.target_div).closest('.i_editable_container').children('.no_edit').slideToggle(100);
              $(obj.target_div).closest('.i_editable_container').children('.just_edit').slideToggle(1);
            }     
          }
          else
          {
                 //if null value
                  if(real_val.trim() == '')
                  {
                    real_val = 'N/A';
                  }

                $(obj.target_div).closest('.i_editable_container').find('.i_text').text(real_val);
                $(obj.target_div).closest('.i_editable_container').children('.no_edit').slideToggle(100);
                $(obj.target_div).closest('.i_editable_container').children('.just_edit').slideToggle(1);
            
          }
      }
    });

    $(cancel_btn).click(function(){
        $(obj.target_div).closest('.i_editable_container').children('.no_edit').slideToggle(100);
        $(obj.target_div).closest('.i_editable_container').children('.just_edit').slideToggle(1);
    });

    if(obj.date == 'yes')
    {
      set_date = val == 'N/A' ? new Date() : val;
      $(single_input).datepicker({
            'autoclose':true,
            'todayHighlight':true,
            'format':'yyyy-mm-dd',
            "setDate": set_date
        });
    }
    //final
    var template_input = $('<div>').addClass('input-group full_row').append(single_input).append(btn_container).append(error);
    $(obj.target_div).append(i_loading).append(template_input);


    //Other Handling Functions
    function server_error(eve1,error_array){
          error_array = jQuery.parseJSON(error_array);
           $(eve1).closest('.input-group').find('.error-text').text(error_array[0].error);
           $(eve1).closest('.input-group').removeClass('success').addClass('error');
    }

    function get_input_width(fixed,subtask, eve_width){
      var setting_obj = {};
      setting_obj['exta_pad2'] = '';
      if(fixed == 'no')
      {
        setting_obj['width'] = 'auto';
        setting_obj['flow'] = 'pull-left';
        setting_obj['exta_pad2'] = $('<span>').addClass('pull-left').html('&nbsp;&nbsp;');
      }
      else
      {
        setting_obj['flow'] = 'pull-right';
          //checking subtask now
          if(subtask == 'yes')
          {
            setting_obj['width'] = eve_width - 120;
          }
          else
          {
            setting_obj['width'] = eve_width - 60;
          }
      }
      return setting_obj;
    }

  } 
}
