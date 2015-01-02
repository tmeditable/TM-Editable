//Simple Button Theme//
function simple_button_theme(){
    $('#text_demo, #textarea_demo, #checkbox_demo, #select_demo, .width_auto_demo').tm_editbale('init',{
                                    theme:'simple-button-theme',
                                    outside_btn:{
                                                    onshow:"&nbsp;<i class='fa fa-pencil'></i>&nbsp;Edit&nbsp;",
                                                    new_line:true,
                                                    pull:'left',
                                                    onhover:''
                                                },
                                    inside_btn:{
                                                    new_line:true,
                                                    pull:'left',
                                                    ok:"<i class='fa fa-check'></i>&nbsp;OK",
                                                    cancel:"<i class='fa fa-times'></i>&nbsp;Cancel"
                                                }            
                                });
                                $('#select2_demo').tm_editbale('init',{
                                    theme:'simple-button-theme',
                                    outside_btn:{
                                                    onshow:"&nbsp;<i class='fa fa-pencil'></i>&nbsp;Edit&nbsp;",
                                                    new_line:true,
                                                    pull:'left',
                                                    onhover:''
                                                },
                                    inside_btn:{
                                                    new_line:true,
                                                    pull:'left',
                                                    ok:"<i class='fa fa-check'></i>&nbsp;OK",
                                                    cancel:"<i class='fa fa-times'></i>&nbsp;Cancel"
                                                },    
                                    init:{
                                            before:function(){},
                                            after:function(){
                                                $('.my_select2').select2();
                                            }
                                        }
                                });
                                $('#unifrom_checkbox_demo').tm_editbale('init',{
                                    theme:'simple-button-theme',
                                    outside_btn:{
                                                    onshow:"&nbsp;<i class='fa fa-pencil'></i>&nbsp;Edit&nbsp;",
                                                    new_line:true,
                                                    pull:'left',
                                                    onhover:''
                                                },
                                    inside_btn:{
                                                    new_line:true,
                                                    pull:'left',
                                                    ok:"<i class='fa fa-check'></i>&nbsp;OK",
                                                    cancel:"<i class='fa fa-times'></i>&nbsp;Cancel"
                                                }, 
                                    init:{
                                            before:function(){},
                                            after:function(){
                                                $('#have_uniform').uniform();
                                            }
                                        }
                                });

                                setTimeout(function(){
                                    $('#uniform_radio_demo').tm_editbale('init',{
                                        theme:'simple-button-theme',
                                        outside_btn:{
                                                    onshow:"&nbsp;<i class='fa fa-pencil'></i>&nbsp;Edit&nbsp;",
                                                    new_line:true,
                                                    pull:'left',
                                                    onhover:''
                                                },
                                    inside_btn:{
                                                    new_line:true,
                                                    pull:'left',
                                                    ok:"<i class='fa fa-check'></i>&nbsp;OK",
                                                    cancel:"<i class='fa fa-times'></i>&nbsp;Cancel"
                                                }, 
                                        init:{
                                                before:function(){},
                                                after:function(){
                                                    $('.uni_radio').uniform();
                                                }
                                            }
                                    });
                                    $('#radio_demo').tm_editbale('init',{
                                        theme:'simple-button-theme',
                                        outside_btn:{
                                                    onshow:"&nbsp;<i class='fa fa-pencil'></i>&nbsp;Edit&nbsp;",
                                                    new_line:true,
                                                    pull:'left',
                                                    onhover:''
                                                },
                                    inside_btn:{
                                                    new_line:true,
                                                    pull:'left',
                                                    ok:"<i class='fa fa-check'></i>&nbsp;OK",
                                                    cancel:"<i class='fa fa-times'></i>&nbsp;Cancel"
                                                }
                                    });
                                },200);

                                 $('#uniform_select_demo').tm_editbale('init',{
                                    theme:'simple-button-theme',
                                    outside_btn:{
                                                    onshow:"&nbsp;<i class='fa fa-pencil'></i>&nbsp;Edit&nbsp;",
                                                    new_line:true,
                                                    pull:'left',
                                                    onhover:''
                                                },
                                    inside_btn:{
                                                    new_line:true,
                                                    pull:'left',
                                                    ok:"<i class='fa fa-check'></i>&nbsp;OK",
                                                    cancel:"<i class='fa fa-times'></i>&nbsp;Cancel"
                                                }, 
                                    init:{
                                            before:function(){},
                                            after:function(){
                                                $('.my_select3').uniform();
                                            }
                                        }
                                });

                                $('.required_box_demo').tm_editbale('init',{
                                    theme:'simple-button-theme',
                                    outside_btn:{
                                                    onshow:"&nbsp;<i class='fa fa-pencil'></i>&nbsp;Edit&nbsp;",
                                                    new_line:true,
                                                    pull:'left',
                                                    onhover:''
                                                },
                                    inside_btn:{
                                                    new_line:true,
                                                    pull:'left',
                                                    ok:"<i class='fa fa-check'></i>&nbsp;OK",
                                                    cancel:"<i class='fa fa-times'></i>&nbsp;Cancel"
                                                }
                                }); 

                                 $('.before_alert_demo').tm_editbale('init',{
                                    theme:'simple-button-theme',
                                    outside_btn:{
                                                    onshow:"&nbsp;<i class='fa fa-pencil'></i>&nbsp;Edit&nbsp;",
                                                    new_line:true,
                                                    pull:'left',
                                                    onhover:''
                                                },
                                    inside_btn:{
                                                    new_line:true,
                                                    pull:'left',
                                                    ok:"<i class='fa fa-check'></i>&nbsp;OK",
                                                    cancel:"<i class='fa fa-times'></i>&nbsp;Cancel"
                                                }, 
                                    ok:{
                                            before:function(){
                                                deferred = $.Deferred();
                                                alert('Before Alert');
                                                deferred.resolve();
                                                return deferred.promise();
                                            }
                                        }
                                });

                                 $('.after_alert_demo').tm_editbale('init',{
                                    theme:'simple-button-theme',
                                    outside_btn:{
                                                    onshow:"&nbsp;<i class='fa fa-pencil'></i>&nbsp;Edit&nbsp;",
                                                    new_line:true,
                                                    pull:'left',
                                                    onhover:''
                                                },
                                    inside_btn:{
                                                    new_line:true,
                                                    pull:'left',
                                                    ok:"<i class='fa fa-check'></i>&nbsp;OK",
                                                    cancel:"<i class='fa fa-times'></i>&nbsp;Cancel"
                                                }, 
                                    ok:{
                                            after:function(){
                                                alert('After Alert');
                                            }
                                        }
                                });

                                $('.post_alert_demo').tm_editbale('init',{
                                    theme:'simple-button-theme',
                                    outside_btn:{
                                                    onshow:"&nbsp;<i class='fa fa-pencil'></i>&nbsp;Edit&nbsp;",
                                                    new_line:true,
                                                    pull:'left',
                                                    onhover:''
                                                },
                                    inside_btn:{
                                                    new_line:true,
                                                    pull:'left',
                                                    ok:"<i class='fa fa-check'></i>&nbsp;OK",
                                                    cancel:"<i class='fa fa-times'></i>&nbsp;Cancel"
                                                }, 
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
                                    theme:'simple-button-theme',
                                    outside_btn:{
                                                    onshow:"&nbsp;<i class='fa fa-pencil'></i>&nbsp;Edit&nbsp;",
                                                    new_line:true,
                                                    pull:'left',
                                                    onhover:''
                                                },
                                    inside_btn:{
                                                    new_line:true,
                                                    pull:'left',
                                                    ok:"<i class='fa fa-check'></i>&nbsp;OK",
                                                    cancel:"<i class='fa fa-times'></i>&nbsp;Cancel"
                                                }, 
                                    remove:{
                                            before:function(){
                                                var deferred = $.Deferred();
                                                alert('before');
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

                                $('.after_remover_demo').tm_editbale('init',{
                                    theme:'simple-button-theme',
                                    outside_btn:{
                                                    onshow:"&nbsp;<i class='fa fa-pencil'></i>&nbsp;Edit&nbsp;",
                                                    new_line:true,
                                                    pull:'left',
                                                    onhover:''
                                                },
                                    inside_btn:{
                                                    new_line:true,
                                                    pull:'left',
                                                    ok:"<i class='fa fa-check'></i>&nbsp;OK",
                                                    cancel:"<i class='fa fa-times'></i>&nbsp;Cancel"
                                                }, 
                                    remove:{
                                            after:function(){
                                                alert('After Remove');
                                            }
                                        }
                                });

                            
                             $('.outside_same_line').tm_editbale('init',{
                                 theme:'simple-button-theme',
                                    outside_btn:{
                                                    onshow:"&nbsp;<i class='fa fa-pencil'></i>&nbsp;Edit&nbsp;",
                                                    new_line:false,
                                                    pull:'right',
                                                    onhover:''
                                                },
                                    inside_btn:{
                                                    new_line:true,
                                                    pull:'left',
                                                    ok:"<i class='fa fa-check'></i>&nbsp;OK",
                                                    cancel:"<i class='fa fa-times'></i>&nbsp;Cancel"
                                                }
                             });
                                $('.outside_double_line').tm_editbale('init',{
                                    theme:'simple-button-theme',
                                    outside_btn:{
                                                    onshow:"&nbsp;<i class='fa fa-pencil'></i>&nbsp;Edit&nbsp;",
                                                    new_line:true,
                                                    pull:'left',
                                                    onhover:''
                                                },
                                    inside_btn:{
                                                    new_line:true,
                                                    pull:'left',
                                                    ok:"<i class='fa fa-check'></i>&nbsp;OK",
                                                    cancel:"<i class='fa fa-times'></i>&nbsp;Cancel"
                                                }
                                });
                                $('.inside_same_line').tm_editbale('init',{
                                    theme:'simple-button-theme',
                                    outside_btn:{
                                                    onshow:"&nbsp;<i class='fa fa-pencil'></i>&nbsp;Edit&nbsp;",
                                                    new_line:true,
                                                    pull:'left',
                                                    onhover:''
                                                },
                                    inside_btn:{
                                                    new_line:false,
                                                    pull:'right',
                                                    ok:"<i class='fa fa-check'></i>&nbsp;OK",
                                                    cancel:"<i class='fa fa-times'></i>&nbsp;Cancel"
                                                }
                                });
                                $('.inside_double_line').tm_editbale('init',{
                                    theme:'simple-button-theme',
                                    outside_btn:{
                                                    onshow:"&nbsp;<i class='fa fa-pencil'></i>&nbsp;Edit&nbsp;",
                                                    new_line:true,
                                                    pull:'left',
                                                    onhover:''
                                                },
                                    inside_btn:{
                                                    new_line:true,
                                                    pull:'left',
                                                    ok:"<i class='fa fa-check'></i>&nbsp;OK",
                                                    cancel:"<i class='fa fa-times'></i>&nbsp;Cancel"
                                                }
                                });
}