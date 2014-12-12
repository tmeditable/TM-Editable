var Global_tm_array = [];
var tm_counter = -1;
(function ( $ ) {
 
    $.fn.tm_editbale = function(option,new_obj) {
        this.each(function(){
            $this = $(this);
            //Global Variable 
            $this.Global_tm = 
            {
                //Users Settings
                user_settings:
                {
                    class_name:$this.data('iclass'),
                    placeholder:$this.data('iplaceholder'),
                    validate:$this.data('ivalidate'),
                    error_text:$this.data('ierror'),
                    target_div:'just_edit',
                    remover:$this.data('remover'),
                    remover_class:$this.data('removerclass'),
                    date:$this.data('date'),
                    width:$this.width(),
                    full_length:$this.data('full-length'),
                     init:{
                        before:function(){},
                        after:function(){}
                    },
                    ok:{
                        before:function(){
                            var deferred = $.Deferred();
                            deferred.resolve();
                            return deferred.promise();
                        },
                        after:function(){}
                    },
                    remove:{
                        before:function(){
                            var deferred = $.Deferred();
                            deferred.resolve();
                            return deferred.promise();
                        },
                        after:function(){}
                    }
                },

                //Default Settings
                 default_settings:
                {
                    class_name:'',
                    placeholder:'',
                    validate:'nullable',
                    error_text:'',
                    target_div:'just_edit',
                    val:'',
                    remover:false,
                    remover_class:'.tm_editable_container',
                    date:false,
                    width:'auto',
                    full_length:true
                },

                //Already exists
                already_exists : $this.hasClass('has_tm_editable_container'),
                counter:tm_counter++

        };

        //set before after methods
        if(new_obj.hasOwnProperty('init'))
        {
            if(new_obj.init.hasOwnProperty('before'))
              $this.Global_tm.user_settings.init.before = new_obj.init.before;
            if(new_obj.init.hasOwnProperty('after'))
                $this.Global_tm.user_settings.init.after = new_obj.init.after;
        }
        if(new_obj.hasOwnProperty('ok'))
        {
            if(new_obj.ok.hasOwnProperty('before'))
                $this.Global_tm.user_settings.ok.before = new_obj.ok.before;
            if(new_obj.ok.hasOwnProperty('after'))
                $this.Global_tm.user_settings.ok.after = new_obj.ok.after;
        }
        if(new_obj.hasOwnProperty('remove'))
        {
            if(new_obj.remove.hasOwnProperty('before'))
                $this.Global_tm.user_settings.remove.before = new_obj.remove.before;
            if(new_obj.remove.hasOwnProperty('after'))
                $this.Global_tm.user_settings.remove.after = new_obj.remove.after;
        }

        //Set FInal Settings
        $this.Global_tm.final_settings = $.extend($this.Global_tm.default_settings, $this.Global_tm.user_settings)
        
        //Find type of element
        $this.Global_tm.final_settings.hunt_type = hunt_type();
        $this.Global_tm.final_settings.val = $this.Global_tm.final_settings.hunt_type['value'];

        if(option == 'init')
        {
            if(!$this.Global_tm.already_exists)
                init_method();
            //console.log($this.Global_tm);
        }

        //ALL METHODS

        //Init method START 

        function init_method(){
            $this.Global_tm.final_settings.init.before();
            $this.html('');
            $this.addClass('has_tm_editable_container').attr('my_rank',Global_tm_array.length);
            $this.Global_tm.counter++;
            //if null value
            setting_object = get_input_width();
            $this.Global_tm.final_settings.final_val = make_my_clone()['value'];
            
            //**** UI *****
            make_my_clone = make_my_clone();
            var input_width = setting_object['width'];
            var edit_btn = $('<a>').addClass('i_edit '+setting_object['flow']).html('<i class="fa fa-pencil"></i> <span class="i_edit_text">Edit</span>');
            var input_field = $('<span>').addClass('i_text').html(make_my_clone['final_val']).attr('selected_val',make_my_clone['selected_val']).css({'width':input_width});
            var just_edit = $('<div>').addClass('just_edit full_row');
            $this.Global_tm.final_settings.just_edit = just_edit;
            var i_loading = $('<div>').addClass('i_loading').css('display','none').html('<div class="vertical0"><div class="vertical1"><i class="fa fa-spinner fa-spin"></i>&nbsp;&nbsp;Loading</div></div>');
            var ok_i = $('<i>').addClass('fa fa-check');
            var cancel_i = $('<i>').addClass('fa fa-times');
            var ok_btn = $('<a>').addClass('i_ok').append(ok_i);
            var cancel_btn = $('<a>').addClass('i_cancel').append(cancel_i);
            var single_input = make_my_clone['my_clone'];

            var error = $('<span>').addClass('error-text smg-text full_row').text($this.Global_tm.final_settings.error_text);
            btn_container = $('<span>').addClass('ibtn_container '+setting_object['flow']).append(ok_btn).append(cancel_btn);

            //remover button
            if($this.Global_tm.final_settings.remover)
            {
                var remover_btn = $('<a>').addClass('i_remover '+setting_object['flow']).html('<i class="fa fa-times"></i>').attr('removerclass',$this.Global_tm.final_settings.removerclass);
            }
            else
            {
                var remover_btn = '';
            }
           
            //attach UI
            var no_edit = $('<div>').addClass('no_edit full_row').append(input_field).append(remover_btn).append(setting_object['exta_pad2']).append(edit_btn);
             $this.append(no_edit).append(just_edit).attr('id','tm-edit-'+$this.Global_tm.counter);
            var template_input = $('<div>').addClass('input-group full_row').append(single_input).append(btn_container).append(error);
            $($this.Global_tm.final_settings.just_edit).append(i_loading).append(template_input);
            
            //attach events
             
             //Edit Button
             $(input_field).click(function(){
                $(no_edit).slideToggle(1);
                $(just_edit).slideToggle(100);
             });

             $(edit_btn).click(function(){
                $(no_edit).slideToggle(1);
                $(just_edit).slideToggle(100);
             });

             //Remover Button
             $(remover_btn).click(function(){
              var r = confirm('Wanna Delete this ?');
              if(r)
              {
                 my_rank = get_rank(this);
                 $(i_loading).fadeIn('fast');
                    var promise = Global_tm_array[my_rank].Global_tm.final_settings.remove.before();
                    promise.done(function() {
                        $(remover_btn).closest(Global_tm_array[my_rank].Global_tm.final_settings.remover_class).remove();
                        $(i_loading).fadeOut('slow');
                        Global_tm_array[my_rank].Global_tm.final_settings.remove.after();
                    });
              }
             });

             //Ok Button
             $(ok_btn).click(function(){
                my_rank = get_rank(this);
                after_ok(my_rank);
            });

             //On Enter
              $(single_input).keypress(function(event){
                  if(event.keycode == 13 || event.which == 13)
                  {
                    my_rank = get_rank(this);
                    after_ok(my_rank);
                  }
              });

             //Cancel Button
             $(cancel_btn).click(function(){
                $(no_edit).slideToggle(100);
                $(just_edit).slideToggle(1);
                my_rank = get_rank(this);
                cancel_update(my_rank,this);
            }); 


            //After Ok
            function after_ok(rank){
                get_id = $(just_edit).closest('.tm_editable_container').attr('id');
                type = Global_tm_array[rank].Global_tm.final_settings.hunt_type['type'];
                    $tm_container = $('#'+get_id);
                    flag_val = validate('#'+get_id);
                    //check validation
                    if(flag_val)
                    {
                        //real_val = $(single_input).val().trim();
                        switch(type)
                        {
                            case 'text':
                                    real_val = $(single_input).val().trim();
                                    new_val_flag = real_val != $(input_field).text().trim() ? true:false;
                                break;

                            case 'textarea':
                                    real_val = $(single_input).val().trim();
                                    new_val_flag = real_val != $(input_field).text().trim() ? true:false;
                                break;
                                
                            case 'select':
                                    real_val = $(single_input).val().trim();
                                    new_val_flag = real_val != $(input_field).attr('selected_val').trim() ? true:false;
                                break;

                            case 'radio':
                                    real_val = $(single_input).find('input[type="radio"]:checked').val();
                                    new_val_flag = real_val != $(input_field).attr('selected_val').trim() ? true:false;
                                break;

                             case 'checkbox':
                                    real_val = $(single_input).find('input[type="checkbox"]').is(':checked');
                                    new_val_flag = real_val != $(input_field).attr('selected_val').trim() ? true:false;
                                break;    
                        }
                        
                        //check old val
                        if(new_val_flag)
                        {
                           $(i_loading).fadeIn('fast');
                            var promise = Global_tm_array[rank].Global_tm.final_settings.ok.before(real_val);
                            promise.done(function() {
                              update_it(rank,type,real_val);
                              $(i_loading).fadeOut('slow');
                            });
                        }
                        else
                        {
                            $(just_edit).slideToggle(1);
                            $(no_edit).slideToggle(100);
                             setTimeout(function(){
                                Global_tm_array[rank].Global_tm.final_settings.ok.after(real_val); 
                            },100);
                        }
                       
                    }
            }

            //Update It
            function update_it(rank,type,real_val){
                switch(type)
                {
                    case 'text':
                             //if null value
                            if(real_val == '')
                            {
                                real_val = 'N/A';
                            }
                            $(input_field).text(real_val);
                    break;
                    
                    case 'select':
                            my_text = $(single_input).find("option:selected").text();
                            $(input_field).text(my_text).attr('selected_val',real_val);
                    break;   

                    case 'radio':
                            $(single_input).find("input[type='radio']:checked").each(function(){
                                 my_val = $(this).val();
                                current_id = $(this).attr('id');
                                my_text = $("label[for='"+current_id+"']").text().trim();
                            })
                            $(input_field).text(my_text).attr('selected_val',real_val);
                    break;  

                    case 'checkbox':
                            $(single_input).find("input[type='checkbox']").each(function(){
                                 my_val = $(this).is(':checked');
                                 my_show_val = my_val ? 'Yes':'No'; 
                                current_id = $(this).attr('id');
                                my_text = $("label[for='"+current_id+"']").text().trim();
                                my_text = '<label>'+my_text+'</label> : '+my_show_val;
                            })
                            $(input_field).html(my_text).attr('selected_val',real_val);
                    break;  

                     case 'textarea':
                             //if null value
                            if(real_val == '')
                            {
                                real_val = 'N/A';
                            }
                            $(input_field).text(real_val);
                    break; 
                }
               
                $(just_edit).slideToggle(1);
                $(no_edit).slideToggle(100);
                 setTimeout(function(){
                    Global_tm_array[rank].Global_tm.final_settings.ok.after(); 
                },100);
            }

            //cancel_update
            function cancel_update(rank,eve){
                type = Global_tm_array[rank].Global_tm.final_settings.hunt_type['type'];
                switch(type)
                {
                    case 'text':
                            field_val = $(input_field).text().trim();
                            $(single_input).val(field_val);
                    break;
                    
                    case 'select':
                            field_val = $(input_field).attr('selected_val');
                            //if select2
                            $(single_input).val(field_val);
                    break;    
                }
            }
            
            //Make my clone
            function make_my_clone(){
                my_type = $this.Global_tm.final_settings.hunt_type['type'];
                switch(my_type)
                {
                    case 'text':
                       my_clone =  $this.Global_tm.final_settings.hunt_type.my_clone.attr({
                                      class:$this.Global_tm.final_settings['class_name'] +' i_edit_input',
                                      placeholder:$this.Global_tm.final_settings['placeholder'],
                                      value:$this.Global_tm.final_settings['val']
                                }).data('validate',$this.Global_tm.final_settings['validate']).css({'width':setting_object['inside_width']});
                        final_val = $this.Global_tm.final_settings.val == '' ? 'N/A' : $this.Global_tm.final_settings.val;
                        selected_val = '';
                    break;

                    case 'select':
                        my_clone = $this.Global_tm.final_settings.hunt_type.my_clone;
                        final_val = $this.Global_tm.final_settings.hunt_type['my_text'];
                        selected_val = $this.Global_tm.final_settings.val;
                    break;

                     case 'checkbox_container':
                        my_clone = $this.Global_tm.final_settings.hunt_type.my_clone;
                        final_val = $this.Global_tm.final_settings.hunt_type['my_text'];
                        selected_val =  $this.Global_tm.final_settings.hunt_type['value'];
                    break;

                    case 'checkbox':
                        my_clone = $this.Global_tm.final_settings.hunt_type.my_clone;
                        label = my_clone.find('label').text();
                        final_val = '<label>'+label+'</label> : '+$this.Global_tm.final_settings.hunt_type['my_text'];
                        selected_val = $this.Global_tm.final_settings.val;
                    break;

                    case 'radio':
                        my_clone = $this.Global_tm.final_settings.hunt_type.my_clone;
                        final_val = $this.Global_tm.final_settings.hunt_type['my_text'];
                        selected_val =  $this.Global_tm.final_settings.val;
                    break;

                     case 'textarea':
                       my_clone =  $this.Global_tm.final_settings.hunt_type.my_clone.attr({
                                      class:$this.Global_tm.final_settings['class_name'] +' i_edit_input',
                                      placeholder:$this.Global_tm.final_settings['placeholder'],
                                      value:$this.Global_tm.final_settings['val']
                                }).data('validate',$this.Global_tm.final_settings['validate']).css({'width':setting_object['inside_width']});
                        final_val = $this.Global_tm.final_settings.val == '' ? 'N/A' : $this.Global_tm.final_settings.val;
                        selected_val = '';
                    break;
                    
                }
                return {
                            my_clone:my_clone,
                            final_val:final_val,
                            selected_val:selected_val
                        };    
            }

            //Before Init
            $this.Global_tm.final_settings.init.after();
           
         }


        //Init method END

        //Get Input Box WIDTH
        function get_input_width(fixed){
            fixed = $this.Global_tm.final_settings.full_length;
            eve_width =  $this.Global_tm.final_settings['width'];
            var setting_obj = {};
            setting_obj['exta_pad2'] = '';
            if(!fixed)
            {
                setting_obj['width'] = 'auto';
                setting_obj['flow'] = 'pull-left';
                setting_obj['exta_pad2'] = $('<span>').addClass('pull-left').html('&nbsp;&nbsp;');
                setting_obj['inside_width'] = 'auto';
            }
            else
            {
                setting_obj['flow'] = 'pull-right';
                if(!$this.Global_tm.final_settings.remover)
                {
                    setting_obj['width'] = eve_width - 60;
                }
                else
                {
                    setting_obj['width'] = eve_width - 120;   
                }
                setting_obj['inside_width'] = eve_width - 60;
            }
            return setting_obj;
        }

        //Find Input Type
        function hunt_type(){
            if($this.children('input[type="text"]').length)
            {
                my_type = 'text';
                my_clone = $this.children('input').clone(true);
                my_val = my_clone.val().trim();
                my_text = my_val;
            }
            else if($this.children('select').length)
            {
                my_type = 'select';
                my_clone = $this.children('select').clone(true);
                my_val = $this.find("option:selected").val();
                my_text = $this.find("option:selected").text();
            }
            else if($this.children('.checkbox_container').length)
            {
                my_type = 'checkbox_container';
                my_clone = $this.children('.checkbox_container').clone(true);
                my_val_array = [];
                my_text_array = [];
                my_clone.find('.single_checkbox').each(function(k2,v2){
                //alert($(v2).find('input').length);
                if($(v2).find('input:checked').length)
                    {
                        val1 = $(v2).find('input:checked').attr('value');
                        text1 = $(v2).find('label').text().trim();
                        my_val_array.push(val1);
                        my_text_array.push(text1);
                    }
                });
                my_val = my_val_array.join(',');
                my_text = my_text_array.join(', ');
            }
             else if($this.children('.single_checkbox').length)
            {
                my_type = 'checkbox';
                my_clone = $this.children('.single_checkbox').clone(true);
                my_val = $this.find("input[type='checkbox']").is(':checked');
                if(my_val)
                    my_text = 'Yes'
                else
                    my_text = 'No'
            }
             else if($this.children('.radio_container').length)
            {
                my_type = 'radio';
                my_clone = $this.children('.radio_container').clone(true);
                $this.find("input[type='radio']:checked").each(function(){
                    my_val = $(this).val();
                    current_id = $(this).attr('id');
                    my_text = $("label[for='"+current_id+"']").text().trim();    
                });
            }
            else if($this.children('textarea').length)
            {
                my_type = 'textarea';
                my_clone = $this.children('textarea').clone(true);
                my_val = my_clone.text().trim();
                my_text = my_val;
            }
            
            return {type:my_type,
                    value:my_val,
                    my_clone:my_clone,
                    my_text:my_text};
        }

        //Get Rank
        function get_rank(eve)
        {
            return $(eve).closest('.has_tm_editable_container').attr('my_rank');
        }
 
 Global_tm_array.push($this);
 });   

};
}( jQuery ));