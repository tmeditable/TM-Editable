routeapp = angular.module('TmEditable', [
    'ui.router'
])
routeapp.run(
    ['$rootScope', '$state', '$stateParams',
        function($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]
)
routeapp.controller("Justdo", function($scope) {
     i_active('.main-nav-ul','.main-nav-li');
})
routeapp.config(
    ['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .otherwise('/home');

            $stateProvider

            // *** Home Page *****
                .state('home', {
                url: '/home',
                views: {
                    'home_view': {
                        templateUrl: 'content/home.html',
                        controller: ['$scope', '$stateParams', '$http','$timeout',
                            function($scope, $stateParams, $http, $timeout) {
                                i_selfactive('.main-nav-ul','.main-nav-li', '.home-main-nav-li');
                                i_active('.nav_ul','.nav_li');
                                i_selfactive('.nav_ul','.nav_li','.home-main-nav-li');
                                $('#basic_theme_demo').tm_editbale('init',{});
                                $('#dotted_line_theme_demo').tm_editbale('init',{
                                    theme:'dotted-line-theme',
                                    full_length:{
                                                    outside:false,
                                                    inside:true
                                                },
                                    outside_btn:{
                                                    onshow:"",
                                                    new_line:false,
                                                    onhover:''
                                                },
                                    inside_btn:{
                                                    new_line:false,
                                                    ok:"<i class='fa fa-check'></i>",
                                                    cancel:"<i class='fa fa-times'></i>"
                                                }            
                                });
                                $('#holo_input_theme_demo').tm_editbale('init',{
                                    theme:'holo-input-theme',
                                    outside_btn:{
                                                    onshow:"&nbsp;<i class='fa fa-pencil'></i>&nbsp;",
                                                    new_line:false,
                                                    onhover:''
                                                },
                                    inside_btn:{
                                                    new_line:false,
                                                    ok:"<i class='fa fa-check'></i>",
                                                    cancel:"<i class='fa fa-times'></i>"
                                                }            
                                });
                                $('#simple_button_theme_demo').tm_editbale('init',{
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
                                $('#round_button_theme_demo').tm_editbale('init',{
                                    theme:'round-button-theme',
                                    outside_btn:{
                                                    onshow:"&nbsp;<i class='fa fa-pencil'></i>&nbsp;",
                                                    new_line:false,
                                                    onhover:''
                                                },
                                    inside_btn:{
                                                    new_line:false,
                                                    ok:"<i class='fa fa-check'></i>",
                                                    cancel:"<i class='fa fa-times'></i>"
                                                }            
                                });
                            }
                        ]
                    }
                }
            })

            // *** Home Page *****
            .state('demo', {
                url: '/demo',
                abstract:true,
                views: {
                    'home_view': {
                        templateUrl: 'content/demo_container.html',
                        controller: ['$scope', '$stateParams', '$http','$timeout',
                            function($scope, $stateParams, $http, $timeout) {
                                i_active('.list_container','.theme_li');
                                i_selfactive('.main-nav-ul','.main-nav-li', '.demo-main-nav-li');
                            }
                        ]
                    }
                }
            })
            
             .state('demo.blank', {
                url: '',
                views: {
                    'demo_container': {
                        template: '',
                        controller: ['$scope', '$stateParams', '$http',
                            function(){
                            }
                        ]
                    }
                }
            })  

            // *** LOGIN *****
            .state('demo.theme', {
                url: '/{name}',
                views: {
                    'demo_container': {
                        templateUrl: 'content/demo.html',
                        controller: ['$scope', '$stateParams', '$http',
                            function($scope, $stateParams, $http) {
                                $scope.theme_name = $stateParams.name;
                                i_selfactive('.list_container','.theme_li', '.'+$scope.theme_name+'-li');
                                $http.get('assets/docs.json').success(function(data){
                                switch($scope.theme_name){
                                    case 'basic-theme':
                                    case '':
                                            $scope.data = data[0]['basic-theme'];
                                    break;   
                                    case 'simple-button-theme':
                                            $scope.data = data[0]['simple-button-theme'];
                                        break;
                                    case 'round-button-theme':
                                            $scope.data = data[0]['round-button-theme'];
                                        break;
                                    case 'dotted-line-theme':
                                            $scope.data = data[0]['dotted-line-theme'];
                                        break;   
                                    case 'holo-input-theme':
                                            $scope.data = data[0]['holo-input-theme'];
                                        break;   
                                    }
                                    setTimeout(function() {
                                        prettyPrint();          
                                    }, 200);   
                                });
                                switch($scope.theme_name){
                                    case 'basic-theme':
                                    case '':
                                            basic_theme();
                                            i_selfactive('.list_container','.theme_li', '.basic-theme-li');
                            
                                        break;
                                    case 'simple-button-theme':
                                            simple_button_theme();
                                        break;
                                    case 'round-button-theme':
                                            round_button_theme();
                                        break;
                                    case 'dotted-line-theme':
                                            dotted_line_theme();
                                        break;   
                                    case 'holo-input-theme':
                                            holo_input_theme();
                                        break;                     
                                }   
                                $('.code_toggle').unbind('click');
                                $('.code_toggle').click(function(){
                                    $show_code = $(this).closest('.use_full').find('.show_code')
                                    $show_code.slideToggle('slow');
                                    if($show_code.hasClass('active')){
                                        $show_code.removeClass('active');
                                        $(this).html('<i class="fa fa-caret-down"></i>&nbsp;&nbsp;Show Code');
                                    }
                                    else{
                                        $show_code.addClass('active');
                                        $(this).html('<i class="fa fa-caret-up"></i>&nbsp;&nbsp;Hide Code');
                                    }
                                });
                                
                            }
                        ]
                    }
                }
            })

             // *** LOGIN *****
                .state('documents', {
                url: '/documents',
                views: {
                    'home_view': {
                        templateUrl: 'content/documents.html',
                        controller: ['$scope', '$stateParams', '$http',
                            function($scope, $stateParams, $http) {
                                $http.get('assets/docs.json').success(function(data){
                                    $scope.data = data;
                                     setTimeout(function() {
                                        prettyPrint();          
                                    }, 350);  
                                });
                            }
                        ]
                    }
                }
            })

            .state('wormup', {
                url: '/wormup',
                views: {
                    'home_view': {
                        templateUrl: 'content/wormup.html',
                        controller: ['$scope', '$stateParams', '$http',
                            function($scope, $stateParams, $http) {
                                setTimeout(function(){
                                    $('#radio_demo').tm_editbale('init',{});    
                                },500);
                                
                                $('#text_demo, #text_demo1').tm_editbale('init',{});
                                //$('#text_demo1').tm_editbale('init',{});    
                                
                            }
                        ]
                    }
                }
            })

        }
    ]);

$(document).ready(function(){
    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop();
        if(scroll >  0)
            $('#parent_of_all').addClass('scroll_effect');
        else
            $('#parent_of_all').removeClass('scroll_effect');
    });

    $('.main-nav-li').click(function(){
        $('body').scrollTop(0);
    });
    function nav_responsive(){
        window_height = $(window).height();
        nav_height = $('#navigation .on_front').outerHeight();
        $('#navigation .on_back').css({'top':nav_height, 'height':window_height - nav_height});
    }
    nav_responsive();
    $('.baricon').click(function(){
        nav_responsive();
        if($('#navigation .on_back').hasClass('show'))
            {
                $('#navigation .on_back').removeClass('show');
                $('.baricon').find('i').addClass('fa-bars').removeClass('fa-times');
            }
        else
            {
                $('.baricon').find('i').removeClass('fa-bars').addClass('fa-times');
                $('#navigation .on_back').addClass('show');
            }
    });

    $('.on_back').find('.nav_li').click(function(){
        $('#navigation .on_back').removeClass('show');
        $('.baricon').find('i').addClass('fa-bars').removeClass('fa-times');
    });

})

function apply_owl(){
owl = $('.slide_cont');    
    owl.owlCarousel({
      items : 1, //10 items above 1000px browser width
      itemsDesktop : [1000,1], //5 items between 1000px and 901px
      itemsDesktopSmall : [900,1], // betweem 900px and 601px
      itemsTablet: [600,1], //2 items between 600 and 0
      itemsMobile :[100,1], // itemsMobile disabled - inherit from itemsTablet option
      pagination:false
    });
}
function goto_live_demo(eve){
   get_owl = $(eve).closest('.slide_info').find('.slide_cont');
   get_owl.trigger('owl.goTo',0);
}
function goto_use(eve){
    alert('sdkjnrej');
}
function i_active(container,sub_link) {
      $(container).find(sub_link).removeClass('active');
       $(container).find(sub_link).click(function() {
         $(this).closest(container).find(sub_link).removeClass('active');
        $(this).addClass('active');
      });
    }      
function i_selfactive(container,sub_link,myself) {
  $(container).find(sub_link).removeClass('active');
  $(container).find(myself).addClass('active');
}

