//basic theme
function basic_theme(){
     $('#text_demo, #textarea_demo, #checkbox_demo, #select_demo').tm_editbale('init',{});
                                $('#select2_demo').tm_editbale('init',{
                                    init:{
                                            before:function(){},
                                            after:function(){
                                                $('.my_select2').select2();
                                            }
                                        }
                                });
                                $('#unifrom_checkbox_demo').tm_editbale('init',{
                                    init:{
                                            before:function(){},
                                            after:function(){
                                                $('#have_uniform').uniform();
                                            }
                                        }
                                });

                                setTimeout(function(){
                                    $('#uniform_radio_demo').tm_editbale('init',{
                                        init:{
                                                before:function(){},
                                                after:function(){
                                                    $('.uni_radio').uniform();
                                                }
                                            }
                                    });
                                    $('#radio_demo').tm_editbale('init',{});
                                },200);

                                 $('#uniform_select_demo').tm_editbale('init',{
                                    init:{
                                            before:function(){},
                                            after:function(){
                                                $('.my_select3').uniform();
                                            }
                                        }
                                });

                                $('.required_box_demo').tm_editbale('init',{}); 

                                 $('.before_alert_demo').tm_editbale('init',{
                                    ok:{
                                            before:function(current_value){
                                                deferred = $.Deferred();
                                                alert('Before Alert-'+current_value);
                                                deferred.resolve();
                                                return deferred.promise();
                                            }
                                        }
                                });

                                 $('.after_alert_demo').tm_editbale('init',{
                                    ok:{
                                            after:function(){
                                                alert('After Alert');
                                            }
                                        }
                                });

                                $('.post_alert_demo').tm_editbale('init',{
                                    ok:{
                                            before:function(current_value){
                                                var deferred = $.Deferred();
                                                $.ajax({
                                                        type:"Post",
                                                      url: "test.php",
                                                      data:{'info':current_value}
                                                    }).done(function() {
                                                        deferred.resolve();
                                                    }).fail(function(){
                                                        deferred.resolve();
                                                    });
                                              return deferred.promise();
                                            }
                                        }
                                });

                                $('.before_remover_demo').tm_editbale('init',{
                                    remove:{
                                            before:function(){
                                                var deferred = $.Deferred();
                                                alert('before');
                                                $.ajax({
                                                        type:"Post",
                                                      url: "test.php",
                                                      data:{'info':'12'}
                                                    }).done(function() {
                                                        deferred.resolve();
                                                    }).fail(function(){
                                                        deferred.resolve();
                                                    });
                                              return deferred.promise();
                                            }
                                        }
                                });

                                $('.after_remover_demo').tm_editbale('init',{
                                    remove:{
                                            after:function(){
                                                alert('After Remove');
                                            }
                                        }
                                });
                                $('.outside_same_line').tm_editbale('init',{});
                                $('.outside_double_line').tm_editbale('init',{
                                    outside_btn:{
                                        new_line:true,
                                        pull:'left'
                                    }
                                });
                                $('.inside_same_line').tm_editbale('init',{});
                                $('.inside_double_line').tm_editbale('init',{
                                    inside_btn:{
                                        new_line:true,
                                        pull:'left'
                                    }
                                });

}
